import {CanActivateFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from '@angular/core';
import {AuthService} from '../../core/services';
import {isPlatformBrowser} from '@angular/common';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const params = new URLSearchParams(window.location.search);
    const authCookie = params.get(authService.authCookieKey);

    if (!authCookie) {
      return true;
    }

    router.navigateByUrl('/home', { replaceUrl: true });
    return false;
  } else {
    return true;
  }

};
