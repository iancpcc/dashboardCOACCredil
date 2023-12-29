import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AppStateEntity,
  CustomError,
} from 'src/data/entities/app-state.entity';
import { Component, OnInit } from '@angular/core';
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

import { AlertService } from 'src/app/utils/alert.service';
import { DataState } from 'src/data/entities/app-state.entity';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  // providers: [
  //   {
  //     provide: UserResetPasswordUseCase,
  //     useFactory: (userRepository: UserRepository) =>
  //       new UserResetPasswordUseCase(userRepository),
  //     deps: [UserRepository],
  //   },
  // ],
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm = this._formBuilder.nonNullable.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(patternValidators.passwordSecure),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(patternValidators.passwordSecure),
        ],
      ],
    },
    {
      validators: this.MatchPassword,
    }
  );

  MESSAGE_CAMBIO_CONTRASENIA_EXITOSO = 'Contraseña cambiada exitosamente';

  resetPassword$!: AppStateEntity<ResponseEntity<any>>;


  readonly DataState = DataState;
  isPasswordVisible: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _userService: UsuarioService,
    private _alertSrv:AlertService
  ) {}
  ngOnInit(): void {
    this._alertSrv.showAlertAnimated("Actualice su contraseña para acceder")

  }
  onChangePassword (){
    this.isPasswordVisible =  !this.isPasswordVisible;
  }

  async onSubmit() {
    const {  confirmPassword } = this.resetPassForm.value;

    //Form invalid
    if (this.resetPassForm.invalid) {
      // this.resetPassForm.controls.confirmPassword.setErrors({ required: true });
      this.resetPassForm.markAsDirty();

      return;
    }

    this._userService.changePasswordToLogin$(confirmPassword!)
      .pipe(
        map((response) => {
          return {
            state: DataState.LOADED,
            data: { message: this.MESSAGE_CAMBIO_CONTRASENIA_EXITOSO },
          };
        }),
        tap(async() => {
            this.router.navigateByUrl('/login');
            await this._alertSrv.showAlertSucess(this.MESSAGE_CAMBIO_CONTRASENIA_EXITOSO)

        }),
        startWith({ state: DataState.LOADING }),
        catchError((error) => {


          return of({ state: DataState.ERROR, error });
        })
      )
      .subscribe((res: any) => {
        this.resetPassword$ = res;
      });
  }

  MatchPassword(formGroup: AbstractControl): ValidationErrors | null {
    const { password, confirmPassword } = formGroup.value;
    // return password === confirmPassword ? null : formGroup.get("confirmPassword")?.setErrors({ passwordNotMatch: true });
    if (password === confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors(null);
      return null;
    }
    formGroup.get('confirmPassword')?.setErrors({ passwordMatch: true });
    return {};
  }

  get passwordErrors(): string | null {
    const userControl = this.resetPassForm.controls['password'];
    if (userControl.hasError('required')) {
      return controlErrorMessage.password.required;
    }
    if (userControl.hasError('pattern')) {
      return controlErrorMessage.password.pattern;
    }
    if (userControl.hasError('passwordMatch')) {
      return controlErrorMessage.password.passwordMatch;
    }
    return null;
  }
  get passwordErrorsConfirm(): string | null {
    const userControl = this.resetPassForm.controls['confirmPassword'];
    if (userControl.hasError('required')) {
      return controlErrorMessage.password.required;
    }
    if (userControl.hasError('pattern')) {
      return controlErrorMessage.password.pattern;
    }
    if (userControl.hasError('passwordMatch')) {
      return controlErrorMessage.password.passwordMatch;
    }
    return null;
  }
}
