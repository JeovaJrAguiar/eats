import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  deleteCookie(cookieName:  string) {
    document.cookie = `${cookieName}=;;path/=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }

  setCookie(cookieName: string, cookieValue: unknown) {
    const isObject = typeof cookieName === 'object';
    const value = isObject? JSON.stringify(cookieValue) : cookieValue;
    document.cookie = `${cookieName}=${cookieValue};;path=/;`;
  }

  getCookie (cookieName:  string): string {
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
