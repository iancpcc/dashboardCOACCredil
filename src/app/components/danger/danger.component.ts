import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-danger',
  templateUrl: './danger.component.html',
  styleUrls: ['./danger.component.css'],
})
export class DangerComponent implements OnInit, OnDestroy {
  @Input() title: string | string[] | undefined;

  // tiempo = timer(0, this.time);

  ngOnInit(): void {
    // this.tiempo = timer(0, this.time);
  }
  ngOnDestroy(): void {
  }
}
