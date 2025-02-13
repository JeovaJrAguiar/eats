import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from '../interceptors';

export const interceptorsProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
];
