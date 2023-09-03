import { Component, OnInit, ViewChild, Directive, Output, EventEmitter, Input, SimpleChange, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomValidation } from '../custom_validation/customValidation';
import { JobsmgmtService } from './jobsmgmt.services';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
// import * as jquery from 'jquery';


class Jobs {
  job_id!: string;
  title!: string;
  user_name!: string;
  apartment!: string;
  street_address!: string;
  city!: string;
  state!: string;
  zip!: string;
  details!: string;
  payout_amount!: string;
  terms!: string;
  cancelby!: string;
  image: any;
  status: any;
  is_checkedin!: number;
  user_id!: any;
}

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  templateUrl: './jobsmgmt.component.html',
  styleUrls: ['./jobsmgmt.css']
})
export class JobsmgmtComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  jobs!: Jobs[];

  public AllJobs: any;
  public filterQuery = '';
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;
  public res: any;
  public defaultImgUrl = environment.default_imgUrl;
  public jobimgUrl = environment.job_imgUrl;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;
  public jobImg: any;
  public httpOptions:any;
  // public item_img = [];

  constructor(
    public JobsmgmtService: JobsmgmtService,
    public router: Router,
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
      })
    };
  }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.itemPerPage,
      serverSide: true,
      processing: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            `${environment.base_url}/api/get_jobs`,
            dataTablesParameters, this.httpOptions
          ).subscribe(res => {
            this.AllJobs = JSON.parse(JSON.stringify(res));
            that.jobs = this.AllJobs.data;

            callback({
              recordsTotal: (this.AllJobs).recordsTotal,
              recordsFiltered: (this.AllJobs).recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'job_id' },
      { data: 'title' },
      { data: 'user_name' },
      // { data: 'apartment' },
      // { data: 'street_address' },
      { data: 'city' },
      { data: 'state' },
      { data: 'zip' },
      // { data: 'details' },
      { data: 'payout_amount' },
      // { data: 'terms' },
      // { data: 'cancelby' },
      // { data: 'image', orderable : false },
      { data: 'status' },
      { data: 'Action', orderable: false }]
    };
  }

  errorHandler(event: any) {
    event.target.src = this.defaultImgUrl;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  jobDelete(jobid: string): void {
    const that = this;


    if (jobid) {
      this.txt = 'You want to Delete this job ?';
      this.confBtnTxt = 'Yes, Delete it!';
      this.confBtnClr = '#d33';
      this.succHeader = 'Delete';
      this.succTxt = 'Job has been Delete successfully';
    }
    swal
      .fire({
        title: "Are you sure ?",
        text: this.txt,
        showCancelButton: true,
        confirmButtonColor: this.confBtnClr,
        cancelButtonColor: '#3085d6',
        confirmButtonText: this.confBtnTxt
      }).then((result) => {
        this.sendDatatoApi = { 'job_id': jobid };
        if (result.value) {
          this.JobsmgmtService.job_delete(this.sendDatatoApi).subscribe(
            res => {
              swal.fire(this.succHeader, this.succTxt, 'success');
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            },
            error => {
              console.log('error', error);
            }
          );
        }
      })
  }

  jobCheckout(jobid: string): void {
    const that = this;


    if (jobid) {
      this.txt = 'You want to Checkout this job ?';
      this.confBtnTxt = 'Yes, Checkout!';
      this.confBtnClr = '#d33';
      this.succHeader = 'Checkout';
      this.succTxt = 'Job has been Checkout successfully';
    }
    swal
      .fire({
        title: "Are you sure ?",
        text: this.txt,
        showCancelButton: true,
        confirmButtonColor: this.confBtnClr,
        cancelButtonColor: '#3085d6',
        confirmButtonText: this.confBtnTxt
      }).then((result) => {
        this.sendDatatoApi = { 'job_id': jobid };
        if (result.value) {
          this.JobsmgmtService.jobCheckout(this.sendDatatoApi).subscribe(
            res => {
              swal.fire(this.succHeader, this.succTxt, 'success');
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            },
            error => {
              console.log('error', error);
            }
          );
        }
      })
  }

  jobCheckin(jobid: string, userid: any): void {
    const that = this;


    if (jobid) {
      this.txt = 'You want to CheckIn this job ?';
      this.confBtnTxt = 'Yes, CheckIn!';
      this.confBtnClr = '#d33';
      this.succHeader = 'CheckIn';
      this.succTxt = 'Job has been CheckIn successfully';
    }
    swal
      .fire({
        title: "Are you sure ?",
        text: this.txt,
        showCancelButton: true,
        confirmButtonColor: this.confBtnClr,
        cancelButtonColor: '#3085d6',
        confirmButtonText: this.confBtnTxt
      }).then((result) => {
        this.sendDatatoApi = { 'job_id': jobid, 'user_id': userid  };
        if (result.value) {
          this.JobsmgmtService.jobCheckin(this.sendDatatoApi).subscribe(
            res => {
              swal.fire(this.succHeader, this.succTxt, 'success');
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            },
            error => {
              console.log('error', error);
            }
          );
        }
      })
  }

}
