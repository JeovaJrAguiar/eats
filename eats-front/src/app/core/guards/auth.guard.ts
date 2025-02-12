import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (_, __) => {
  if (inject(AuthService).logged) return true;

  inject(Router).navigate(['/login']);
  return false;
};
