import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddJobTypemgmtService } from './addjobtypemgmt.services';
// import { CustomValidation } from '../custom_validation/customValidation';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  templateUrl: 'editjobtype-details.component.html'
})
export class EditJobTypeComponent implements OnInit {

  editJobtypeForm!: FormGroup;
  submitted: boolean = false;
  formdisable: boolean = false;
  job_category_id: any;
  getJobCategoryDetails: any;
  actions: any;
  color_picker: Boolean = false;
  color = '#0000';
  hex: any;


  constructor(
    // public customValidate: CustomValidation,
    public AddJobTypemgmtService: AddJobTypemgmtService,
    public router: Router,
    public route: ActivatedRoute,
    public toasterService: ToasterService,
  ) {
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.job_category_id = params.job_category_id;
    })
    this.editJobtypeForm = new FormGroup({
      'category_name': new FormControl('', [Validators.required]),
      'event_color': new FormControl('', [Validators.required]),
    });
    this.viewJobCategoryForm(this.job_category_id);
  }

  viewJobCategoryForm(jobCategoryId: any) {
    this.actions = 'view';
    let jobCatId = { 'job_category_id': jobCategoryId }
    this.AddJobTypemgmtService.getJobTypeDetails(jobCatId).subscribe(
      res => {
        let resData = JSON.parse(JSON.stringify(res));

        if (resData.status == 200) {
          this.getJobCategoryDetails = resData.data;
          console.log("this.getJobCategoryDetails " ,this.getJobCategoryDetails);
          
          this.editJobtypeForm.setValue({
            category_name: this.getJobCategoryDetails.category_name,
            event_color: this.getJobCategoryDetails.event_color,
          })
        }
      },
      err => {
        console.log('SOMETHING WENT WRONG');
      }
    )
  }

  colorPickerChange(e: any) {
    // let colorType = JSON.parse(e);
    this.color_picker = true;
    this.editJobtypeForm.controls['event_color'].setValue(e)
  }

  editJobEvent(e: any, jobCatId: any) {
    this.actions = 'edit';
  }

  editJobtypeFormSubmit(): void {
    // this.toasterService.clear();
    this.submitted = true;
    // this.formdisable = true;
    if (this.editJobtypeForm.valid) {
      this.editJobtypeForm.value.job_category_id = this.job_category_id;
      this.AddJobTypemgmtService.editJobTypeDetails(this.editJobtypeForm.value).subscribe(
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
