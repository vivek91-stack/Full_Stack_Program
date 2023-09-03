import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreditmgmtService } from './creditmgmt.services';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';


class Credits {
  user_id: any;
  id!: string;
  user_name!: string;
  free_credit!: string;
  premium_credit!: string;
}

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({

  templateUrl: 'creditmgmt.component.html',
  styleUrls: ['./creditmgmt.css']
})
export class CreditmgmtComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  credits: any;// Credits[];
  public httpOptions: any;
  public Allcredits: any;
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;
  public res: any;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;
  public user_type: any = '';

  constructor(
    public CreditmgmtService: CreditmgmtService,
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
            `${environment.base_url}api/get_users`,
            dataTablesParameters,
            this.httpOptions
          ).subscribe(res => {
            this.Allcredits = res;
            that.credits = this.Allcredits.data;
            callback({
              recordsTotal: (this.Allcredits).recordsTotal,
              recordsFiltered: (this.Allcredits).recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'user_id' },
      { data: 'first_name' },
      { data: 'free_credit' },
      { data: 'premium_credit' },
      { data: 'Total_credit' },
      { data: 'Action', orderable: false }]
    };
  }

  // userTypeChange(e) {
  //   if (e.target.value == 0) {
  //     this.user_type = { 'is_agent': e.target.value }
  //     this.rerender();
  //   }
  //   if (e.target.value == 1) {
  //     this.user_type = { 'is_agent': e.target.value }
  //     this.rerender();
  //   }
  // }

  userActiveOrInactive(uId: any, status: any) {

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
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





