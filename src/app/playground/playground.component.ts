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
    this.dataService.message = 'A';
    this.dataService.message = 'B';
    this.dataService.message = 'C';

    //  Second subscriber added
    //  Gets all the  values emitted so far in the order
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

    //  Edge case 1: new subscriber after completion

    //  If it erred, the previous subscribers'
    //  error is called.
    //  For new subscribers, the values are replayed
    //  and error on them will be called after replay.
    // this.dataService.error();  //  interesting case

    //  complete
    this.dataService.complete();

    //  Third subscriber added
    //  Gets all the  values emitted so far in the order,
    //  even though the subject is long back completed
    this.stream$.subscribe(
      data => console.log('Third Subscriber Data', data),
      error => console.error('Third Subscriber Error', error),
      () => console.log('Third Subscriber Complete')
    );

    //  Edge case 2: error after complete
    //  No effect
    this.dataService.error();
  }
}
