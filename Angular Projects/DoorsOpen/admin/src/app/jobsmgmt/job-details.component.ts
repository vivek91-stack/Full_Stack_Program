import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidation } from '../custom_validation/customValidation';
import { JobsmgmtService } from './jobsmgmt.services';
import { FileValidator } from './../custom_validation/file-input.validator';
import { environment } from '../../environments/environment';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
// import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as moment from 'moment';
import { ToasterService } from 'angular2-toaster';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'job-details.component.html',
  styleUrls: ['./jobsmgmt.css'],
})
export class ViewJobsDetailsComponent implements OnInit {
  uploader!: FileUploader;
  isExtenstionError: boolean = false;

  public selectedOptions!: INgxSelectOptions[];

  isOldImgDeleted: string = 'false';
  deletedImgs: any = [];

  public ngxValue: any = [];
  public ngxDisabled = false;
  public bsValue = new Date();
  public viewDetailsForm!: FormGroup;
  private job_id: any;
  public action: string = 'view';
  public JobDetails: any;
  public defaultImgUrl = environment.default_imgUrl;
  public JobimgUrl = environment.job_thumb_imgUrl;
  public getJobDetails: any;
  public jobImgs: any;
  public get_event_id = '';
  public get_event_name = '';
  public reader: any;
  public submitted: Boolean = false;
  public imageUploadExtentionError: any = false;
  public imgPreview: string[] = [];
  isImgUpload: boolean = false;
  public imageUrl: Blob[] = [];
  public jobsImages: Blob[] = [];
  public eventsType: any;
  public is_event_select: Boolean = false;
  public refrashDate: Boolean = false;
  public dateInputFormat;
  public startDate: any;
  public endDate: any;
  public select_job_type: Boolean = false;
  public view_end_date: any;
  public set_date_not_valid: Boolean = false;
  public formdisable: Boolean = false;
  public maxFileError: boolean = false;
  public exceedLimit: boolean = false;
  public oldImgCount: any;
  public dueDate: Boolean = false;
  public licence_required: any;
  public is_title_required: Boolean = false;
  public title_required: Boolean = false;
  public jobs_img_count_after_delete!: number;
  response: string;

  constructor(
    public JobsmgmtService: JobsmgmtService,
    public router: Router,
    public route: ActivatedRoute,
    public customValidate: CustomValidation,
    private filevalidator: FileValidator,
    public toasterService: ToasterService,
    private cdRef: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {
    this.dateInputFormat = moment().format('MM-DD-YYYY');
    this.uploader = new FileUploader({
      //url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
    });
    this.response = '';
    this.uploader.response.subscribe((res: any) => (this.response = res));
  }

  ngOnInit(): void {
    this.viewDetailsForm = new FormGroup({
      title: new FormControl(''),
      user_name: new FormControl(''),
      host_name: new FormControl(''),
      apartment: new FormControl(''),
      street_address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      job_category_id: new FormControl('', Validators.required),
      details: new FormControl(''),
      start_datetime: new FormControl('', Validators.required),
      end_datetime: new FormControl('', Validators.required),
      mls_number: new FormControl(''),
      payout_amount: new FormControl(''),
      terms: new FormControl(''),
      cancelby: new FormControl(''),
      status: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      is_licence_required: new FormControl(''),
      cancel_reason: new FormControl(''),
      is_checkedin: new FormControl(''),
      checkin_time: new FormControl(''),
      category_name: new FormControl('', Validators.required),
      images: new FormControl(''),
      // 'status': new FormControl()
    });
    this.route.params.subscribe((params) => {
      this.job_id = params.job_id;
    });
    this.viewJobDetails(this.job_id);
    this.getEventTypes();
  }

  titleMiscellaneous(e: Event) {
    console.log('titleMiscellaneous ');
  }

  editJobDetails(jobId: any) {
    this.action = 'edit';
  }

  onDateValueChange(e: any) {
    // this.refrashDate = !this.refrashDate;
    let dateFormat = new Date(e);
    this.startDate =
      dateFormat.getFullYear() +
      '-' +
      '0' +
      (dateFormat.getMonth() + 1) +
      '-' +
      dateFormat.getDate();
    this.viewDetailsForm.value.start_datetime = this.startDate;
    // this.minDate.setDate(dateFormat.getDate());
    let checkStartDate = new Date(this.startDate);
    let checkEndDate = new Date(this.endDate);

    if (
      checkStartDate.getFullYear() > checkEndDate.getFullYear() ||
      (checkStartDate.getFullYear() == checkEndDate.getFullYear() &&
        checkStartDate.getMonth() + 1 > checkEndDate.getMonth() + 1)
    ) {
      this.set_date_not_valid = true;
    } else {
      this.set_date_not_valid = false;
    }

    if (
      checkStartDate.getFullYear() == checkEndDate.getFullYear() &&
      checkStartDate.getMonth() + 1 == checkEndDate.getMonth() + 1
    ) {
      if (checkStartDate.getDate() > checkEndDate.getDate()) {
        this.set_date_not_valid = true;
      } else {
        this.set_date_not_valid = false;
      }
    }
  }

  onEndDateValueChange(e: any) {
    let dateFormat = new Date(e);
    this.endDate =
      dateFormat.getFullYear() +
      '-' +
      '0' +
      (dateFormat.getMonth() + 1) +
      '-' +
      dateFormat.getDate();
    this.viewDetailsForm.value.end_datetime = this.endDate;

    let checkStartDate = new Date(this.startDate);
    let checkEndDate = new Date(this.endDate);

    if (
      checkStartDate.getFullYear() > checkEndDate.getFullYear() ||
      (checkStartDate.getFullYear() == checkEndDate.getFullYear() &&
        checkStartDate.getMonth() + 1 > checkEndDate.getMonth() + 1)
    ) {
      this.set_date_not_valid = true;
    } else {
      this.set_date_not_valid = false;
    }

    if (
      checkStartDate.getFullYear() == checkEndDate.getFullYear() &&
      checkStartDate.getMonth() + 1 == checkEndDate.getMonth() + 1
    ) {
      if (checkStartDate.getDate() > checkEndDate.getDate()) {
        this.set_date_not_valid = true;
      } else {
        this.set_date_not_valid = false;
      }
    }
  }

  isLicenceRequired(event: any) {
    if (event.target.checked) {
      this.licence_required = 0;
    } else {
      this.licence_required = 1;
    }
  }

  handleFileInput(e: any) {
    this.isImgUpload = true;
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      if (!this.filevalidator.validateFile(files[i].name)) {
        this.imageUrl = [];
        this.imageUploadExtentionError = true;
        return;
      } else {
        this.reader = new FileReader();
        this.reader.onloadend = (e: any) => {
          // console.log(e.target);

          // this.jobImgs = this.jobImgs.push(e.target.files[0])
          this.imgPreview.push(e.target.result);
        };
        this.reader.readAsDataURL(files[i]);
        this.imageUploadExtentionError = false;
        //   this.minFileError = false;
      }
    }
    console.log('files.length ', files.length);

    if (files.length > 0) {
      for (let imgs of files) {
        console.log('imgs ', imgs.name);

        this.imageUrl.push(imgs);
      }
    } else {
      this.imageUploadExtentionError = false;
      this.imageUrl = [];
    }
    if (this.imageUrl.length > 10) {
      this.maxFileError = true;
    } else {
      // this.minFileError = false;
      this.maxFileError = false;
    }
    // let oldImgCount = 0;
    let newImgCount = files.length;
    this.countTotleImgs(this.imageUrl.length, newImgCount);
  }

  deleteFile(image_index: any) {
    this.imageUrl.splice(image_index, 1);
    this.imgPreview.splice(image_index, 1);
    this.countTotleImgs(null, 0);
  }

  errorHandler(event: any) {
    event.target.src = this.defaultImgUrl;
  }

  getEventTypes() {
    this.JobsmgmtService.getEvenCategoryList({}).subscribe(
      (res) => {
        let resData = JSON.parse(JSON.stringify(res));

        if (resData.status == 200) {
          this.eventsType = resData.data;
        }
      },
      (err) => {}
    );
  }

  selectEvent(e: any) {
    if (e.target.value == '') {
      this.get_event_name = '';
    } else {
      this.is_title_required = false;
      this.title_required = false;
      let eventData = e.target.value;
      this.get_event_name = eventData;
      if (this.get_event_name == 'Miscellaneous') {
        this.viewDetailsForm.controls['title'].setValue('');
      }
      this.JobsmgmtService.getEvenCategoryList({}).subscribe(
        (res) => {
          let resData = JSON.parse(JSON.stringify(res));
          if (resData.status_code == 200) {
            this.eventsType = resData.data.all_users;
            for (let evnt of this.eventsType) {
              if (evnt.category_name == this.get_event_name) {
                this.get_event_id = evnt.job_category_id;
              }
            }
          }
        },
        (err) => {}
      );
    }
  }

  viewJobDetails(jobId: string): void {
    let job_id = { job_id: jobId };
    this.JobsmgmtService.getJobDetails(job_id).subscribe(
      (response) => {
        this.getJobDetails = JSON.parse(JSON.stringify(response));
        let resData = JSON.parse(JSON.stringify(response));
        this.jobImgs =
          this.getJobDetails.data.images != null
            ? JSON.parse(this.getJobDetails.data.images)
            : '';
        this.jobs_img_count_after_delete = this.jobImgs.length;
        if (resData.status == 200) {
          this.JobDetails = this.getJobDetails.data;

          const today_date = new Date();
          const start_date = new Date(this.getJobDetails.data.start_datetime);
          const end_date = new Date(this.getJobDetails.data.end_datetime);

          const check_date = new Date(this.JobDetails.checkin_time);
          if (today_date > end_date) {
            this.dueDate = true;
          }

          this.viewDetailsForm.setValue({
            title: this.JobDetails.title,
            user_name: this.JobDetails.user_name,
            host_name: this.JobDetails.host_name,
            apartment: this.JobDetails.apartment,
            street_address: this.JobDetails.street_address,
            city: this.JobDetails.city,
            state: this.JobDetails.state,
            zip: this.JobDetails.zip,
            job_category_id: this.JobDetails.job_category_id.job_category_id,
            latitude: this.JobDetails.latitude,
            longitude: this.JobDetails.longitude,
            details: this.JobDetails.details,
            start_datetime: start_date,
            // (start_date.getMonth() + 1 > 9 ? '' : '0') +
            // (start_date.getMonth() + 1) +
            // '-' +
            // start_date.getDate() +
            // '-' +
            // start_date.getFullYear()+new Date(start_date),
            end_datetime: end_date,
            // (end_date.getMonth() + 1 > 9 ? '' : '0') +
            // (end_date.getMonth() + 1) +
            // '-' +
            // end_date.getDate() +
            // '-' +
            // end_date.getFullYear(),
            mls_number: this.JobDetails.mls_number,
            payout_amount: this.JobDetails.payout_amount,
            terms: this.JobDetails.terms,
            // is_licence_required: (this.JobDetails.is_licence_required == 1)? 'Required': 'Not Required',
            is_licence_required: this.JobDetails.is_licence_required,
            cancel_reason: this.JobDetails.cancel_reason,
            is_checkedin: this.JobDetails.is_checkedin == 1 ? 'Yes' : 'No',
            checkin_time:
              this.JobDetails.checkin_time == null
                ? this.JobDetails.checkin_time
                : (check_date.getMonth() + 1 > 9 ? '' : '0') +
                  (check_date.getMonth() + 1) +
                  '-' +
                  (check_date.getDate() > 9 ? '' : '0') +
                  check_date.getDate() +
                  '-' +
                  check_date.getFullYear() +
                  ' ' +
                  (check_date.getHours() > 10 ? '' : '0') +
                  check_date.getHours() +
                  ':' +
                  check_date.getMinutes() +
                  (check_date.getMinutes() > 9 ? '' : '0') +
                  ' ' +
                  (check_date.getHours() > 11 ? 'PM' : 'AM'),
            cancelby: this.JobDetails.cancelby,
            category_name: this.JobDetails.job_category_id.category_name,
            status: this.JobDetails.status,
            images: JSON.stringify(this.JobDetails.images),
            // status: this.JobDetails.status
          });
          this.jobsImages.push(JSON.parse(this.JobDetails.images));
          // this.oldImgCount = this.jobsImages['0'].length;
          let newImgCount = 0;
          this.countTotleImgs(this.jobs_img_count_after_delete, newImgCount);
        } else {
          console.log('No Job found');
        }
      },
      (error) => {
        // this.toasterService.pop('error','Error','No User details found.')
        console.log('error', error);
      }
    );
  }

  deleteJobFile(job_img: any, index: any) {
    this.isOldImgDeleted = 'true';
    this.deletedImgs.push(job_img);

    this.jobImgs.splice(index, 1);
    this.jobs_img_count_after_delete = this.jobImgs.length;
    this.countTotleImgs(this.jobImgs.length, this.imageUrl.length);
  }

  countTotleImgs(oldImgCount: any, newImgCount: any) {
    let oldOneImgs =
      oldImgCount != 0
        ? this.jobs_img_count_after_delete
        : this.imageUrl.length;
    let totleCount = oldOneImgs + this.imageUrl.length;
    if (this.imageUrl.length > 10 || totleCount > 10) {
      // this.imageUrl = [];
      // this.imgPreview = [];
      this.exceedLimit = true;
    } else {
      this.exceedLimit = false;
    }
  }

  titleRequired(e: any) {
    if (e.target.value != '' && e.target.value != null) {
      this.is_title_required = false;
      this.title_required = false;
    } else {
      this.title_required = true;
      this.is_title_required = true;
    }
  }

  ngAfterViewChecked() {
    this.refrashDate = false;
    this.cdRef.detectChanges();
  }

  viewJobDetailsFormSubmit() {
    this.submitted = true;

    if (
      this.viewDetailsForm.value.category_name == 'Miscellaneous' &&
      this.viewDetailsForm.value.title == ''
    ) {
      this.is_title_required = true;
    } else {
      this.is_title_required = false;
      if (
        this.get_event_name == 'Miscellaneous' &&
        this.JobDetails.category_name == 'Miscellaneous' &&
        this.viewDetailsForm.value.title != ''
      ) {
        this.viewDetailsForm.value.title = this.viewDetailsForm.value.title;
      }
      if (this.get_event_name != '' && this.get_event_name != 'Miscellaneous') {
        this.viewDetailsForm.value.title = this.get_event_name;
      }

      if (
        this.viewDetailsForm.valid &&
        this.imageUploadExtentionError == false &&
        this.set_date_not_valid == false &&
        this.exceedLimit == false &&
        this.is_title_required == false &&
        this.title_required == false
      ) {
        this.formdisable = true;
        this.viewDetailsForm.value.job_id = this.job_id;
        this.viewDetailsForm.value.job_category_id =
          this.get_event_id == ''
            ? this.JobDetails.job_category_id.job_category_id
            : this.get_event_id;
        this.viewDetailsForm.value.is_licence_required = this.licence_required;

        var editImageArray =
          this.jobImgs.length != 0 ? this.jobImgs.join(',') : '';
        this.viewDetailsForm.value.editImageArray = editImageArray;

        this.viewDetailsForm.value.images = this.imageUrl;
        var formdata = new FormData();
        formdata.append('title', this.viewDetailsForm.controls.title.value);
        formdata.append('job_id', this.job_id);
        formdata.append('details', this.viewDetailsForm.controls.details.value);
        formdata.append(
          'job_category_id',
          this.get_event_id == ''
            ? this.JobDetails.job_category_id.job_category_id
            : this.get_event_id
        );
        formdata.append(
          'start_datetime',
          JSON.parse(
            JSON.stringify(
              this.datePipe.transform(
                this.viewDetailsForm.controls.start_datetime.value,
                'yyyy-MM-dd, HH:mm:ss'
              )
            )
          )
        );
        formdata.append(
          'end_datetime',
          JSON.parse(
            JSON.stringify(
              this.datePipe.transform(
                this.viewDetailsForm.controls.end_datetime.value,
                'yyyy-MM-dd, HH:mm:ss'
              )
            )
          )
        );
        formdata.append('terms', this.viewDetailsForm.controls.terms.value);
        formdata.append('city', this.viewDetailsForm.controls.city.value);
        formdata.append('state', this.viewDetailsForm.controls.state.value);
        formdata.append('zip', this.viewDetailsForm.controls.zip.value);
        formdata.append(
          'apartment',
          this.viewDetailsForm.controls.apartment.value
        );
        formdata.append('isOldImgDeleted', this.isOldImgDeleted);
        // formdata.append('deletedImgs', this.deletedImgs);
        formdata.append(
          'deletedImgs',
          JSON.stringify(Array.prototype.map.call(this.deletedImgs, (s) => s))
        );
        // formdata.append('images',this.viewDetailsForm.value.images)
        if (this.viewDetailsForm.value.is_licence_required != undefined) {
          formdata.append(
            'is_licence_required',
            this.viewDetailsForm.value.is_licence_required
          );
        }

        let files = this.getFiles();
        if (files) {
          files.forEach((file) => {
            formdata.append('images', file.rawFile, file.name);
          });
        }

        this.JobsmgmtService.editJobDetails(formdata).subscribe(
          (res) => {
            let resData = JSON.parse(JSON.stringify(res));
            if (resData.status == 200) {
              this.router.navigate(['/jobsmgmt/jobDetails', this.job_id]);

              this.toasterService.pop('success', 'Success', resData.message);

              this.action = 'view';
              this.imageUrl = [];
              this.imgPreview = [];
              this.formdisable = false;
              this.submitted = false;
              this.viewJobDetails(this.job_id);
            } else {
              this.formdisable = false;
              this.toasterService.pop('error', 'Error', resData.message);
            }
          },
          (err) => {
            this.toasterService.pop('error', 'Error', 'Somthing went Wrong..!');
          }
        );
      }
    }
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem: any) => {
      return fileItem.file;
    });
  }
}
