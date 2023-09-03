import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// DataTable

import { PaymgmtComponent } from './paymentmgmt.component';
import { PaymgmtRoutingModule } from './paymentmgmt-routing.module';
//Service
import { PaymgmtService } from './paymentmgmt.services';

// import { NgProgressModule } from 'ngx-progressbar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
// import { DataTableModule } from 'angular2-datatable';


@NgModule({
  imports: [
    PaymgmtRoutingModule,
    CommonModule,
    DataTablesModule,
    // HttpModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // NgProgressModule
  ],
  declarations: [
    PaymgmtComponent,
    //ScheduleFormComponent,
  ],
  providers: [
    PaymgmtService,
    HttpClientModule,

  ],
})
export class PaymgmtModule { }
