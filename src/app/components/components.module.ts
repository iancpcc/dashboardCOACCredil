import { CommonModule } from '@angular/common';
import { DangerComponent } from './danger/danger.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RoleUserDirective } from '../directives/role-user.directive';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SuccessBoxComponent } from './success-box/success-box.component';
import { SuccessComponent } from './success/success.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    InputComponent,
    DangerComponent,
    SuccessComponent,
    SpinnerComponent,
    ProgressBarComponent,
    LoadingPageComponent,
    SuccessBoxComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RoleUserDirective,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    InputComponent,
    DangerComponent,
    SuccessComponent,
    SpinnerComponent,
    ProgressBarComponent,
    LoadingPageComponent,
    SuccessBoxComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
export class ComponentsModule { }
