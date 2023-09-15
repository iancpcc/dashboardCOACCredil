import { Observable } from "rxjs";
import { UseCase } from "../base/use-case";
import { UserAuthRepository } from "../repositories/user-auth.repository";
import { TokenModel } from "../models/token.model";
import { Injectable } from "@angular/core";

@Injectable()
export class UserLoginUseCase implements UseCase<{username:string,password:string }, TokenModel>{
    constructor(private readonly userRepository: UserAuthRepository){
        this.userRepository = userRepository;
    }
     execute(params: { username: string, password: string }): Observable<TokenModel> {
      return this.userRepository.login(params);
    }
}