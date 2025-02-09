import {Injectable, OnDestroy} from '@angular/core';
import {BaseStore} from './base-store';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export abstract class Store<T extends object | Array<any>>
  implements BaseStore<T>, OnDestroy
{
  private state: BehaviorSubject<T>;

  private readonly isArray: boolean;

  constructor() {
    const inititalState = this.initialState();

    this.isArray = Array.isArray(inititalState);
    this.state = new BehaviorSubject<T>(
      Object.assign(this.isArray ? [] : {}, inititalState)
    );
  }

  get state$(): Observable<T> {
    return this.state.asObservable();
  }

  get stateValue(): Readonly<T> {
    return Object.freeze(this.state.getValue());
  };

  replaceState(newValue: T) {
    this.state.next(newValue);
  };

  ngOnDestroy() {
    this.state.complete();
  }

  updateState(stateFn: (currentState: Readonly<T>) => Partial<T>) {
    const currentState = this.stateValue;
    const newState = stateFn(this.stateValue);

    let state: T;
    if(this.isArray) {
      state = Object.assign([], newState as T);
    } else {
      state = Object.assign({}, currentState, newState);
    }

    this.state.next(state);
  };

  protected abstract initialState(): T;
}
