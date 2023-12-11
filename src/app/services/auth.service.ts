import { ACCESS_TOKEN_KEY, USER_LOGGED_KEY } from '../../base/config/rutas-app';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { CacheResolverService } from './cache-resolver.service';
import { GenericCRUDService } from 'src/data/helpers/generic-crud.service';
import { JwtService } from '../utils/jwt-service.service';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { Role } from '../interfaces/role.enum';
import { StorageService } from './storage.service';
import { TokenModel } from 'src/domain/models/token.model';
import { UserLoginUseCase } from 'src/domain/usecases/user-login.usecase';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly base_url = `${environment.url_services}/Auth`;
  public isAuthenticated$ = new EventEmitter<boolean>();
  public roles: Role[] = [];
  public userAccessToken!: string | null;
  private userAuthenticated!: string | null;
  private userSessionExpires: number = 0;

  constructor(
    private _localStorage: StorageService,
    private _userLoginUseCase: UserLoginUseCase,
    private jwtService: JwtService,
    private genericService: GenericCRUDService,
    private _cache:CacheResolverService
  ) {
    this.loadUserDataFromStorage();
  }

  login$ = (params: {
    username: string;
    password: string;
  }): Observable<TokenModel> =>
    this._userLoginUseCase.execute(params).pipe(
      tap(({ userId, accessToken }: TokenModel) => {
        if (accessToken) {
          this._localStorage.saveData(USER_LOGGED_KEY, userId!);
          this._localStorage.saveData(ACCESS_TOKEN_KEY, accessToken);
          const data = this.jwtService.decodeJwt(accessToken);
          this.roles = data.role ?? [];

          this.userSessionExpires = data.exp ?? 0;

          this.userAccessToken = accessToken;
          this.isAuthenticated$.emit(true);
        }
        this.userLogged = userId!;
      })
    );

  get isLoggedIn(): boolean {
    return this.userAccessToken != null;
  }

  // TODO: CARGAR EL NOMBRE DE USUARIO DESDE EL LOCALSTORAGE Y ASIGNARLO AL userLoggedIn
  loadUserDataFromStorage(): void {
    const token = this._localStorage.getData(ACCESS_TOKEN_KEY);
    if (token) {
      this.userAccessToken = token;
      this.userLogged = this._localStorage.getData(USER_LOGGED_KEY);
      this.roles = this.loadRoles;
      const data = this.jwtService.decodeJwt(this.userAccessToken);
      this.userSessionExpires = data.exp!;
    }
  }

  resetPassword$ = (userId: string): Observable<ResponseEntity<boolean>> => {
    return this.genericService.getApiData<boolean>(
      `${this.base_url}/resetPassword?userId=${userId}`
    );
  };

  get loadRoles(): Role[] | [] {
    if (!this.userAccessToken) return [];
    return this.jwtService.decodeJwt(this.userAccessToken).role ?? [];
  }

  get isTokenExpired(): boolean {
    try {
      const currentTime = Date.now() / 1000;
      let expired = currentTime > this.userSessionExpires;
      return expired;
    } catch (error) {
      throw error;
    }
  }

  set userLogged(user: string | null) {
    this.userAuthenticated = user;
  }

  get userLogged(): string | null {
    return this.userAuthenticated;
  }

  logout(): void {
    this.isAuthenticated$.emit(false);
    this._localStorage.removeData(ACCESS_TOKEN_KEY);
    this._localStorage.removeData(USER_LOGGED_KEY);
    this._cache.clearCache();
  }
}
