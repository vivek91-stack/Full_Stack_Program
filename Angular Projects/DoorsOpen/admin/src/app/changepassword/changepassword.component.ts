import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from './changepassword.services';
import { CustomValidation } from '../custom_validation/customValidation';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  templateUrl: 'changepassword.component.html'
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;
  submitted: boolean = false;
  formdisable: boolean = false;
  sendObj: any;

  constructor(
    public customValidate: CustomValidation,
    public changePasswordFactory: ChangePasswordService,
    public router: Router,
    public toasterService: ToasterService,
  ) {
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      'current_password': new FormControl('', [Validators.required]),
      'new_password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      'conf_password': new FormControl('', [Validators.required])
    });
  }

  changePasswordFormSubmit(): void {
    this.toasterService.clear();
    this.submitted = true;
    const newPass = this.changePasswordForm.value.new_password;
    const cnfPass = this.changePasswordForm.value.conf_password;
    const oldPass = this.changePasswordForm.value.current_password;
    this.sendObj = {
      old_password: oldPass,
      new_password: newPass,
    }
    if (this.changePasswordForm.valid && (newPass == cnfPass)) {
      this.formdisable = true;
      this.changePasswordFactory.changePassword(this.sendObj).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res))
          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/usersmgmt"]);
          } else {
            this.formdisable = false;
            this.toasterService.pop('error', 'Error', 'Your current password is wrong.');
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
