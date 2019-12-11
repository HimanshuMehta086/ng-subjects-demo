import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private stateSubject = new ReplaySubject<string>();

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

  complete() {
    this.stateSubject.complete();
  }

  error() {
    this.stateSubject.error(new Error('Subject erred'));
  }
}
