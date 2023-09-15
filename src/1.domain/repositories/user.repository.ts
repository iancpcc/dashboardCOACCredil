import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

export abstract class UserRepository {
  abstract resetPassword(params: {
    userId: string;
    password: string;
  }): Observable<boolean>;
}
