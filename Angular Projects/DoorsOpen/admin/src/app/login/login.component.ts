import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidation } from '../custom_validation/customValidation';
import { LoginService } from './login.services';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
// import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  public toasterService: ToasterService;
  public localstorageData: any;
  public setItemToLocalstorage: any;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 2000
    });

  loginForm!: FormGroup;
  data: any;
  submitted: boolean = false;
  constructor(public customValidate: CustomValidation, public loginFactory: LoginService, public router: Router, toasterService: ToasterService) {
    this.toasterService = toasterService;
    let admData = localStorage.getItem('adminDetails');
    if (admData != null) {
      this.router.navigate(['/usersmgmt']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.customValidate.email_pattern)]),
      'password': new FormControl('', Validators.required)
    });
    this.doLogout();
  }

  onLoginFormSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      let params = this.loginForm.value;
      // let loginFormData: FormData = new FormData(); 
      // for (var key in params) {
      //   loginFormData.append(key, params[key])
      // }

      this.loginFactory.admin_login(params).subscribe(
        response => {
          this.localstorageData = JSON.parse(JSON.stringify(response));
          this.setItemToLocalstorage = {
            'email': this.localstorageData.data.email,
            'auth_token': this.localstorageData.data.auth_token
          }
          localStorage.setItem('adminDetails', JSON.stringify(this.setItemToLocalstorage));
          this.toasterService.pop('success', 'Success', 'Login Successfully Completed.');
          this.router.navigate(['/usersmgmt']);

        },
        error => {
          console.log('Login Error Response', error);
          this.toasterService.pop('error', 'Error', 'Invalid email or password');
        }
      );
    }
  }

  doLogout(): void {
    localStorage.removeItem('adminDetails');
  }


}
