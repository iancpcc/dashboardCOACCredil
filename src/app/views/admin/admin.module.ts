import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SeguridadComponent } from './seguridad/seguridad.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    SeguridadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
