import {
  AppStateEntity,
  DataState,
} from 'src/data/entities/app-state.entity';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, catchError, map, of, startWith, take, tap } from 'rxjs';
import {
  controlErrorMessage,
  patternValidators,
} from 'src/app/utils/validators.service';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/domain/models/user.model';
import { error } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [
  //   {
  //     provide: UserLoginUseCase,
  //     useFactory: (userRepository: UserAuthRepository) =>
  //       new UserLoginUseCase(userRepository),
  //     deps: [UserAuthRepository],
  //   },
  // ],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this._formBuilder.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.pattern(patternValidators.onlyLetters)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(patternValidators.passwordSecure),
      ],
    ],
  });

  login!: AppStateEntity<UserModel>;

  readonly DataState = DataState;
  dataSubscription!: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    // return  this.router.navigateByUrl('/');

    //Form invalid
    const { username, password } = this.loginForm.value;
    if (this.loginForm.invalid || !username || !password) {
      this.loginForm.controls.username.markAsDirty();
      this.loginForm.controls.password.markAsDirty();
      //
      return;
    }
    //Form valid
    let userNameUpper = username.toUpperCase()

    this.dataSubscription = this.authService
      .login$({ username: userNameUpper, password })
      .pipe(
        tap((response) => {
          if (response.passwordExpired) {
            return this.router.navigateByUrl('/reset-password');
          }
          return this.router.navigateByUrl('/home');
        }),
        map((response) => {
          return { state: DataState.LOADED, data: response };
        }),
        startWith({ state: DataState.LOADING }),
        catchError((error) => {

          return of({ state: DataState.ERROR, error });
        })
      )
      .subscribe((res: any) => {
        this.login = res;
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();

  }

  get usernameErrors(): string {
    const userControl = this.loginForm.controls.username;
    if (userControl.hasError('required')) {
      return controlErrorMessage.username.required;
    }
    if (userControl.hasError('pattern')) {
      return controlErrorMessage.username.pattern;
    }
    return '';
  }

  get passwordErrors(): string {
    const userControl = this.loginForm.controls.password;
    if (userControl.hasError('required')) {
      return controlErrorMessage.password.required;
    }
    if (userControl.hasError('pattern')) {
      return controlErrorMessage.password.pattern;
    }
    return '';
  }
}
