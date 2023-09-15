import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';

export abstract class UserAuthRepository {
  abstract login(params: {
    username: string;
    password: string;
  }): Observable<TokenModel>;

  abstract register(user: UserModel): Observable<UserModel>;
}
