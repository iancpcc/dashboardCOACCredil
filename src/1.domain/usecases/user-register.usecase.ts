import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { UserModel } from '../models/user.model';
import { UserAuthRepository } from '../repositories/user-auth.repository';

export class UserRegisterUseCase
  implements UseCase<{ username: string; password: string }, UserModel>
  {
    constructor(private readonly userRepository: UserAuthRepository) {
    this.userRepository = userRepository;
  }

  execute(params: {
    username: string;
    password: string;
  }): Observable<UserModel> {
    return this.userRepository.register(params);
  }

}

