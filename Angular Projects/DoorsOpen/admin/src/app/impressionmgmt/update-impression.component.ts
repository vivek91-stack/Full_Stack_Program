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
  templateUrl: 'update-impression.component.html',
  styleUrls: ['./impressionmgmt.css']
})
export class UpdateImpressionComponent implements OnInit {
  public selectedOptions!: INgxSelectOptions[];

  public ngxValue: any = [];
  public ngxDisabled = false;
  impUpdateForm!: FormGroup;
  submitted: boolean = false;
  public imgUrl = environment.banner_imgUrl;
  public defaultImgUrl = environment.default_imgUrl;
  details: any;
  imageUploadExtentionError: any = false;
  imgPreview: any = "";
  newImage: any = '';
  bannerid: any;

  constructor(
    public customValidate: CustomValidation,
    public impUpFactory: ImpressionmgmtService,
    public router: Router,
    public toasterService: ToasterService,
    private filevalidator: FileValidator,
    public route: ActivatedRoute
  ) {
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.bannerid = param.bannerid;
    })
    this.impUpdateForm = new FormGroup({
      'id': new FormControl('', []),
      'image': new FormControl(null, []),
      'url': new FormControl('', [Validators.required, Validators.pattern(this.customValidate.url_pattern)])
    });
    this.getImpDatabyId();
  }

  getImpDatabyId() {
    this.impUpFactory.getImpData({ id: this.bannerid }).subscribe(
      res => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.status == 200) {
          this.details = JSON.parse(JSON.stringify(res));
          this.impUpdateForm.patchValue({
            id: this.details['data'].id,
            url: this.details['data'].url,
          });
          this.imgPreview = this.details.data.banner_image;
        } else {
          this.toasterService.pop('error', 'Error', resData.message);
        }
      },
      error => {
        this.toasterService.pop('error', 'Error', error.error.message);
      }
    );
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
        this.impUpdateForm.controls['image'].setValue(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = (e: any) => {
          this.newImage = e.target.result;
        };
        this.imageUploadExtentionError = false;
      }
    } else {
      this.imageUploadExtentionError = false;
      if (file_length == 0) {
        this.impUpdateForm.controls['image'].setValue('');
      }
    }
  }

  impFormSubmit(): void {
    this.submitted = true;
    if (this.impUpdateForm.valid && this.imageUploadExtentionError == false) {
      console.log(this.impUpdateForm.value)
      this.impUpFactory.updateData(this.impUpdateForm.value).subscribe(
        res => {
          let resData = JSON.parse(JSON.stringify(res));

          if (resData.status == 200) {
            this.toasterService.pop('success', 'Success', resData.message);
            this.router.navigate(["/impression"]);
          } else {
          this.toasterService.pop('error', 'Error', resData.message);
          }
        },
        error => {
          this.toasterService.pop('error', 'Error', error.error.message);
        }
      );
    }
  }

}
