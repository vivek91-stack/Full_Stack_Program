import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { CustomValidation } from './../../custom_validation/customValidation';
import { FileValidator } from './../../custom_validation/file-input.validator';
import { environment } from './../../../environments/environment';
import { VendorManagementService } from '../vendor-management.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  submitted:boolean=false;
  vendorAddForm!: FormGroup;
  public defaultImgUrl = ''//environment.default_imgUrl;
  public bannerimgUrl = environment.banner_imgUrl;
  imageUploadExtentionError: any = false;
  newImage: any = '';
  name = "Angular 4";
  ckeditorContent: string = "<p>Some html</p>";
  config = {
    uiColor: "#ffffff",
    toolbarGroups: [
      { name: "clipboard", groups: ["clipboard", "undo"] },
      { name: "editing", groups: ["find", "selection", "spellchecker"] },
      { name: "links" },
      { name: "insert" },
      { name: "document", groups: ["mode", "document", "doctools"] },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      { name: "paragraph", groups: ["list", "indent", "blocks", "align"] },
      { name: "styles" },
      { name: "colors" },
    ],
    skin: "kama",
    resize_enabled: false,
    removePlugins: "elementspath,save,magicline",
    extraPlugins: "divarea,smiley,justify,indentblock,colordialog",
    colorButton_foreStyle: {
      element: "font",
      attributes: { color: "#(color)" },
    },
    height: 188,
    removeDialogTabs: "image:advanced;link:advanced",
    removeButtons: "Subscript,Superscript,Anchor,Source,Table",
    format_tags: "p;h1;h2;h3;pre;div",
  };
  placeId: any;

  constructor(
    public customValidate: CustomValidation,
    public router: Router,
    public toasterService: ToasterService,
    private filevalidator: FileValidator,
    private vendorFactory:VendorManagementService
  ) { }

  ngOnInit(): void {
    this.vendorAddForm = new FormGroup({
      'googlePlaceId':new FormControl(''),
      'image': new FormControl(null, [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'phoneNumber':new FormControl('', [Validators.required]),
      'address':new FormControl('', [Validators.required]),
      'info':new FormControl('', [Validators.required]),
      'website':new FormControl('', [Validators.required])
    });
  }

  addVendorSubmit(){
    this.submitted = true;
    if (this.vendorAddForm.valid && this.imageUploadExtentionError == false) {
      console.log(this.vendorAddForm.value);
      var formdata = new FormData()
      formdata.append('name' , this.vendorAddForm.value.name)
      formdata.append('address' , this.vendorAddForm.value.address)
      formdata.append('phone' , this.vendorAddForm.value.phoneNumber)

      formdata.append('placeId' , this.placeId)

      formdata.append('image' , this.vendorAddForm.value.image)

      formdata.append('info' , this.vendorAddForm.value.info)

      formdata.append('website' , this.vendorAddForm.value.website)

      console.log(this.vendorAddForm.value.name);
      console.log(this.vendorAddForm.value.address);


      this.vendorFactory.addVendor(formdata).
      subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));
          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/vendormgmt"]);
          } else {
          }
        },
        error => {
          this.toasterService.pop('error', 'Error', error.error.message);
        }
      );

    }
  }

  errorHandler(event: any) {
    event.target.src = this.defaultImgUrl;
  }

  handleFileInput(e: any) {
    let reader = new FileReader();
    let file = e.target.files[0];

    let file_length = e.target.files.length
    if (file) {
      if (!this.filevalidator.validateFile(file.name)) {
        this.imageUploadExtentionError = true;
      } else {
        this.vendorAddForm.controls['image'].setValue(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = (e: any) => {
          this.newImage = e.target.result;
        };
        this.imageUploadExtentionError = false;
      }
    } else {
      this.imageUploadExtentionError = false;
      if (file_length == 0) {
        this.vendorAddForm.controls['image'].setValue('');
      }
    }
  }

  fromAddressChange(address: any) {
    console.log("address ------>> " ,address);
    console.log("address ------>> " ,address.place_id);

    this.placeId =address.place_id
    this.vendorAddForm.patchValue({
      address: address.formatted_address,
      placeId: address.place_id
    });
  }

}
