import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddJobTypemgmtService } from './addjobtypemgmt.services';
// import { CustomValidation } from '../custom_validation/customValidation';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  templateUrl: 'addnewjobtype.component.html'
})
export class AddNewJobTypeComponent implements OnInit {

  AddJobtypeForm!: FormGroup;
  submitted: boolean = false;
  formdisable: boolean = false;
  color = '#0000';
  hex: any;

  constructor(
    // public customValidate: CustomValidation,
    public AddJobTypemgmtService: AddJobTypemgmtService,
    public router: Router,
    public toasterService: ToasterService,
  ) {
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.AddJobtypeForm = new FormGroup({
      'category_name': new FormControl('', [Validators.required]),
      'event_color': new FormControl('', [Validators.required]),
    });
  }

  colorPickerChange(e: any) {
    this.AddJobtypeForm.controls['event_color'].setValue(e)
  }

  AddJobtypeFormSubmit(): void {
    this.submitted = true;
    if (this.AddJobtypeForm.valid) {
      this.AddJobTypemgmtService.addJobTypeDetails(this.AddJobtypeForm.value).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));

          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/addjobtypemgmt"]);
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
