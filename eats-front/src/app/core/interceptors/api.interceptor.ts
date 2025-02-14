import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, SessionStorageService} from '../services';
import {environment} from '../../../environments/environments';
import {Observable, tap} from 'rxjs';

const WHITELIST = [
  environment.apiUrl + '/',
  environment.apiUrl + '/login',
  environment.apiUrl + '/register',
];

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
      private router: Router,
      private authService: AuthService,
      private sessionStorage: SessionStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.sessionStorage.getItem('user');

    if (!user && !WHITELIST.includes(request.url)) {
      this.router.navigate(['/login']);
      return new Observable<HttpEvent<unknown>>();
    }

    if (user && !WHITELIST.includes(request.url)) {
      const encodedCredentials = btoa(`${user.email}:${user.password}`);

      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
    }

    return next.handle(request);
  }
}
