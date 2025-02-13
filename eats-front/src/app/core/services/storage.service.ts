import { Injectable } from '@angular/core';

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
        return item;
      }
    }

    return null;
  }

  setItem (key: string, value: any) {
    if(typeof value === 'object') {
      this.storage.setItem(key, JSON.stringify(value));
    } else {
      this.storage.setItem(key, value);
    }
  }
}
