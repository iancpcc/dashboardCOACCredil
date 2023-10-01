import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartaPreferencialComponent } from './carta-preferencial/carta-preferencial.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routes';
import { NgModule } from '@angular/core';
import { PlazoFijoComponent } from './plazo-fijo/plazo-fijo.component';
import { ReportCreditsComponent } from './report-credits/report-credits.component';

@NgModule({
  declarations: [
    CartaPreferencialComponent,
    PlazoFijoComponent,
    ReportCreditsComponent,
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
