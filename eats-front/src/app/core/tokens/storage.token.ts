import {inject, InjectionToken, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export const SESSION_STORAGE = new InjectionToken<Storage>('Session Storage', {
  providedIn: 'root',
  factory: () => sessionStorage,
});
