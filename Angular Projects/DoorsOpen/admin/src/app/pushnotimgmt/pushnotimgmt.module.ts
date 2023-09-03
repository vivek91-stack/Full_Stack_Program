import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidation } from '../custom_validation/customValidation';

import { PushNotificationComponent } from './pushnotimgmt.component';
import { PushNotificationRoutingModule } from './pushnotimgmt-routing.module';
import { PushNotificationService } from './pushnotimgmt.services';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgxSelectModule } from 'ngx-select-ex';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PushNotificationRoutingModule,
    HttpClientModule,
    CommonModule,
    // AngularMultiSelectModule,
    NgxSelectModule
  ],
  declarations: [PushNotificationComponent],
  providers: [
    CustomValidation,
    HttpClient,
    PushNotificationService
  ]
})
export class PushNotificationModule { }
