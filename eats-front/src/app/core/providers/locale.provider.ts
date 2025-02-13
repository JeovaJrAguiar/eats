import {LOCALE_ID, Provider} from '@angular/core';
import {registerLocaleData} from '@angular/common';

//registerLocaleData(localePt);

export const localeProvider: Provider = {
  provide: LOCALE_ID,
  useValue: 'pt-BR'
}
