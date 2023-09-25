import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import AppComponent from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CartaPreferencialComponent } from './views/carta-preferencial/carta-preferencial.component';
import { ComponentsModule } from './components/components.module';
import { DataModule } from 'src/2.data/data.module';
import { DataTablesModule } from "angular-datatables";
import { HomeComponent } from './views/home/home.component';
import { HomeModule } from './views/home/home.module';
import { HomePageComponent } from './views/admin/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from './views/page-not-found-component/page-not-found-component.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { UserCreatePasswordUseCase } from 'src/1.domain/usecases/Users/user-create-password.usecase';
import { UserLoginUseCase } from 'src/1.domain/usecases/user-login.usecase';
import { PlazoFijoComponent } from './views/plazo-fijo/plazo-fijo.component';


// import { HomeComponent } from './views/home/home.component';

// import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponentComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ResetPasswordComponent,
    HomePageComponent,
    CartaPreferencialComponent,
    PlazoFijoComponent,
  ],
  providers: [ UserLoginUseCase, UserCreatePasswordUseCase ],
  bootstrap: [AppComponent],
  imports: [
    ComponentsModule,
    HttpClientModule,
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DataModule,
    HomeModule,
  ],
})
export class AppModule {}
