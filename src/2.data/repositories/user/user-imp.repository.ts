import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserModel } from 'src/1.domain/models/user.model';
import { GenericCRUDService } from 'src/2.data/helpers/generic-crud.service';
import { UserRepository } from 'src/1.domain/repositories/user.repository';

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
        url: `${this.base_url}/resetPassword?userId=${params.userId}&password=${params.password}`,
      })
      .pipe(map((resp) => resp.success!));
  }
}
