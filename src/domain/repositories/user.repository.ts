import { Observable } from 'rxjs';

export abstract class UserRepository {
  abstract resetPassword(params: {
    userId: string;
    password: string;
  }): Observable<boolean>;
}
