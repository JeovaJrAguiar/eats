import {Inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {SESSION_STORAGE} from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends StorageService {
  constructor(@Inject(SESSION_STORAGE) storage: Storage) {
    super(storage);
  }
}
