import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { ModulosAccesoComponent } from './modulos-acceso/modulos-acceso.component';
import { NgModule } from '@angular/core';
import { UsuariosAdmComponent } from './usuarios/usuarios-adm.component';

@NgModule({
  declarations: [
    UsuariosAdmComponent,
    ModulosAccesoComponent
  ],
  exports:[
    // UsuariosAdmComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ComponentsModule,
    FormsModule
  ]
})
export class AdminModule { }
