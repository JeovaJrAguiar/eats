import {BaseStore} from './base-store';
import {Injectable, OnDestroy} from '@angular/core';
import {Store} from './store';
import {StorageService} from '../services/storage.service';
import {Observable, skip, tap} from 'rxjs';

@Injectable()
export abstract class PersistStore <T extends object | Array<any>>
  implements BaseStore<T>, OnDestroy{

  protected constructor (
    private store: Store<T>,
    private storage: StorageService,
  ) {
    this.store.state$
      .pipe(
        skip(1),
        tap((state) => this.storage.setItem(this.storageKey(), state))
      )
      .subscribe();
  };

  get state$(): Observable<T> {
    return this.store.state$;
  }

  get stateValue(): Readonly<T> {
    return this.store.stateValue;
  };

  replaceState(newValue: T) {
    this.store.replaceState(newValue);
  };

  ngOnDestroy() {
    this.store.ngOnDestroy();
  }

  updateState(stateFn: (currentState: Readonly<T>) => Partial<T>) {
    this.store.updateState(stateFn);
  };

  protected abstract storageKey(): string;
}
