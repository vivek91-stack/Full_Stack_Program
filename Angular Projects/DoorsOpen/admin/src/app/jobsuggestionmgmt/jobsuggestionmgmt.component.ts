import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Data } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { AddJobTypemgmtService } from './jobsuggestionmgmt.services';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment"


class JobsType {
  content: any;
  event_color: any;
  id!: string;
  category_name!: string;
  category_status!: string;
  licensed_realtors!: string;
  status: any;
}

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({

  templateUrl: 'jobsuggestionmgmt.component.html',
  styleUrls: ['./jobsuggestion.css']
})
export class JobSuggestionmgmtComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  jobsType!: JobsType[];
  public httpOptions: any;
  public AllJobsType: any;
  public filterQuery = '';
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;
  public res: any;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;
  public user_type: any;


  constructor(
    public AddJobTypemgmtService: AddJobTypemgmtService,
    public router: Router,
    private http: HttpClient,
    public toasterService: ToasterService,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
      })
    };
    this.toasterService = toasterService
  }

  ngOnInit(): void {
    this.user_type = { 'type': 'notes' }
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
            `${environment.base_url}api/getJobSuggestions`,
            Object.assign(dataTablesParameters, this.user_type)
            , this.httpOptions
          ).subscribe(res => {
            this.AllJobsType = JSON.parse(JSON.stringify(res));
            that.jobsType = this.AllJobsType.data.data;
            callback({
              recordsTotal: this.AllJobsType.data.recordsTotal,
              recordsFiltered: this.AllJobsType.data.recordsTotal,
              data: []
            });
          });
      },
      columns: [
        { data: 'content', searchable: true, orderable: true },
      // { data: 'category_name', searchable: true, orderable: true },
      // { data: 'event_color', searchable: true, orderable: true },
      { data: 'Action', orderable: false }
    ]
    };
  }

  userTypeChange(e: any) {
    if (e.target.value == 'notes') {
      this.user_type = { 'type': e.target.value }
      this.rerender();
    }
    if (e.target.value == 'terms') {
      this.user_type = { 'type': e.target.value }
      this.rerender();
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  deleteJobCategory(jobCatId: any) {
    if (jobCatId != '') {
      if (jobCatId != '' && jobCatId != null) {
        this.txt = 'You want to Delete this job suggestion ?';
        this.confBtnTxt = 'Yes, Delete it!';
        this.confBtnClr = '#d33';
        this.succHeader = 'Deleted';
        this.succTxt = 'Job suggestion has been Deleted successfully';
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
            let jobCat = { 'id': jobCatId }
            this.AddJobTypemgmtService.deleteJobSuggestion(jobCat).subscribe(
              res => {
                let resData = JSON.parse(JSON.stringify(res));
                if (resData.status == 200) {
                  swal.fire(this.succHeader, this.succTxt, 'success');
                  this.rerender();
                }else {
                  this.toasterService.pop('error', resData.message)

                }
              },
              err => {
                this.toasterService.pop('error', err['error']['message'])
              }
            )
          }
        })
    }
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

}





