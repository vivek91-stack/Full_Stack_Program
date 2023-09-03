import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';
import { TeamManagementService } from './team-management.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tem-management',
  templateUrl: './tem-management.component.html',
  styleUrls: ['./tem-management.component.css']
})
export class TemManagementComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  teams: any;
  userimgUrl: any;

  public res: any;
  public defaultImgUrl = environment.default_imgUrl;
  // public userimgUrl = environment.user_thumb_imgUrl;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;

  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;

  public httpOptions: any;

  constructor(
    public teamFactory: TeamManagementService,
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
    this.teams = [];
    this.getTeamList()
  }

  getTeamList() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.itemPerPage,
      serverSide: true,
      processing: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {

        this.teamFactory.getAllTeam(dataTablesParameters).
          subscribe(res => {

            var resData = JSON.parse(JSON.stringify(res));
            this.teams = resData.data

            callback({
              recordsTotal: (resData).recordsTotal,
              recordsFiltered: (resData).recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'team_id' },
      { data: 'image', orderable: false },
      { data: 'team_name' },
      { data: 'creator_name', orderable: false },
      { data: 'total_members' },
      { data: 'Action', orderable: false }
      ]
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
