import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { UserAuthRepository } from "src/1.domain/repositories/user-auth.repository";
import { UserAuthImplementationRepository } from "./repositories/user/user-auth-imp.repository";
import { UserDataModule } from "./repositories/user/user-data.module";

@NgModule({
  imports: [CommonModule, HttpClientModule, UserDataModule],
})
export class DataModule {}
