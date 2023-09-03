import { Component, OnInit, ViewChild, Directive, Output, EventEmitter, Input, SimpleChange, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidation } from '../custom_validation/customValidation';
import { JobsmgmtService } from './jobsmgmt.services';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as jquery from 'jquery';


class Tranjactions {
  [x: string]: any;
  transaction_id!: string;
  type!: string;
  user_name!: string;
  paymemt_status!: string;
  transaction_type!: string;
  error_msg!: string;
}

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  templateUrl: './job-tranjactions.component.html',
  styleUrls: ['./jobsmgmt.css']
})
export class JobTranjactionComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tranjactions!: Tranjactions[];

  public AllTranjactions: any;
  public job_id: any;
  public filterQuery = '';
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;
  public res: any;
  public itemPerPage = environment.item_per_page;
  public httpOptions: any;
  public job_title: any;
  public userName: any;
  public getJobDetails: any;
  public get_title: any;
  // public item_img = [];


  constructor(
    public JobsmgmtService: JobsmgmtService,
    public router: Router,
    public route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
      })
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.job_id = { 'job_id': params.job_id };
    });

    const that = this;
    this.dtOptions = {
      // info: false,
      paging: false,
      // pagingType: 'full_numbers',
      // pageLength: this.itemPerPage,
      serverSide: true,
      processing: false,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            `${environment.base_url}api/get_job_tranjactions`,
            Object.assign(dataTablesParameters, this.job_id),
            this.httpOptions
          ).subscribe(res => {
            let res_ = JSON.parse(JSON.stringify(res));

            if (res_.recordsTotal != 0) {
              this.AllTranjactions = JSON.parse(JSON.stringify(res));
              that.tranjactions = this.AllTranjactions.data;

              this.job_title = (that.tranjactions[0].title) ? that.tranjactions[0].title : '';
              this.userName = that.tranjactions[0].user_name;
            } else {
              this.AllTranjactions = JSON.parse(JSON.stringify(res));
              that.tranjactions = this.AllTranjactions.data;

              this.JobsmgmtService.getJobDetails(this.job_id).subscribe(
                response => {
                  let resData = JSON.parse(JSON.stringify(response));
                  if (resData.status == 200) {
                    this.getJobDetails = JSON.parse(JSON.stringify(response));
                    this.get_title = this.getJobDetails.data.title;
                    this.userName = this.getJobDetails.data.user_name
                  }
                }
              )
            }
            callback({
              recordsTotal: (this.AllTranjactions).recordsTotal,
              recordsFiltered: (this.AllTranjactions).recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'transaction_id' },
      { data: 'stripe_fee' },
      { data: 'amount' },
      { data: 'transaction_type' },
      { data: 'error_msg' },
      { data: 'paymemt_status' }]
      // { data: 'Action' , orderable : false}]
    };
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

  //   jobDelete(jobid: string): void {
  //     const that = this;
  //     if (jobid) {
  //       this.txt = 'You want to Delete this job ?';
  //       this.confBtnTxt = 'Yes, Delete it!';
  //       this.confBtnClr = '#d33';
  //       this.succHeader = 'Delete';
  //       this.succTxt = 'Job has been Delete successfully';
  //     } 
  //     swal({
  //       title: 'Are you sure?',
  //       text: this.txt,
  //       type: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: this.confBtnClr,
  //       cancelButtonColor: '#3085d6',
  //       confirmButtonText: this.confBtnTxt
  //     }).then((result) => {
  //       this.sendDatatoApi = { 'job_id': jobid };
  //       if (result.value) {
  //         this.JobsmgmtService.job_delete(this.sendDatatoApi).subscribe(
  //           res => {
  //             swal(this.succHeader, this.succTxt, 'success');
  //             this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //               dtInstance.destroy();
  //               this.dtTrigger.next();
  //             });
  //           },
  //           error => {
  //             console.log('error', error);
  //           }
  //         );
  //       }
  //     })
  //   }

}
