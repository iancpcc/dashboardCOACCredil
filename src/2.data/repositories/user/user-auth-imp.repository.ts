import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, } from 'rxjs';
import { UserAuthRepository } from 'src/1.domain/repositories/user-auth.repository';
import { environment } from 'src/environments/environment.development';
import { UserModel } from 'src/1.domain/models/user.model';
import { GenericCRUDService } from 'src/2.data/helpers/generic-crud.service';
import { TokenModel } from 'src/1.domain/models/token.model';

@Injectable({
  providedIn: 'root',
})
export class UserAuthImplementationRepository implements UserAuthRepository {
  private readonly base_url = `${environment.url_services}/Auth`;
  constructor(private genericCRUD: GenericCRUDService) {}

  login(params: {
    username: string;
    password: string;
  }): Observable<TokenModel> {

    
    return this.genericCRUD.postApiData<TokenModel>({url: `${this.base_url}/login`, body: params,
      }).pipe(
        map(resp=>{
            return resp.data!
        }),    
      )
  }

  register(params: {username: string;password: string;}): Observable<UserModel> {
    return this.genericCRUD.postApiData<UserModel>({url: `${this.base_url}/register`,
    body: { usuario: params.username, clave: params.password },
    })
    .pipe(
      map(resp=> resp.data!)
    )
    ;
  }
}
