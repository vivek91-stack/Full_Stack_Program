import { FileValidator } from './../custom_validation/file-input.validator';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersmgmtService } from './usersmgmt.services';
import { CustomValidation } from '../custom_validation/customValidation';
// import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { ToasterService } from 'angular2-toaster';

@Component({
  templateUrl: 'add-user.component.html',
  styleUrls: ['./usersmgmt.css']
})
export class UserAddComponent implements OnInit {
  public selectedOptions: INgxSelectOptions[] = [];

  public ngxValue: any = [];
  public ngxDisabled = false;

  userAddForm!: FormGroup; //= new FormGroup;
  //= new FormGroup;
  submitted: boolean = false;
  formdisable: boolean = false;
  brokerage_types: any;

  public get_brokerage_id: any = '';
  // public get_brokerage_name: any = '';
  public is_brokerage_select: Boolean = false;
  public is_not_selected: Boolean = false;
  public is_non_agent_or_not: Boolean = false;
  public is_licence_required: Boolean = false;
  public licence_num_for_agent: any = null;
  public licence_length_validation: Boolean = false;

  imageUploadExtentionError: any = false;
  imgPreview: any = "";

  constructor(
    public customValidate: CustomValidation,
    public userAddFactory: UsersmgmtService,
    public router: Router,
    public toasterService: ToasterService,
    private filevalidator: FileValidator
  ) {
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.userAddForm = new FormGroup({
      'first_name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.customValidate.first_space_disallow), Validators.pattern(this.customValidate.disallow_all_spaces), Validators.pattern(this.customValidate.alpha)]),
      'last_name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.customValidate.first_space_disallow), Validators.pattern(this.customValidate.disallow_all_spaces), Validators.pattern(this.customValidate.alpha)]),
      'email': new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.customValidate.email_pattern)]),
      // 'area_of_service': new FormControl(),
      'phone': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(15), Validators.pattern(this.customValidate.phn_num_pattern)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.customValidate.password_pattern)]),
      // 'licence_number': new FormControl(''),
      //  'brokerage_type': new FormControl('', [Validators.required]),
      'latitude': new FormControl(null),
      'longitude': new FormControl(null),
      'image': new FormControl(null, Validators.required),
      'about': new FormControl('')
    });
    this.userAddForm.value.brokerage_type = null;
    this.autoGet_brokerage();
    this.is_licence_required = true;
    this.is_brokerage_select = true;
  }

  handleFileInput(e: any) {
    let reader = new FileReader();
    let file = e.target.files[0];

    let file_length = e.target.files.length
    if (file) {
      if (!this.filevalidator.validateFile(file.name)) {
        this.imageUploadExtentionError = true;

        // this.imgPreview = '';
      } else {
        // reader.onloadend = (e: any) => {
        //   this.imgPreview = e.target.result;
        // };
        this.is_not_selected = false;
        this.userAddForm.controls['image'].setValue(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        this.imageUploadExtentionError = false;
        // this.imageUrl = file;
      }
    } else {
      this.imageUploadExtentionError = false;
      if (file_length == 0) {
        this.userAddForm.controls['image'].setValue('');
        this.is_not_selected = true;
      }
    }
  }
  licenceNumber(event: any) {
    if (event.target.value != '' && event.target.value != null) {
      this.licence_num_for_agent = event.target.value;

      this.is_licence_required = false;
      if (event.target.selectionEnd == 7) {
        this.licence_length_validation = false;
      } else {
        this.licence_length_validation = true;
      }
    } else {
      this.is_licence_required = true;
      this.licence_num_for_agent = event.target.value;
    }
  }

  isAgnentOrNot(event: any) {
    this.is_non_agent_or_not = !this.is_non_agent_or_not;
    if (event.target.checked) {
      this.licence_length_validation = false;
      this.is_licence_required = false;
      this.is_brokerage_select = false;
      this.get_brokerage_id = '';
      this.licence_num_for_agent = '';
    } else {
      this.is_licence_required = true;
      this.is_brokerage_select = true;
    }
  }



  autoGet_brokerage() {
    this.userAddFactory.getBrokerage().subscribe(
      res => {
        let resData = JSON.parse(JSON.stringify(res));

        if (resData.status == 200) {
          this.brokerage_types = JSON.parse(JSON.stringify(res)).data;
        } else {
          this.brokerage_types = [];
        }
      },
      error => {
        this.toasterService.pop('error', 'Error', 'Something went wrong with fetching brokerage types.');
      }
    );
  }

  selectBrokerage(e: any) {
    // if (e.target.value != null) {
    //   this.get_brokerage_id = e.target.value;
    // }
    if (e.target.value != "" && e.target.value != null) {
      this.is_brokerage_select = false;
      this.get_brokerage_id = e.target.value;

    } else {
      this.is_brokerage_select = true;
    }
  }


  userAddFormSubmit(): void {
    this.submitted = true;
    console.log( this.is_non_agent_or_not);
    
    if (this.userAddForm.valid && this.imageUploadExtentionError == false && this.is_brokerage_select == false && this.is_licence_required == false && this.licence_length_validation == false) {
      this.formdisable = true;
      this.userAddForm.value.brokerage_type = (this.get_brokerage_id != '') ? this.get_brokerage_id : '';
      this.userAddForm.value.licence_number = (this.licence_num_for_agent != '') ? this.licence_num_for_agent : '';
      console.log(this.userAddForm.value)
      this.userAddFactory.userAdd(this.userAddForm.value).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));

          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/usersmgmt"]);
          } else {
            this.formdisable = false;
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
