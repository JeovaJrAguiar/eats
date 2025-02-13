import {AuthService} from '../services';
import {catchError, of, tap} from 'rxjs';
import {Provider} from '@angular/core';

const authenticationHandler = (authService: AuthService) => {
  const params = new URLSearchParams(window.location.search);
  const isLoginPage = window.location.pathname === '/login';
  const authCookie = params.get(authService.authCookie);

  if(isLoginPage && !authCookie) return () => ({});

  if(!authService.logged && !authCookie) return () => {
    authService.fetchUserInfo();
  };

  if(authCookie && !authService.logged) {
    authService.setAuthCookie(authCookie);
  }

  return () => {
    authService.fetchUserInfo().pipe(
      tap({error: authService.fetchUserInfo}),
      catchError(() => of(true))
    );
  }
}

export const authenticationHandlerProvider: Provider = {
  provide: 'authenticationHandlerProvider',
  useFactory: authenticationHandler,
  deps: [AuthService],
  multi: true
} ;
