import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidation } from '../custom_validation/customValidation';

import { ChangePasswordComponent } from './changepassword.component';
import { ChangePasswordRoutingModule } from './changepassword-routing.module';
import { ChangePasswordService } from './changepassword.services';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ChangePasswordRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [ChangePasswordComponent],
  providers: [
    CustomValidation,
    HttpClient,
    ChangePasswordService,
  ]
})
export class ChangePasswordModule { }
