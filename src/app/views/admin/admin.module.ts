import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { UsuariosAdmComponent } from './usuarios/usuarios-adm.component';

@NgModule({
  declarations: [
    UsuariosAdmComponent
  ],
  exports:[
    // UsuariosAdmComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ComponentsModule
  ]
})
export class AdminModule { }
