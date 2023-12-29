import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AdminModule } from './views/admin/admin.module';
import AppComponent from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { ComponentsModule } from './components/components.module';
import { DataModule } from 'src/data/data.module';
import { GeoreferenciacionComponent } from './views/home/georeferenciacion/georeferenciacion.component';
import { HomeComponent } from './views/home/home.component';
import { HomeModule } from './views/home/home.module';
import { LoginComponent } from './views/login/login.component';
import { MensajesTextoComponent } from './views/mensajes-texto/mensajes-texto.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from './views/page-not-found-component/page-not-found-component.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { SatisfaccionClienteComponent } from './views/home/satisfaccion-cliente/satisfaccion-cliente.component';
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
    GeoreferenciacionComponent,
    SatisfaccionClienteComponent,
  ],
  providers: [UserLoginUseCase, UserCreatePasswordUseCase,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:CacheInterceptor,
    multi:true
  }
  ],
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
