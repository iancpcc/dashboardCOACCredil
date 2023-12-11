import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { ApplicationRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable, catchError, debounceTime, fromEvent, map, merge, of, startWith, tap } from 'rxjs';

import { AlertService } from './utils/alert.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export default class AppComponent implements OnInit {
  title = 'reporteria';
  isAuthenticated: boolean = false;
  constructor(
    private _authService: AuthService,
    ) {
  }

  appState: AppStateEntity<any> = { state: DataState.LOADING }
  DataState = DataState
  ngOnInit(): void {

    this._authService.isAuthenticated$.subscribe((value: boolean) => {
      this.isAuthenticated = value;
      this.appState.state = DataState.LOADED;
    })
  }



}
