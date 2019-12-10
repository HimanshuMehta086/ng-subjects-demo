import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  stream$: Observable<string>;
  constructor(private dataService: DataService) {
    this.stream$ = this.dataService.state$;
  }

  ngOnInit() {
    //  First subscriber
    this.stream$.subscribe(
      data => console.log('First Subscriber Data', data),
      error => console.error('First Subscriber Error', error),
      () => console.log('First Subscriber Complete')
    );

    //  Invoke API to emit the new values
    //  None of these values are emitted
    //  Subject emits only the final value
    //  that is the last one before it completed
    this.dataService.message = 'A';
    this.dataService.message = 'B';
    this.dataService.message = 'C';

    //  Second subscriber added
    //  Should wait till the completion
    this.stream$.subscribe(
      data => console.log('Second Subscriber Data', data),
      error => console.error('Second Subscriber Error', error),
      () => console.log('Second Subscriber Complete')
    );

    //  Invoke the API again
    //  Now, first and second subscribers are called in the order

    this.dataService.message = 'D';
    this.dataService.message = 'E';
    this.dataService.message = 'F';

    //  Completion
    //  Every subscriber gets the final value 'F'

    this.dataService.complete();

    //  Edge case 1: new subscribers after completion

    //  Third subscriber added
    //  Gets the final value 'F' as it completed already
    //  Completion is called on the new subscriber immediately
    this.stream$.subscribe(
      data => console.log('Third Subscriber Data', data),
      error => console.error('Third Subscriber Error', error),
      () => console.log('Third Subscriber Complete')
    );

    //  Edge case 2: error after completion
    //  No effect
    this.dataService.error();

    //  Edge case 3: If the subject errors,
    //  even the error callback on new subscribers (added after error)
    //  will be called. No data is emitted however.
  }
}
