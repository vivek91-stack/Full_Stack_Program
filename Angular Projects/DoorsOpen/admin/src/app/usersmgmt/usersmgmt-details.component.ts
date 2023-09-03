import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidation } from '../custom_validation/customValidation';
import { UsersmgmtService } from './usersmgmt.services';
import { environment } from '../../environments/environment';
import { FileValidator } from './../custom_validation/file-input.validator';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { ToasterService } from 'angular2-toaster';

@Component({
  templateUrl: 'usersmgmt-details.component.html',
  styleUrls: ['./usersmgmt.css']
})
export class ViewUserDetailsComponent implements OnInit {
  public selectedOptions: INgxSelectOptions[] = [];

  viewDetailsForm!: FormGroup; //= new FormGroup;
  //= new FormGroup;
  private user_id: any;
  public user_img: any;
  public action: string = 'view';
  public userDetails: any;
  public defaultImgUrl = environment.default_imgUrl;
  public UserimgUrl = environment.user_imgUrl;
  public getuserDetails: any;
  public submitted: Boolean = false;
  imageUploadExtentionError: any = false;
  imgPreview: any = "";
  public AllBrokerage: any;
  public get_broker_name_by_id: any;
  public get_brokerage_id: any = '';
  public get_brokerage_name: any = '';
  public edit_brokerage_form_open: Boolean = false;
  public is_brokerage_select: Boolean = false;
  public imageUrl: Blob[] = [];
  public isUserImgChanged: boolean = false;
  public formdisable: Boolean = true;
  public img: any;
  eventsType: any;
  setBrkType: any;

  constructor(
    public userFactory: UsersmgmtService,
    public router: Router,
    public route: ActivatedRoute,
    public customValidate: CustomValidation,
    public toasterService: ToasterService,
    private filevalidator: FileValidator
  ) {
  }

  ngOnInit(): void {
    this.viewDetailsForm = new FormGroup({
      'first_name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.customValidate.first_space_disallow), Validators.pattern(this.customValidate.disallow_all_spaces)]),
      'last_name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.customValidate.first_space_disallow), Validators.pattern(this.customValidate.disallow_all_spaces)]),
      'email': new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.customValidate.email_pattern)]),
      // 'area_of_service': new FormControl(),
      'phone': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(15), Validators.pattern(this.customValidate.phn_num_pattern)]),
      'licence_number': new FormControl(''),
      'brokerage_type': new FormControl(''),
      'latitude': new FormControl(''),
      'longitude': new FormControl(''),
      'image': new FormControl(null),
      'about': new FormControl(),
      // 'status': new FormControl()
    });
    this.route.params.subscribe(params => {
      this.user_id = params.user_id;
    });
    this.viewUserDetails(this.user_id);

  }



  handleFileInput(e: any) {
    let reader = new FileReader();

    let file = e.target.files[0];
    if (file.length > 0) {
      this.imageUrl.push(file);
    } else {
      this.imageUploadExtentionError = false;
      this.imageUrl = [];
    }

    if (file) {
      if (!this.filevalidator.validateFile(file.name)) {
        this.imageUploadExtentionError = true;

        this.imgPreview = '';
      } else {
        reader.onloadend = (e: any) => {
          this.imgPreview =this.user_img= e.target.result;
        };
        this.isUserImgChanged = true
        this.img = e.target.files[0];
        this.viewDetailsForm.controls['image'].setValue(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        this.imageUploadExtentionError = false;
      }
    } else {
      this.imageUploadExtentionError = false;
      this.viewDetailsForm.controls['image'].setValue('');
    }
  }

  errorHandler(event: any) {
    event.target.src = this.defaultImgUrl;
  }

  editUserDetails(userId: any) {
    this.action = 'edit';
    this.formdisable = false;
  }

  viewUserDetails(userId: string): void {
    let userData = { 'id': userId }
    this.userFactory.getUserDetails(userData).subscribe(
      response => {
        // this.toasterService.pop('success','Success','User details found successfully.')
        this.getuserDetails = JSON.parse(JSON.stringify(response));
        let resData = JSON.parse(JSON.stringify(response));

        if (resData.status == 200) {
          this.userDetails = this.getuserDetails['data'];
          this.user_img = this.UserimgUrl + this.userDetails.image
          this.viewDetailsForm.patchValue({
            // user_id: this.user_id,
            first_name: this.userDetails.first_name,
            last_name: this.userDetails.last_name,
            email: this.userDetails.email,
            phone: this.userDetails.phone,
            // area_of_service: this.userDetails.area_of_service,
            licence_number: this.userDetails.licence_number,
            brokerage_type: this.userDetails.brokerage_type,
            latitude: this.userDetails.latitude,
            longitude: this.userDetails.longitude,
            image: (this.imageUrl = []) ? null : this.userDetails.image,
            about: this.userDetails.about,
            // status: this.userDetails.status
          });
            this.setBrkType = this.userDetails.brokerage_type;
          this.autoGet_brokerage(this.userDetails.brokerage_type);
        } else {
          console.log('No user found');
        }

      },
      error => {
        // this.toasterService.pop('error','Error','No User details found.')
        console.log('error', error);
      }
    );
  }

  autoGet_brokerage(brokerage_type: any) {
    this.userFactory.getBrokerage().subscribe(
      res => {
        let resData = JSON.parse(JSON.stringify(res));

        if (resData.status == 200) {
          this.AllBrokerage = JSON.parse(JSON.stringify(res)).data;
          for (let brkrg of this.AllBrokerage) {
            if (brkrg.type_id == brokerage_type) {
              this.get_broker_name_by_id = brkrg.name;
              this.viewDetailsForm.controls['brokerage_type'].setValue(this.get_broker_name_by_id)
            }

          }
        } else {
          this.AllBrokerage = [];
        }
      },
      error => {
        console.log('Something went wrong with fetching brokerage types.');
      }
    );
  }

  getEventTypes() {
    this.userFactory.getBrokerage().subscribe(
      (res) => {
        let resData = JSON.parse(JSON.stringify(res));

        if (resData.status == 200) {
          this.eventsType = resData.data;
        }
      },
      (err) => {}
    );
  }


  viewDetailsFormSubmit() {
    this.submitted = true;
    this.formdisable = true;
    if (this.viewDetailsForm.valid && this.imageUploadExtentionError == false && this.is_brokerage_select == false) {
      this.viewDetailsForm.value.user_id = this.user_id;

      var formData: any;
      formData = {
        first_name: this.viewDetailsForm.controls.first_name.value,
        last_name: this.viewDetailsForm.controls.last_name.value,
        email: this.viewDetailsForm.controls.email.value,
        phoneNumber: this.viewDetailsForm.controls.phone.value,
        latitude: this.viewDetailsForm.controls.latitude.value,
        longitude: this.viewDetailsForm.controls.longitude.value,
        about: this.viewDetailsForm.controls.about.value,
        user_id: this.user_id,
        type_id : this.viewDetailsForm.controls.brokerage_type.value
      }
      if (this.isUserImgChanged) {
        formData.image = this.img
      }

      this.userFactory.updateUser(formData).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));

          if (resData.status == 200) {
            this.action = 'view';
            this.viewUserDetails(this.user_id);
            this.router.navigate(['/usersmgmt/userDetails', this.user_id]);
            this.toasterService.pop('success', 'Success', resData.message)
          } else {
            this.formdisable = false;
          }
        },
        err => {
          this.toasterService.pop('error', "Error", "Oops !! Somthing went wrong.")
          this.formdisable = false;
        }
      )
    }
  }
}
