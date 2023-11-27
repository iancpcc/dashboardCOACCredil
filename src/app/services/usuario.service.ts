import {
  IPaginationModel,
  IUsuario,
  IUsuarioAgencia,
} from '../interfaces/usuario-agencia.interface';
import { Observable, of } from 'rxjs';

import { AppStateEntity } from 'src/data/entities/app-state.entity';
import { AuthService } from './auth.service';
import { GenericCRUDService } from 'src/data/helpers/generic-crud.service';
import { IUserLoggin } from '../interfaces/usuario-login.interface';
import { Injectable } from '@angular/core';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { StorageService } from './storage.service';
import { USER_LOGGED_KEY } from 'src/base/config/rutas-app';
import { UserCreatePasswordUseCase } from 'src/domain/usecases/Users/user-create-password.usecase';
import { data } from 'jquery';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly base_url = `${environment.url_services}/User`;
  constructor(
    private _userCreatePwd: UserCreatePasswordUseCase,
    private _localStorage: StorageService,
    private genericService: GenericCRUDService,
    private _authService: AuthService
  ) {}

  changePasswordToLogin$ = (password: string): Observable<boolean> => {
    let userId =
      this._authService.userLogged ??
      this._localStorage.getData(USER_LOGGED_KEY) ??
      '';
    return this._userCreatePwd.execute({ userId, password });
  };

  getUsersByAgencies$ = (params: {
    agencia: number | string;
    rolesId: string;
  }):Observable<ResponseEntity<IUsuarioAgencia[]>> => {
    // params.agencia = params.agencia.toString();
    if (params.agencia == '-1'){
      return of({data:[]})
    }
    return this.genericService.postApiData<IUsuarioAgencia[]>({
      url: `${this.base_url}/usersByAgency`,
      body: params,
    });
  };

  getAllUsers$ = (
    page: number = 1
  ): Observable<ResponseEntity<IPaginationModel<IUsuario[]>>> => {
    return this.genericService.getApiData<IPaginationModel<IUsuario[]>>(
      `${this.base_url}/getAllUsers?pagina=${page}`
    );
  };

  saveUser$ = (usuario: string): Observable<ResponseEntity<IUserLoggin>> => {
    return this.genericService.postApiData<IUserLoggin>({
      url: `${this.base_url}/createUser`,
      body: { usuario },
    });
  };
}
