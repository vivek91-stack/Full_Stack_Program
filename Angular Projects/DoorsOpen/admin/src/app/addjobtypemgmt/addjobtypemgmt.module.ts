import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
// DataTable

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddJobTypemgmtComponent } from './addjobtypemgmt.component';
import { AddNewJobTypeComponent } from './addnewjobtype.component';
import { AddJobTypeRoutingModule } from './addjobtypemgmt-routing.module';
import { EditJobTypeComponent } from './editjobtype-details.component';
import { DataTablesModule } from 'angular-datatables';
import { ColorPickerModule } from 'ngx-color-picker';
//Service
import { AddJobTypemgmtService } from './addjobtypemgmt.services';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  imports: [
    AddJobTypeRoutingModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // DataTablesModule,
    ColorPickerModule,
    ToasterModule
  ],
  declarations: [
    AddJobTypemgmtComponent,
    AddNewJobTypeComponent,
    EditJobTypeComponent
  ],
  providers: [
    AddJobTypemgmtService,
    HttpClientModule,
  ],
})
export class AddJobTypemgmtModule { }
