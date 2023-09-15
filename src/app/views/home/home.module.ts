import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { CreditsModule } from '../credits/credits.module';
import { RisksModule } from '../risks/risks.module';



@NgModule({
  declarations: [

  ],
  imports: [
    ComponentsModule,
    CreditsModule,
    RisksModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
   

  ]
})
export class HomeModule { }
