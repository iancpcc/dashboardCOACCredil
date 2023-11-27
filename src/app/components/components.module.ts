import { BotonGenerarReporteComponent } from './boton-generar-reporte/boton-generar-reporte.component';
import { CommonModule } from '@angular/common';
import { DangerComponent } from './danger/danger.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { MapaComponent } from './mapa/mapa.component';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RoleUserDirective } from '../directives/role-user.directive';
import { RouterModule } from '@angular/router';
import { SelectorAgenciasComponent } from './selector-agencias/selector-agencias.component';
import { SelectorUsuariosComponent } from './selector-usuarios/selector-usuarios.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
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
    SkeletonComponent,
    MapaComponent,
    SelectorAgenciasComponent,
    SelectorUsuariosComponent,
    BotonGenerarReporteComponent,
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
    SkeletonComponent,
    MapaComponent,
    SelectorAgenciasComponent,
    SelectorUsuariosComponent,
    BotonGenerarReporteComponent
  ]
})
export class ComponentsModule { }
