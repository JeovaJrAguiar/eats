import {CanActivateFn, Router} from '@angular/router';
import {AuthService, StorageService} from '../services';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (_, __) => {
  if (inject(StorageService).getItem('authorization')) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
  // if (inject(AuthService).logged) return true;

  // inject(Router).navigate(['/login']);
  // return false;
};
