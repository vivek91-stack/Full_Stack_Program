import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AddBrokeragemgmtService } from './addbrokeragemgmt.services';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"
import { Subject } from 'rxjs';

class Tranjactions {
  type_id!: string;
  name!: string;
  // cancelby: string;
}

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({

  templateUrl: 'addbrokeragemgmt.component.html',
  styleUrls: ['./addbrokerage.css']
})
export class AddNewBrokerageTypemgmtComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public httpOptions: any;
  brokerages!: Tranjactions[];

  public Allbrokerage: any;
  public filterQuery = '';
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;
  public res: any;

  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;

  constructor(
    public AddBrokeragemgmtService: AddBrokeragemgmtService,
    public router: Router,
    private http: HttpClient,
   private toasterService: ToasterService,
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
            `${environment.base_url}api/get_brokerage_list`,
            dataTablesParameters,
            this.httpOptions
          ).subscribe(res => {
            this.Allbrokerage = JSON.parse(JSON.stringify(res));
            that.brokerages = this.Allbrokerage.data;

            callback({
              recordsTotal: (this.Allbrokerage).recordsTotal,
              recordsFiltered: (this.Allbrokerage).recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'type_id' , orderable : true },
      { data: 'name' , orderable : true},
      {data : 'action' , orderable:false}
      ]
    };
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  deleteBrokerage(e: any) {
    if (e != '' && e != null) {
      this.txt = 'You want to Delete this brokerage ?';
      this.confBtnTxt = 'Yes, Delete it!';
      this.confBtnClr = '#d33';
      this.succHeader = 'Deleted';
      this.succTxt = 'Brokerage type has been Deleted successfully';
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
        if (result.value) {
          let brkrId = { 'type_id': e }
          this.AddBrokeragemgmtService.deleteBrokerageTypeDetails(brkrId).subscribe(
            res => {
              let resData = JSON.parse(JSON.stringify(res));
              if (resData.status == 200) {
                swal.fire(this.succHeader, this.succTxt, resData.message);
                this.router.navigate(['/addbrokeragemgmt'])
                this.rerender();
              }else{
              this.toasterService.pop('error',"Error" , resData.message )

              }
            },
            err => {
              this.toasterService.pop('error', err['error']['message'])
            }
          )
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





