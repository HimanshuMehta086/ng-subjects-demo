import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //  BehaviorSubject needs an initial value
  private stateSubject = new BehaviorSubject<string>('Default');

  //  Expose the observable to the clients
  //  This is a read-only stream
  state$ = this.stateSubject.asObservable();

  constructor() {}

  //  API for components
  set message(value: string) {
    if (value.length < 10) {
      this.stateSubject.next(value);
    } else {
      console.log('API validation error');
    }
  }
}
