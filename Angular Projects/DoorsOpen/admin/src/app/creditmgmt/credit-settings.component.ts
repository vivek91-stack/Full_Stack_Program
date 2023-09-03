import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditmgmtService } from './creditmgmt.services';
import { CustomValidation } from '../custom_validation/customValidation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  templateUrl: 'credit-settings.component.html',
  styleUrls: ['./creditmgmt.css']
})
export class CreditSettingsComponent implements OnInit {
  modalRef!: BsModalRef;

  creditSettingForm!: FormGroup;
  submitted: boolean = false;
  formdisable: boolean = false;
  err_credit_settings: Boolean = false;
  credit_modal_hide: Boolean = false;
  creditSettingsData: any;

  constructor(
    public customValidate: CustomValidation,
    public CreditmgmtService: CreditmgmtService,
    public router: Router,
    public toasterService: ToasterService,
    private modalService: BsModalService
  ) {
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.creditSettingForm = new FormGroup({
      'credit_per_month': new FormControl('', [Validators.required, Validators.pattern(this.customValidate.numeric)]),
      'non_agent_register_fee': new FormControl('', [Validators.required, Validators.pattern(this.customValidate.numeric)]),
      'job_create_deduct': new FormControl('', [Validators.required, Validators.pattern(this.customValidate.numeric)]),
      'mile': new FormControl('', [Validators.required, Validators.pattern(this.customValidate.numeric)]),
      'admin_fee_percentage': new FormControl('', [Validators.required, Validators.pattern(this.customValidate.numeric)])
    });

    this.getCreditsData();
  }

  getCreditsData() {
    this.CreditmgmtService.getCreditsData().subscribe(
      res => {
        let resData = JSON.parse(JSON.stringify(res));

        this.creditSettingsData = resData.data;

        this.creditSettingForm.setValue({
          'credit_per_month': this.creditSettingsData.credit_per_month,
          'non_agent_register_fee': this.creditSettingsData.non_agent_register_fee,
          'job_create_deduct': this.creditSettingsData.job_create_deduct,
          'admin_fee_percentage': this.creditSettingsData.admin_fee_percentage,
          'mile': this.creditSettingsData.mile,
        })
      },
      err => {
        console.log('Oops! SOMETHING WENT WRONG')
      }
    )
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  // seeCreditsOfMonth(template: TemplateRef<any>,e) {
  //   this.modalRef = this.modalService.show(template);
  //   this.credit_modal_hide = true;
  // }

  // creditModalHide(e) {
  //   let modalHide = e;
  //   if (modalHide == true) {
  //     this.modalRef.hide();
  //     this.credit_modal_hide = false;
  //   }
  // }

  creditSettingFormSubmit(): void {
    this.submitted = true;
    if (this.creditSettingForm.valid) {

      let adminFeePercentage = this.creditSettingForm.value.admin_fee_percentage;
      let creditPerMonth = this.creditSettingForm.value.credit_per_month;
      let jobCreateDeduct = this.creditSettingForm.value.job_create_deduct;
      let nonAgentRegisterFee = this.creditSettingForm.value.non_agent_register_fee;
      let mile = this.creditSettingForm.value.mile;

      if ((adminFeePercentage < 0) || (creditPerMonth < 0) || (jobCreateDeduct < 0) || (nonAgentRegisterFee < 0) || (mile <= 0)) {
        this.err_credit_settings = true;
      } else {
        this.err_credit_settings = false;
        this.CreditmgmtService.creditSettings(this.creditSettingForm.value).subscribe(
          res => {
            let resData = JSON.parse(JSON.stringify(res));
            if (resData.status_code == 200) {
              this.toasterService.pop('success', 'Success', resData.message);
              this.router.navigate(["/creditmgmt"]);
            }
          },
          error => {
            this.formdisable = false;
            this.toasterService.pop('error', 'Error', error.error.message);
          }
        );
      }
    }
  }

}

