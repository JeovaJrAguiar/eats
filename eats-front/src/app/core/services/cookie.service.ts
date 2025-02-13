import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  deleteCookie(cookieName:  string) {
    if(this.isBrowser) {
      document.cookie = `${cookieName}=;;path/=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
  }

  setCookie(cookieName: string, cookieValue: unknown) {
    if(this.isBrowser) {
      const isObject = typeof cookieName === 'object';
      const value = isObject ? JSON.stringify(cookieValue) : cookieValue;
      document.cookie = `${cookieName}=${cookieValue};;path=/;`;
    }
  }

  getCookie (cookieName:  string): string {
    if(!this.isBrowser) return '';

    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');

    for (const cookie of cookies) {
      let value = cookie;
      while (value.charAt(0) === ' ') {
        value = value.substring(1);
      }
      if (value.indexOf(name) === 0) {
        return value.substring(name.length, value.length);
      }
    }

    return '';
  }
}
