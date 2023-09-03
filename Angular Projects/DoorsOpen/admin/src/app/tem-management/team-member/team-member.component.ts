import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TeamManagementService } from '../team-management.service';
import { environment } from './../../../environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  httpOptions: any;
  users: any;
  team_id: any;

  
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;

  public res: any;
  public defaultImgUrl = environment.default_imgUrl;
  // public userimgUrl = environment.user_thumb_imgUrl;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;

  constructor(
    public teamFactory: TeamManagementService,
    public router: Router,
    public route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "",
      })
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.team_id = params.team_id;
    });
    this.getMembers()
  }

  deleteMember(id : any): void {
    const that = this;
    if (id) {
      this.txt = 'You want to Remove memeber form team ?';
      this.confBtnTxt = 'Yes, Remove it!';
      this.confBtnClr = '#d33';
      this.succHeader = 'Delete';
      this.succTxt = 'Member has been Removed successfully';
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
        this.sendDatatoApi = { 'user_id': id  , 'team_id':this.team_id};
        console.log( this.sendDatatoApi);
        
        if (result.value) {
          this.teamFactory.removeTeamMember(this.sendDatatoApi).subscribe(
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

  getMembers() {
    console.log("get team list ", this.team_id);
    console.log(this.dtOptions);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.itemPerPage,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        console.log(this.dtOptions);
        dataTablesParameters.team_id = Number(this.team_id)

        console.log("dt ", dataTablesParameters);
        this.teamFactory.getTeamMember(dataTablesParameters).
          subscribe(res => {
            console.log("res ... ", res);

            var resData = JSON.parse(JSON.stringify(res));
            this.users = resData.data.data
            console.log("this.users ", this.users);
            console.log("total : ", resData);
            console.log("total : ", resData.recordsTotal);


            callback({
              recordsTotal: (resData.data).recordsTotal,
              recordsFiltered: (resData.data).recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'user_id' },
      { data: 'image', orderable: false },
      { data: 'email' },
      { data: 'first_name' },
      { data: 'last_name' },
      // { data: 'address' },
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
