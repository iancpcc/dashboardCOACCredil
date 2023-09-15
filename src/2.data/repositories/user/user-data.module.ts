import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { UserAuthRepository } from "src/1.domain/repositories/user-auth.repository";
import { UserAuthImplementationRepository } from "./user-auth-imp.repository";
import { UserRepository } from "src/1.domain/repositories/user.repository";
import { UserImplementationRepository } from "./user-imp.repository";



@NgModule({
  providers: [
    {
        provide: UserAuthRepository,
        useClass: UserAuthImplementationRepository
      },
    {
        provide: UserRepository,
        useClass: UserImplementationRepository
      }
  ],
  imports: [CommonModule, HttpClientModule],
})
export class UserDataModule {}
