import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    UsuariosComponent,
   SeguridadComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ComponentsModule
  ]
})
export class AdminModule { }
