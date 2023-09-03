import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.services';
import { CustomValidation } from '../custom_validation/customValidation';
import { ToasterService } from 'angular2-toaster';

@Component({
  templateUrl: 'forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  submitted: boolean = false;
  formdisable : boolean = false;
  sendObj :any; 

  constructor(
            public customValidate: CustomValidation, 
            public loginService: LoginService,
            public router: Router, 
            public toasterService: ToasterService,
          ) { 
            this.toasterService = toasterService
          }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.customValidate.email_pattern)]),
    });
  }

  forgotPasswordSubmit(): void {
    this.submitted = true;

    if (this.forgotPasswordForm.valid) {
      this.formdisable = true;
      this.loginService.forgotPassword(this.forgotPasswordForm.value).subscribe(
        (res:any) => {
          if (res['status_code'] == 200) {
              console.log(res)
            // this.toasterService.pop('success', 'Success', 'Your password changed successfully.');
            // this.router.navigate(["/usersmgmt"]);
            } else {
              this.formdisable = false;
            // this.toasterService.pop('error', 'Error', 'Your current password is wrong.');
            }
        },
        error => {
          this.formdisable = false;
          this.toasterService.pop('error', 'Error', 'Oops! Something went wrong.');
        }
      );
    }
  }

}
