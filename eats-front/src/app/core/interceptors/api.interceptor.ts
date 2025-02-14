import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services';
import {environment} from '../../../environments/environments';
import {Observable, tap} from 'rxjs';

const WHITELIST = [
  environment.apiUrl + '/',
  environment.apiUrl + '/login',
  environment.apiUrl + '/register',
];

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor( private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authService.logged) {
      this.router.navigate(['/login']);
      return new Observable<HttpEvent<unknown>>();
    }

    if(WHITELIST.includes(request.url)) {
      const email = request.url.includes('email');
      const password = request.url.includes('password');
      const encodedCredentials = btoa(`${email}:${password}`);

      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${encodedCredentials}`
        }
      });

      return next.handle(request);
    }

    return next.handle(request).pipe(tap({error: this.handleError.bind(this)}));
  }

  private handleError(error: any) {
    if(error.status === 401) return;

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
