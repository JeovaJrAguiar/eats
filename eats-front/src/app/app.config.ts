import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService, StorageService} from './core/services';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {ConfirmationService, MessageService} from 'primeng/api';
import {
  authenticationHandlerProvider,
  interceptorsProvider,
  localeProvider
} from './core/providers';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    localeProvider,
    interceptorsProvider,
    authenticationHandlerProvider,
    AuthService,
    MessageService,
    ConfirmationService,
    // providePrimeNG({
    //   theme: {
    //     preset: Aura
    //   }
    // })
  ]
};
