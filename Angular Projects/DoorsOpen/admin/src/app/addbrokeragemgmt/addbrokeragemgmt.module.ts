import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
// DataTable

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddNewBrokerageTypemgmtComponent } from './addbrokeragemgmt.component';
import { AddNewBrokerageTypeComponent } from './addnewbrokeragetype.component';
import { EditBrokerageTypeComponent } from './edit-brokerage.component';
import { AddNewBrokerageTypeRoutingModule } from './addbrokeragemgmt-routing.module';
import { DataTablesModule } from 'angular-datatables';
//Service
import { AddBrokeragemgmtService } from './addbrokeragemgmt.services';
import { NgxSelectModule } from 'ngx-select-ex';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    AddNewBrokerageTypeRoutingModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxSelectModule,
    ToasterModule
  ],
  declarations: [
    AddNewBrokerageTypemgmtComponent,
    AddNewBrokerageTypeComponent,
    EditBrokerageTypeComponent
    //ScheduleFormComponent,
  ],
  providers: [
    AddBrokeragemgmtService,
    HttpClientModule,
  ],
})
export class AddBrokeragemgmtModule { }
