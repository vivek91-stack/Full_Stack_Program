import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddJobTypemgmtService } from './jobsuggestionmgmt.services';
// import { CustomValidation } from '../custom_validation/customValidation';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  templateUrl: 'editjobsuggestion.component.html'
})
export class EditJobSuggestionComponent implements OnInit {

  editJobtypeForm!: FormGroup;
  submitted: boolean = false;
  formdisable: boolean = false;
  job_category_id: any;
  getJobCategoryDetails: any;
  actions: any;
  color_picker: Boolean = false;
  color = '#0000';
  hex: any;
  public suggestionType: any;



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
      this.job_category_id = params.id;
    })
    this.editJobtypeForm = new FormGroup({
      'content': new FormControl('', [Validators.required]),
      'type': new FormControl('', [Validators.required]),
    });
    this.viewJobCategoryForm(this.job_category_id);
  }

  viewJobCategoryForm(jobCategoryId: any) {
    this.actions = 'view';
    let jobCatId = { 'id': jobCategoryId }
    this.AddJobTypemgmtService.getJobSuggestionDetails(jobCatId).subscribe(
      res => {
        let resData = JSON.parse(JSON.stringify(res));

        if (resData.status == 200) {
          this.getJobCategoryDetails = resData.data;
          console.log("this.getJobCategoryDetails " ,this.getJobCategoryDetails);
          this.suggestionType = this.getJobCategoryDetails.type;
          this.editJobtypeForm.setValue({
            content: this.getJobCategoryDetails.content,
            type: this.getJobCategoryDetails.type,
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
      this.editJobtypeForm.value.id = this.job_category_id;
      this.AddJobTypemgmtService.editJobSuggestion(this.editJobtypeForm.value).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));

          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/jobsuggestionmgmt"]);
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
