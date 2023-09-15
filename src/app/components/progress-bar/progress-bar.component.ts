import { Component, OnInit } from '@angular/core';
import { interval, timeInterval } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  seconds = interval(1000);

  ngOnInit(): void {
    // const obs = this.seconds.subscribe((value) => {
    //   console.log(value);
    //   if (value == 10) {
    //     obs.unsubscribe();
    //   }
    // });
  }

  stopObservable() {
    this.seconds.subscribe().unsubscribe();
  }
}
