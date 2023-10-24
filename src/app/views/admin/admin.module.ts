import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
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
    ComponentsModule,
    FormsModule
  ]
})
export class AdminModule { }
