import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { LoginRoutingModule } from './login-routing.module';
import { CustomValidation } from '../custom_validation/customValidation';
import { LoginService } from './login.services';
import { ToasterModule } from 'angular2-toaster';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToasterModule
  ],
  declarations: [LoginComponent, ForgotPasswordComponent],
  providers: [
    CustomValidation,
    LoginService,
    HttpClient
  ],
})
export class LoginModule { }
