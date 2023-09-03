import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddBrokeragemgmtService } from './addbrokeragemgmt.services';
// import { CustomValidation } from '../custom_validation/customValidation';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  templateUrl: 'addnewbrokeragetype.component.html'
})
export class AddNewBrokerageTypeComponent implements OnInit {

  brokerageAddForm!: FormGroup;
  submitted: boolean = false;
  formdisable: boolean = false;
  brokerage_types: any;

  constructor(
    // public customValidate: CustomValidation,
    public AddBrokeragemgmtService: AddBrokeragemgmtService,
    public router: Router,
    public toasterService: ToasterService,
    public fb: FormBuilder,
  ) {
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.brokerageAddForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
    });
  }

  brokerageAddFormSubmit(): void {
    // this.toasterService.clear();
    this.submitted = true;
    // this.formdisable = true;
    if (this.brokerageAddForm.valid) {
      this.AddBrokeragemgmtService.addBrokerage(this.brokerageAddForm.value).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));
          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/addbrokeragemgmt"]);
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
