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
    //  Should wait till the next event
    //  First subscriber
    this.stream$.subscribe(
      data => console.log('Second Subscriber Data', data),
      error => console.error('Second Subscriber Error', error),
      () => console.log('Second Subscriber Complete')
    );

    //  Invoke the API again
    //  Now, first and second subscribers are called in the order

    this.dataService.message = 'D';
  }
}
