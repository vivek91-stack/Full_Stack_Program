import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToasterModule } from 'angular2-toaster';
import { CustomValidation } from '../custom_validation/customValidation';
import { VendorManagementRoutingModule } from './vendor-management-routing.module';
import { VendorManagementComponent } from './vendor-management.component';
import { VendorManagementService } from './vendor-management.service';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [
    VendorManagementComponent,
    AddVendorComponent,
    VendorDetailsComponent
  ],
  imports: [
    VendorManagementRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ToasterModule,
    GooglePlaceModule,
    CKEditorModule,
  ],
  providers: [
    VendorManagementService,
    HttpClient,
    CustomValidation
  ]
})
export class VendorManagementModule { }
