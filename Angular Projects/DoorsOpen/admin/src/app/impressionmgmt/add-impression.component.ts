import { FileValidator } from './../custom_validation/file-input.validator';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidation } from '../custom_validation/customValidation';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { ImpressionmgmtService } from './impressionmgmt.services';
import { environment } from '../../environments/environment';
import { ToasterService } from 'angular2-toaster';

@Component({
  templateUrl: 'add-impression.component.html',
  styleUrls: ['./impressionmgmt.css']
})
export class AddImpressionComponent implements OnInit {
  public selectedOptions!: INgxSelectOptions[];

  public ngxValue: any = [];
  public ngxDisabled = false;
  impAddForm!: FormGroup;
  submitted: boolean = false;
  public imgUrl = environment.banner_imgUrl;
  public defaultImgUrl = environment.default_imgUrl;
  details: any;
  imageUploadExtentionError: any = false;
  imgPreview: any = "";
  newImage: any = '';
  btnDisable: boolean = false;

  constructor(
    public customValidate: CustomValidation,
    public impUpFactory: ImpressionmgmtService,
    public router: Router,
    public toasterService: ToasterService,
    private filevalidator: FileValidator
  ) {
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.impAddForm = new FormGroup({
      'image': new FormControl(null, [Validators.required]),
      'url': new FormControl('', [Validators.required, Validators.pattern(this.customValidate.url_pattern)])
    });
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
        this.impAddForm.controls['image'].setValue(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = (e: any) => {
          this.newImage = e.target.result;
        };
        this.imageUploadExtentionError = false;
      }
    } else {
      this.imageUploadExtentionError = false;
      if (file_length == 0) {
        this.impAddForm.controls['image'].setValue('');
      }
    }
  }

  impFormSubmit(): void {
    this.submitted = true;
    if (this.impAddForm.valid && this.imageUploadExtentionError == false) {
      this.btnDisable = true;
      console.log(this.impAddForm.value);
      this.impUpFactory.addData(this.impAddForm.value).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));
          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/impression"]);
          } else {
          this.toasterService.pop('error', 'Error',resData.message);
          }
        },
        error => {
          this.toasterService.pop('error', 'Error', error.error.message);
        }
      );
    }
  }

}
