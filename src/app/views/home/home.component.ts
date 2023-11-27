import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime, fromEvent, merge, of, tap } from 'rxjs';

import { AlertService } from 'src/app/utils/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { MENU_OPTIONS } from 'src/base/config/rutas-app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _alertSrv: AlertService
  ) {}

  OPTIONS_SIDEBAR = MENU_OPTIONS;
  userInactiveSuscription!: Subscription;
  inactiveTime = 900000; // 15 MINUTOS
  isSidebarClose: boolean | null = false;
  isMdScreen = false;
  ngOnInit(): void {
    this.monitorearTiempoInactividadUsuario();
  }

  monitorearTiempoInactividadUsuario() {
    this.userInactiveSuscription = merge(
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'keypress'),
      fromEvent(window, 'touchstart'),
      fromEvent(window, 'blur'),
      of('load')
    )
      .pipe(
        // tap((event: any) => {
        //   console.log('evenet triggered');
        // }),
        debounceTime(this.inactiveTime),
        tap((event) => {
          this._alertSrv
            .showAlertError(`No ha registrado actividad por varios minutos,
        Inicie Sesión nuevamente
        `);
        this.logout();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.userInactiveSuscription.unsubscribe();
  }

  logout() {
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }
}
