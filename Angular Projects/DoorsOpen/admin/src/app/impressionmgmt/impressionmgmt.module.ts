import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CustomValidation } from '../custom_validation/customValidation';
// import { FileValidator } from './../custom_validation/file-input.validator';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../custom-filter/shareModule';
import { ImpressionmgmtComponent } from './impressionmgmt.component';
import { ImpressionmgmtRoutingModule } from './impressionmgmt-routing.module';
import { ImpressionmgmtService } from './impressionmgmt.services';
import { UpdateImpressionComponent } from './update-impression.component';
import { AddImpressionComponent } from './add-impression.component';
import { ImpressionmgmtDetailsComponent } from './impressoinmgmt-details.component';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    ImpressionmgmtRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ToasterModule,
    NgxSelectModule,
    SharedModule
    // FileValidator
  ],
  declarations: [ImpressionmgmtComponent, UpdateImpressionComponent, AddImpressionComponent, ImpressionmgmtDetailsComponent],
  providers: [
    CustomValidation,
    HttpClient,
    ImpressionmgmtService
    // FileValidator
  ],
})
export class ImpressionmgmtModule { }