import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {stringify} from 'node:querystring';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageService {

  protected constructor(private storage: Storage) { }

  getItem(key: string): any {
    const item = this.storage.getItem(key);

    if(item) {
      try {
        return JSON.parse(item);
      } catch {
        return item
      }
    } else {

    }

    return null;
  }

  setItem (key: string, value: any) {
    if(typeof value === 'object') {
      this.storage.setItem(key, stringify(value));
    } else {
      this.storage.setItem(key, value);
    }
  }
}
