import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCreditsComponent } from './report-credits/report-credits.component';
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from "../../components/components.module";


@NgModule({
    declarations: [
        ReportCreditsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DataTablesModule,
        ComponentsModule
    ]
})
export class CreditsModule { }
