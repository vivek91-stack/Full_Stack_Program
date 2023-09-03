import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { Http } from '@angular/http';
import { PaymgmtService } from './paymentmgmt.services';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs/Subject';

class Tranjactions {
  transaction_id!: string;
  user_name!: string;
  amount!: string;
  type!: string;
  stripe_fee!: string;
  error_msg!: string;
  payment_status: any;
  created_at: any;
  paid_user_name: any;
  // cancelby: string;
}

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({

  templateUrl: 'paymentmgmt.component.html',
  styleUrls: ['./paymentmgmt.css']
})
export class PaymgmtComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public httpOptions: any;
  tranjactions!: Tranjactions[];

  public Alltranjections: any;
  public filterQuery = '';
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;
  public res: any;

  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;
  public jobImg: any;
  public fee_type!: { type: any; };
  public trans_dates: string[] = [];

  constructor(
    public PaymgmtService: PaymgmtService,
    public router: Router,
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
        // 'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')).auth_token : "your OAuth access token",
      })
    };
  }

  ngOnInit(): void {
    this.fee_type = { 'type': '' }
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
            `${environment.base_url}api/get_payment_tranjactions`,
            Object.assign(dataTablesParameters, this.fee_type),
            this.httpOptions
          ).subscribe(res => {
            // this.toasterService.pop('success', 'Success', 'Users list get successfully.');     
            this.Alltranjections = JSON.parse(JSON.stringify(res));
            for (let item of this.Alltranjections.data) {
              let createdDates = new Date(item.created_at);
              var formatedDate = createdDates.getFullYear() + '-' + (createdDates.getMonth() + 1) + '-' + createdDates.getDate();
              this.trans_dates.push(formatedDate);
            }

            that.tranjactions = this.Alltranjections.data;
            callback({
              recordsTotal: (this.Alltranjections).recordsTotal,
              recordsFiltered: (this.Alltranjections).recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'transaction_id' },
      { data: 'user_name' },
      { data: 'amount' },
      { data: 'stripe_fee' },
      { data: 'error_msg' },
      { data: 'paymemt_status' , orderable : false },
      { data: 'created_at' }
      ]
    };
  }

  creditTypeChange(e: any) {
    if ((e.target.value == 2) || (e.target.value == 3)) {
      this.fee_type = { 'type': e.target.value };
      this.rerender();
    } else {
      this.fee_type = { 'type': e.target.value };
      this.rerender();
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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





