import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { DangerComponent } from './danger/danger.component';
import { SuccessComponent } from './success/success.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { SuccessBoxComponent } from './success-box/success-box.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { RoleUserDirective } from '../directives/role-user.directive';



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
    RoleUserDirective
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
    SidebarComponent
  ]
})
export class ComponentsModule { }
