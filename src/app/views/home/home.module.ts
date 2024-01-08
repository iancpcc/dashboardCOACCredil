import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartaPreferencialComponent } from './carta-preferencial/carta-preferencial.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { CumpleaniosClientesComponent } from './cumpleanios-clientes/cumpleanios-clientes.component';
import { CuotasVencidasAgenciaComponent } from './cuotas-vencidas-agencia/cuotas-vencidas-agencia.component';
import { CuotasVencidasComponent } from './cuotas-vencidas/cuotas-vencidas.component';
import { DashboardPageComponent } from './panel-principal/dashboard-page.component';
import { DataTablesModule } from 'angular-datatables';
import { HomeRoutingModule } from './home.routes';
import { MensajesTextoComponent } from '../mensajes-texto/mensajes-texto.component';
import { NgModule } from '@angular/core';
import { PageNoAuthorizedComponent } from './page-no-authorized/page-no-authorized.component';
import { PlazoFijoComponent } from './vencimientos/proximos-vencimientos';
import { SituacionCrediticiaComponent } from './situacion-crediticia/situacion-crediticia.component';
import { CreditosAdjudicadosComponent } from './creditos-adjudicados/creditos-adjudicados.component';
import { CreditosAprobadosComponent } from './creditos-aprobados/creditos-aprobados.component';

@NgModule({
  declarations: [
    CartaPreferencialComponent,
    CuotasVencidasComponent,
    SituacionCrediticiaComponent,
    DashboardPageComponent,
    CumpleaniosClientesComponent,
    CuotasVencidasAgenciaComponent,
    PlazoFijoComponent,
    MensajesTextoComponent,
    PageNoAuthorizedComponent,
    CreditosAdjudicadosComponent,
    CreditosAprobadosComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    DataTablesModule
  ]
})
export class HomeModule { }
