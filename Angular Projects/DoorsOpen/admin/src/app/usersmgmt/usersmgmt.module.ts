import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { UsersDataFilterPipe } from './usersdatafilterpipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
// Component
import { UsersmgmtComponent } from './usersmgmt.component';
import { UserAddComponent } from './add-user.component';
import { ViewUserDetailsComponent } from './usersmgmt-details.component';

import { UsersmgmtRoutingModule } from './usersmgmt-routing.module';
import { CustomValidation } from '../custom_validation/customValidation';
import { UsersmgmtService } from './usersmgmt.services';
// import { FileValidator } from './../custom_validation/file-input.validator';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../custom-filter/shareModule';
import { ToasterModule } from 'angular2-toaster';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    UsersmgmtRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ToasterModule,
    NgxSelectModule,
    SharedModule,
    ModalModule
    // FileValidator
  ],
  declarations: [UsersmgmtComponent, ViewUserDetailsComponent, UsersDataFilterPipe, UserAddComponent],
  providers: [
    CustomValidation,
    UsersmgmtService,
    HttpClient,
    // FileValidator
  ],
})
export class UsersmgmtModule { }
