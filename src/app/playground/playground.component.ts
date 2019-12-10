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
    //  Immediately gets the initial value
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
    //  Gets the most recent value emitted ('C' in this case)
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

    // Edge case 1: new subscriber after completion

    //  complete
    this.dataService.complete();

    //  Third subscriber added
    //  Only gets the completion notification
    //  This is similar to Subject
    this.stream$.subscribe(
      data => console.log('Third Subscriber Data', data),
      error => console.error('Third Subscriber Error', error),
      () => console.log('Third Subscriber Complete')
    );

    //  Edge case 2: error after completion
    //  No effect
    this.dataService.error();
  }
}
