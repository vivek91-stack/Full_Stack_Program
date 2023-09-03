import { Component, OnInit, ViewChild, Directive, Output, EventEmitter, Input, SimpleChange, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
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
  templateUrl: './impressionmgmt.component.html',
  styleUrls: ['./impressionmgmt.css']
})
export class ImpressionmgmtComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  banners: any = [];
  public AllData: any;
  public filterQuery = '';
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;
  public res: any;
  public defaultImgUrl = environment.default_imgUrl;
  public bannerimgUrl = environment.banner_imgUrl;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;
  public user_name: any;
  public httpOptions: any;

  constructor(
    public impUpFactory: ImpressionmgmtService,
    public router: Router,
    private http: HttpClient,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "",
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
        that.http.post<any>(`${environment.base_url}api/get_impression_data`, Object.assign(dataTablesParameters), this.httpOptions).subscribe(res => {
          // this.toasterService.pop('success', 'Success', 'Users list get successfully.');     
          this.AllData = JSON.parse(JSON.stringify(res));
          that.banners = this.AllData.data;
          callback({
            recordsTotal: (this.AllData).recordsTotal,
            recordsFiltered: (this.AllData).recordsTotal,
            data: []
          });
        });
      },
      columns: [{ data: 'id' }, { data: 'banner_image', orderable: false }, { data: 'url' }, { data: 'created_at' }, { data: 'updated_date' }, { data: 'impression_count', orderable: false }, { data: 'click_count', orderable: false }, { data: 'action', orderable: false }]
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

  viewUserList(item: any) {
    this.router.navigate(['/impression/view-userlist/', item.id])
  }

  editAd(item: any) {
    this.router.navigate(['/impression/edit-impression/', item.id])
  }

  activeAd(item: any) {
    swal
      .fire({
        title: "Are you sure ?",
        text: 'You want to Active this Advertisement ?',
        icon: 'warning',
        reverseButtons: false,
        cancelButtonText: "Cancel",
        showCancelButton: true,
        confirmButtonColor: '#008000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Active it!'
      }).
   /*  swal({
      title: 'Are you sure?',
      text: 'You want to Active this Advertisement ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Active it!'
    }) */then((result) => {
      this.sendDatatoApi = { 'bannerid': item.id };
      if (result.value) {
        this.impUpFactory.userAdStatus(this.sendDatatoApi).subscribe(
          res => {
            let resData = JSON.parse(JSON.stringify(res));
            if (resData.status == 200) {
              swal.fire(this.succHeader, this.succTxt, 'success');
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            }
          },
          error => {
            swal.fire("Error", "Something wrong.", 'error');
          }
        );
      }
    })
  }

}
