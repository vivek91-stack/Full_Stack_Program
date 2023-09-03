import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { VendorManagementService } from '../vendor-management.service';
import { environment } from './../../../environments/environment';
import { CustomValidation } from './../../custom_validation/customValidation';
import { FileValidator } from './../../custom_validation/file-input.validator';


@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {

  viewDetailsForm!: FormGroup; //= new FormGroup;
  public action: string = 'view';
  public userDetails: any;
  public defaultImgUrl = environment.default_imgUrl;
  public UserimgUrl = environment.user_imgUrl;
  imageUploadExtentionError: any = false;
  newImage: any = '';
  submitted: boolean = false;
  vendor_id: any;
  vendor_image: any
  imageChanged: boolean = false;
  public formdisable: Boolean = true;
  placeId: any;



  constructor(
    public customValidate: CustomValidation,
    public router: Router,
    public route: ActivatedRoute,
    public toasterService: ToasterService,
    private filevalidator: FileValidator,
    public vendorFactory: VendorManagementService
  ) { }

  ngOnInit(): void {
    this.viewDetailsForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'phoneNumber': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'image': new FormControl(null),
      'info':new FormControl('', [Validators.required]),
      'website':new FormControl('', [Validators.required])
    });
    this.route.params.subscribe(params => {
      this.vendor_id = params.vendor_id;
    });

    this.getVendor(this.vendor_id)
  }

  errorHandler(event: any) {
    event.target.src = this.defaultImgUrl;
  }

  handleFileInput(e: any) {
    let reader = new FileReader();
    let file = e.target.files[0];

    let file_length = e.target.files.length
    this.imageChanged = true
    if (file) {
      if (!this.filevalidator.validateFile(file.name)) {
        this.imageUploadExtentionError = true;
      } else {
        this.viewDetailsForm.controls['image'].setValue(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = (e: any) => {
          this.newImage = this.vendor_image = e.target.result;
        };
        this.imageUploadExtentionError = false;
      }
    } else {
      this.imageUploadExtentionError = false;
      if (file_length == 0) {
        this.viewDetailsForm.controls['image'].setValue('');
      }
    }
  }

  viewDetailsFormSubmit() {
    this.submitted = true;
    this.formdisable = true;
    if (this.viewDetailsForm.valid && this.imageUploadExtentionError == false) {
      var formdata = new FormData()
      formdata.append('vendor_id', this.vendor_id)
      if (this.viewDetailsForm.value.name) {
        formdata.append('name', this.viewDetailsForm.value.name)
      }
      if (this.viewDetailsForm.value.address) {
        formdata.append('address', this.viewDetailsForm.value.address)
      }
      if (this.viewDetailsForm.value.phoneNumber) {
        formdata.append('phone', this.viewDetailsForm.value.phoneNumber)

        formdata.append('placeId', this.placeId)
      }
      if (this.imageChanged) {
        formdata.append('image', this.viewDetailsForm.value.image)
      }

      formdata.append('info' , this.viewDetailsForm.value.info)

      formdata.append('website' , this.viewDetailsForm.value.website)
      this.vendorFactory.editVendor(formdata).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));

          if (resData.status == 200) {
            this.action = 'view';
            this.toasterService.pop('success', 'Success', "Vendor Updated Successfully.")
          } else {
            this.formdisable = false;
          }
        },
        err => {
          this.formdisable = false;
          this.toasterService.pop('error', "Error", "Oops !! Somthing went wrong.")

        }
      )
    }
  }

  getVendor(vendorId: any) {
    let data = { 'vendor_id': vendorId }
    this.vendorFactory.getVendor(data).subscribe(
      response => {
        // this.toasterService.pop('success','Success','User details found successfully.')
        let resData = JSON.parse(JSON.stringify(response));

        if (resData.status == 200) {

          this.viewDetailsForm.setValue({
            // user_id: this.user_id,
            name: resData.data.name,
            phoneNumber: resData.data.phone,
            address: resData.data.address,
            image: resData.data.image,
            info: resData.data.info,
            website: resData.data.website,
          });
          this.vendor_image = environment.vendor_imgUrl + resData.data.image

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

  fromAddressChange(address: any) {
    console.log("address ------>> ", address);
    this.placeId = address.place_id;
    this.viewDetailsForm.patchValue({
      address: address.formatted_address,
      placeid: address.place_id
    });
  }

  editVendor(id: any) {
    this.action = 'edit';
    this.formdisable = false;
  }

}
