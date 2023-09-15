import { RouterModule, Routes } from '@angular/router';

import { HomeGuard } from './guards/home.guard';
import { HomeModule } from './views/home/home.module';
import { HomeRoutingModule } from './views/home/home.routes';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponentComponent } from './views/page-not-found-component/page-not-found-component.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

// import { HomeGuard } from './guards/home.guard';
// import { HomeComponent } from './views/home/home.component';
// import { LoginComponent } from './views/login/login.component';








const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: '',
    loadChildren: ()=> HomeModule,
    canActivateChild: [HomeGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
