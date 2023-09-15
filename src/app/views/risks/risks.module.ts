import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessRisksComponent } from './process-risks/process-risks.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    ProcessRisksComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class RisksModule { }
