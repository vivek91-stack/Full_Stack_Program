import { Component, OnInit, ViewChild, Directive, Output, EventEmitter, Input, SimpleChange, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidation } from '../custom_validation/customValidation';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ImpressionmgmtService } from './impressionmgmt.services';
import { Subject } from 'rxjs';

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  templateUrl: './impressoinmgmt-details.component.html',
  styleUrls: ['./impressionmgmt.css']
})
export class ImpressionmgmtDetailsComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  users: any = [];
  public AllUsers: any;
  public filterQuery = '';
  public res: any;
  public defaultImgUrl = environment.default_imgUrl;
  public userimgUrl = environment.user_thumb_imgUrl;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;
  public httpOptions:any;
  bannerid: any;

  constructor(
    public userFactory: ImpressionmgmtService,
    public router: Router,
    private http: HttpClient,
    public route: ActivatedRoute
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "",
      })
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.bannerid = param.id;
    })
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.itemPerPage,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http.post<any>(`${environment.base_url}get_click_user_data`, Object.assign(dataTablesParameters, { 'bannerId': this.bannerid }), this.httpOptions).subscribe(res => {
          // this.toasterService.pop('success', 'Success', 'Users list get successfully.');     
          this.AllUsers = JSON.parse(JSON.stringify(res));
          that.users = this.AllUsers.data;
          callback({
            recordsTotal: (this.AllUsers).recordsTotal,
            recordsFiltered: (this.AllUsers).recordsFiltered,
            data: []
          });
        });
      },
      columns: [{ data: 'userid' }, { data: 'first_name' }, { data: 'phone' }, { data: 'email' }, { data: 'created_at' }]
    };
  }

  errorHandler(event: any) {
    event.target.src = this.defaultImgUrl;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
