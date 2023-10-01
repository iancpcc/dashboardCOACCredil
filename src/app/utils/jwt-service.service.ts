import { IToken } from '../interfaces/token.interface';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() { }

  decodeJwt(token: string): IToken {
    let tokenDecoded: any = jwt_decode(token);
    const username =
      tokenDecoded[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'
      ];
    const roles =
      tokenDecoded[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    const expirationTime = tokenDecoded['exp'];
    return { name: username, role: roles, exp: expirationTime };
  }
}
