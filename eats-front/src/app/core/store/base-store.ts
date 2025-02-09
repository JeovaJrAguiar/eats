import {Observable} from 'rxjs';

export abstract class BaseStore <T extends object | Array<any>  > {
  abstract get state$(): Observable<T>;

  abstract get stateValue(): Readonly<T>;

  abstract replaceState(newValue: T): void;

  abstract updateState(
    stateFn: (currentState: Readonly<T>) => Partial<T>
  ): void;
}
