import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from './views/admin/admin.module';
import AppComponent from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { DataModule } from 'src/data/data.module';
import { GeoreferenciacionComponent } from './views/home/georeferenciacion/georeferenciacion.component';
import { HomeComponent } from './views/home/home.component';
import { HomeModule } from './views/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from './views/page-not-found-component/page-not-found-component.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { UserCreatePasswordUseCase } from 'src/domain/usecases/Users/user-create-password.usecase';
import { UserLoginUseCase } from 'src/domain/usecases/user-login.usecase';

// import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponentComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    HomeComponent,
    GeoreferenciacionComponent
  ],
  providers: [UserLoginUseCase, UserCreatePasswordUseCase],
  bootstrap: [AppComponent],
  imports: [
    ComponentsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DataModule,
    HomeModule,
    AdminModule
  ],
})
export class AppModule {
}
