import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { VendorManagementService } from './vendor-management.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.css']
})
export class VendorManagementComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public res: any;
  public defaultImgUrl = environment.default_imgUrl;
  public userimgUrl = environment.user_thumb_imgUrl;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;

  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;

  public httpOptions: any;
  vendors: any;

  constructor(
    public vendorFactory: VendorManagementService,
    public router: Router,
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "",
      })
    };
  }

  ngOnInit(): void {
    this.vendors = []
    this.getVendorList();
  }

  getVendorList() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.itemPerPage,
      serverSide: true,
      processing: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {

        this.vendorFactory.getAllVandors(dataTablesParameters).
          subscribe(res => {

            var resData = JSON.parse(JSON.stringify(res));
            this.vendors = resData.data
            // console.log("res -- > ", (this.AllUsers).data.recordsFiltered);

            callback({
              recordsTotal: (resData).recordsTotal,
              recordsFiltered: (resData).recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'vendor_id' },
      { data: 'image', orderable: false },
      { data: 'name' },
      { data: 'phone', orderable: false },
      { data: 'address' },
      { data: 'Action', orderable: false }]
    };
  }

  deleteVendor(vId: string): void {
    const that = this;


    if (vId) {
      this.txt = 'You want to Delete this vendor ?';
      this.confBtnTxt = 'Yes, Delete it!';
      this.confBtnClr = '#d33';
      this.succHeader = 'Delete';
      this.succTxt = 'Vendor has been Delete successfully';
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
        this.sendDatatoApi = { 'vendor_id': vId };
        console.log(this.sendDatatoApi);

        if (result.value) {
          this.vendorFactory.deleteVendor(this.sendDatatoApi).subscribe(
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
