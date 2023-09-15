import { FormBuilder, Validators } from '@angular/forms';
import {
  Observable,
  catchError,
  map,
  of,
  startWith,
  take,
  tap,
  timer,
} from 'rxjs';
import {
  controlErrorMessage,
  patternValidators,
} from 'src/app/utils/validators.service';

import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AppStateEntity, CustomError } from 'src/2.data/entities/app-state.entity';
import { DataState } from 'src/2.data/entities/app-state.entity';
import { UserModel } from 'src/1.domain/models/user.model';
import { UserRegisterUseCase } from 'src/1.domain/usecases/user-register.usecase';
import { UserAuthImplementationRepository } from 'src/2.data/repositories/user/user-auth-imp.repository';
import { UserLoginUseCase } from 'src/1.domain/usecases/user-login.usecase';
import { UserAuthRepository } from 'src/1.domain/repositories/user-auth.repository';
import { ResponseEntity } from 'src/2.data/entities/response.entity';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: UserRegisterUseCase,
      useFactory: (userRepository: UserAuthRepository) =>
        new UserRegisterUseCase(userRepository),
      deps: [UserAuthRepository],
    },
  ],
})
export class RegisterComponent {
  registerForm = this._formBuilder.nonNullable.group({
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

  MESSAGE_SUCCESS = "Registro Exitoso, Inicie sesión para continuar"

  register$!: AppStateEntity<ResponseEntity<any>>;

  readonly DataState = DataState;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _localStorage: StorageService,
    private userRegisterUseCase: UserRegisterUseCase
  ) {
  }

  async onSubmit() {
    const { username, password } = this.registerForm.value;
    //Form invalid
    if (this.registerForm.invalid || !username || !password) {
      this.registerForm.markAllAsTouched();
      return;
    }

    //Form valid
    this.userRegisterUseCase
      .execute({ username, password })
      .pipe(
        map((response) => {
          return { state: DataState.LOADED, data: {message: this.MESSAGE_SUCCESS} };
        }),
        tap(() => {
          console.log('Registro exitoso!!');
          
          timer(5000).subscribe(() => {
            this.router.navigateByUrl('/login');
          });
        }),
        startWith({ state: DataState.LOADING }),
        catchError((error) => {
          console.log('Error', error);
          return of({ state: DataState.ERROR, error });
        })
      )
      .subscribe((res:any) => {
        this.register$ = res;
      });
  }
  // async onSubmit() {
  //   const user: IUser = this.registerForm.value;
  //   //Form invalid
  //   if (this.registerForm.invalid) {
  //     this.registerForm.markAllAsTouched()
  //     return
  //   }

  //   //Form valid
  //   this._authService.register$(user).pipe(
  //     map((response) => {
  //       return { state: DataState.LOADED, data: response };
  //     }),
  //     tap(() => {
  //       timer(5000).subscribe(() => {
  //         this.router.navigateByUrl('/login');
  //       })
  //     }

  //     ),
  //     startWith({ state: DataState.LOADING }),
  //     catchError((error) => {
  //       console.log('Error', error);
  //       return of({ state: DataState.ERROR, error: error.message });
  //     }),
  //   ).subscribe((res) => {
  //     this.register$ = res
  //   })
  // }

  get usernameErrors(): string {
    const userControl = this.registerForm.controls.username;
    if (userControl.hasError('required')) {
      return controlErrorMessage.username.required;
    }
    if (userControl.hasError('pattern')) {
      return controlErrorMessage.username.pattern;
    }
    return '';
  }

  get passwordErrors(): string {
    const userControl = this.registerForm.controls.password;
    if (userControl.hasError('required')) {
      return controlErrorMessage.password.required;
    }
    if (userControl.hasError('pattern')) {
      return controlErrorMessage.password.pattern;
    }
    return '';
  }
}
