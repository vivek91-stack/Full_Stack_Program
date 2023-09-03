import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
// DataTable

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreditPlanComponent } from './creditplan.component';
import { addCreditPlanComponent } from './add-creditplan.component';
import { creditPlanViewComponent } from './creditplan-view.component';
import { CreditPlanRoutingModule } from './creditplan-routing.module';
import { DataTablesModule } from 'angular-datatables';
//Service
import { CreditPlanService } from './creditplan.services';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  imports: [
    CreditPlanRoutingModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ToasterModule
  ],
  declarations: [
    CreditPlanComponent,
    addCreditPlanComponent,
    creditPlanViewComponent
    //ScheduleFormComponent,
  ],
  providers: [
    CreditPlanService,
    HttpClientModule,
   
  ],
})
export class CreditPlanModule { }
