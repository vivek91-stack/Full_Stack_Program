import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreditPlanService } from './creditplan.services';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs';


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
  // cancelby: string;
  image: any;
  status: any;
}

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({

  templateUrl: 'creditplan.component.html',
  styleUrls: ['./creditplan.css']
})
export class CreditPlanComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  plans: any; //Jobs[];

  public AllCreditsPlans: any;
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
  public httpOptions: any;


  constructor(
    public CreditPlanService: CreditPlanService,
    public router: Router,
    private http: HttpClient,
    public toasterService: ToasterService
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
            `${environment.base_url}api/get_credit_plan_list`,
            dataTablesParameters, this.httpOptions
          ).subscribe(res => {
            this.AllCreditsPlans = JSON.parse(JSON.stringify(res));
            that.plans = this.AllCreditsPlans.data;

            callback({
              recordsTotal: (this.AllCreditsPlans).recordsTotal,
              recordsFiltered: (this.AllCreditsPlans).recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'credit_id' },
      { data: 'credit_amount' },
      { data: 'credits' },
      { data: 'status', orderable: false },
      { data: 'Action', orderable: false }]
    };
  }

  activeInactiveCreditPlan(creditPlan_id: string, status: any): void {
    const that = this;
    if (status == '1') {
      this.txt = 'You want to Active this credit plan ?';
      this.confBtnTxt = 'Yes, Active it!';
      this.confBtnClr = '#008000';
      this.succHeader = 'Active';
      this.succTxt = 'Credit plan has been Active successfully';
    } else {
      this.txt = 'You want to InActive this credit plan ?';
      this.confBtnTxt = 'Yes, InActive it!';
      this.confBtnClr = '#3085d6';
      this.succHeader = 'InActive';
      this.succTxt = 'Credit plan has been InActive successfully';
    }

    swal
      .fire({
        title: "Are you sure ?",
        icon: 'warning',
        text: this.txt,
        showCancelButton: true,
        cancelButtonColor: "#FF0000",
        confirmButtonText: this.confBtnTxt,
        confirmButtonColor: this.confBtnClr,
        cancelButtonText: "Cancel",
        reverseButtons: false,

      }).then((result) => {
        this.sendDatatoApi = { 'credit_id': creditPlan_id, 'status': status };
        if (result.value) {
          this.CreditPlanService.creditPlanStatusChange(this.sendDatatoApi).subscribe(
            res => {
              swal.fire(this.succHeader, this.succTxt, 'success');
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            },
            error => {
              swal.fire("Error", "Something wrong.", 'error');

              // this.toasterService.pop('error', 'Error', 'Something went wrong')
            }
          );
        }
      })
  }

  deleteCreditPlan(creditPlan_id: any): void {
    const that = this;
    if (creditPlan_id != '') {
      this.txt = 'You want to delete this credit plan ?';
      this.confBtnTxt = 'Yes, Delete it!';
      this.confBtnClr = '#d33';
      this.succHeader = 'Deleted';
      this.succTxt = 'Credit plan has been deleted successfully';
    }

    swal
      .fire({
        title: "Are you sure ?",
        text: this.txt,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: this.confBtnClr,
        cancelButtonColor: '#3085d6',
        confirmButtonText: this.confBtnTxt
      }).then((result) => {
        this.sendDatatoApi = { 'credit_id': creditPlan_id };
        if (result.value) {
          this.CreditPlanService.deleteCreditPlan(this.sendDatatoApi).subscribe(
            res => {
              swal.fire(this.succHeader, this.succTxt, 'success');
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            },
            error => {
              swal.fire("Error", "Something wrong.", 'error');
              // this.toasterService.pop('error', 'Error', 'Something went wrong')
            }
          );
        }
      })
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

}





