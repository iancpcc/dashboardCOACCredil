import { ApplicationRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith, tap } from 'rxjs';
import { AppStateEntity, DataState } from 'src/2.data/entities/app-state.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export default class AppComponent implements OnInit {
  title = 'frontend';
  isAuthenticated: boolean = false;
  constructor(private _authService: AuthService, private _router: Router) {
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
