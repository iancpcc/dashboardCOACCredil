import { Observable, catchError, map } from 'rxjs';

import { GenericCRUDService } from 'src/data/helpers/generic-crud.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/domain/models/user.model';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class UserImplementationRepository implements UserRepository {
  // userMapper = new UserAuthRepositoryMapper();
  private readonly base_url = `${environment.url_services}/User`;
  constructor(private genericCRUD: GenericCRUDService) {}

  resetPassword(params: {userId: string; password: string;}): Observable<boolean> {
    return this.genericCRUD
      .postApiData<boolean>({
        url: `${this.base_url}/changePassword?userId=${params.userId}&password=${params.password}`,
      })
      .pipe(map((resp) => resp.success!));
  }
}
