import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
// Component
import { JobsmgmtComponent } from './jobsmgmt.component';
// import { JobAddComponent } from './add-job.component';
import { ViewJobsDetailsComponent } from './job-details.component';
import { JobTranjactionComponent } from './job-tranjections.component';
import { JobsmgmtRoutingModule } from './jobsmgmt-routing.module';
import { CustomValidation } from '../custom_validation/customValidation';
import { JobsmgmtService } from './jobsmgmt.services';
import { NgxSelectModule } from 'ngx-select-ex';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../custom-filter/shareModule';
import { ToasterModule } from 'angular2-toaster';
import {FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports: [
    JobsmgmtRoutingModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ToasterModule,
    NgxSelectModule,
    BsDatepickerModule.forRoot(),
    SharedModule
    // FileValidator
  ],
  declarations: [
      JobsmgmtComponent,
      ViewJobsDetailsComponent,
      JobTranjactionComponent
    //   JobAddComponent
    ],
  providers: [
    CustomValidation,
    JobsmgmtService,
    HttpClient,
    DatePipe
  ],
})
export class JobsmgmtModule { }
