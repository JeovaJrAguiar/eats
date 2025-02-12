import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../core/services';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);
  const params = new URLSearchParams(window.location.search);

  const authCookie = params.get(authService.authCookieKey);

  if(!authCookie) return true;

  router.navigateByUrl('/', { replaceUrl: true });

  return false;
};
