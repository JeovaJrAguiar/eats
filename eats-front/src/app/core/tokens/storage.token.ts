import {InjectionToken} from '@angular/core';

export const SESSION_STORAGE = new InjectionToken<Storage>('Session Storage', {
  providedIn: "root",
  factory: () => sessionStorage,
});
