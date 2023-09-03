import { Component, OnInit, ViewChild, Directive, Output, EventEmitter, Input, SimpleChange, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// import { CustomValidation } from '../custom_validation/customValidation';
import { UsersmgmtService } from './usersmgmt.services';
import swal from 'sweetalert2';
// import { DataTableComponent } from '../plugins/datatable/datatable.component';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToasterService } from "angular2-toaster";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

// import * as jquery from 'jquery';


class Users {
  image!: string;
  user_id!: string;
  user_name!: string;
  first_name!: string;
  last_name!: string;
  phone!: string;
  is_agent!: number;
  is_active !: any;
  is_agent_approved : any;
  email!: string;
  profile_picture: any;
  status: any;
  statusModal: any
}

class DataTablesResponse {
  data!: any[];
  draw: any;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  templateUrl: './usersmgmt.component.html',
  styleUrls: ['./usersmgmt.css']
})
export class UsersmgmtComponent implements AfterViewInit, OnInit {
  changePasswordForm!: FormGroup;


  @ViewChild("statusModal")
  public statusModal!: ModalDirective;

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  users!: Users[];

  public AllUsers: any;
  public filterQuery = '';
  public txt!: string;
  public confBtnTxt!: string;
  public confBtnClr!: string;
  public succHeader!: string;
  public succTxt!: string;
  public res: any;
  public defaultImgUrl = environment.default_imgUrl;
  public userimgUrl = environment.user_thumb_imgUrl;
  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;
  public user_name: any;
  public user_type: any = '';
  public httpOptions: any;
  userId: any;
  submitted : boolean = false;



  constructor(
    public userFactory: UsersmgmtService,
    public router: Router,
    private http: HttpClient,
    private toastr: ToasterService,


  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "",
      })
    };
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      'newPassword': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      'cnfPassword': new FormControl('', [Validators.required])
    });

    const that = this;

    if (this.user_type != '') {
      this.user_type;
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.itemPerPage,
      serverSide: true,
      processing: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback: (arg0: { recordsTotal: any; recordsFiltered: any; data: never[]; }) => void) => {
        that.http
          .post<any>(
            `${environment.base_url}/api/get_users`,
            Object.assign(dataTablesParameters, this.user_type),
            this.httpOptions
          ).subscribe(res => {
            // this.toasterService.pop('success', 'Success', 'Users list get successfully.');
            this.AllUsers = JSON.parse(JSON.stringify(res));
            that.users = this.AllUsers.data;

            callback({
              recordsTotal: (this.AllUsers).recordsTotal,
              recordsFiltered: (this.AllUsers).recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'user_id' },
      { data: 'profile_picture', orderable: false },
      { data: 'first_name' },
      { data: 'email' },
      { data: 'phone' },
      // { data: 'about' },
      { data: 'is_agent' },
      // { data: 'licence_number' },
      // { data: 'area_of_service' },
      { data: 'is_active' },
      { data: 'Action', orderable: false }]
    };

  }


  userTypeChange(e: any) {
    if (e.target.value == 0) {
      this.user_type = { 'is_agent': e.target.value }
      this.rerender();
    }
    if (e.target.value == 1) {
      this.user_type = { 'is_agent': e.target.value }
      this.rerender();
    }
  }

  errorHandler(event: any) {
    event.target.src = this.defaultImgUrl;
  }



  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  userActiveOrInactive(user_id: string, status: any): void {
    const that = this;
    var succTitle: string, succMsg: string;
    if (status == '1') {
      this.txt = 'You want to Active this user ?';
      this.confBtnTxt = 'Yes, Active it!';
      this.confBtnClr = '#008000';
      this.succHeader = 'Active';
      succTitle = "Active";
      this.succTxt = 'User has been Active successfully';
      succMsg = 'User has been Active successfully';
    } else {
      this.txt = 'You want to InActive this user ?';
      this.confBtnTxt = 'Yes, InActive it!';
      this.confBtnClr = '#3085d6';
      this.succHeader = 'InActive';
      succTitle = "InActive";
      this.succTxt = 'User has been InActive successfully';
      succMsg = 'User has been InActive successfully';
    }

    swal
      .fire({
        title: "Are you sure ?",
        icon: 'info',
        text: this.txt,
        showCancelButton: true,
        cancelButtonColor: "#FF0000",
        confirmButtonText: this.confBtnTxt,
        cancelButtonText: "Cancel",
        reverseButtons: false,
        confirmButtonColor: this.confBtnClr
      }).then(result => {
        this.sendDatatoApi = { 'user_id': user_id };
        if (result.value) {
          this.userFactory.userStatusChange(this.sendDatatoApi).subscribe(
            res => {
              let resData = JSON.parse(JSON.stringify(res));

              if (resData.status == 200) {
                swal.fire(this.succHeader, this.succTxt, 'success');
                // setTimeout(() => {
                  this.rerender()
                // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                //   dtInstance.destroy();
                //   this.dtTrigger.next();
                // });
                // }, 1200)
              }
            },
            error => {
              swal.fire("Error", "Something wrong.", 'error');
            }
          );
        }
      })
  }

  approveRejectAgent(user_id: string, status: any): void {
    const that = this;
    var succTitle: string, succMsg: string;
    if (status == '1') {
      this.txt = 'You want to Approve this user ?';
      this.confBtnTxt = 'Yes, Approve it!';
      this.confBtnClr = '#008000';
      this.succHeader = 'Approve';
      succTitle = "Approve";
      this.succTxt = 'User has been Approve successfully';
      succMsg = 'User has been Approve successfully';
    } else {
      this.txt = 'You want to Reject this user ?';
      this.confBtnTxt = 'Yes, Reject it!';
      this.confBtnClr = '#3085d6';
      this.succHeader = 'Reject';
      succTitle = "Reject";
      this.succTxt = 'User has been Reject successfully';
      succMsg = 'User has been Reject successfully';
    }

    swal
      .fire({
        title: "Are you sure ?",
        icon: 'info',
        text: this.txt,
        showCancelButton: true,
        cancelButtonColor: "#FF0000",
        confirmButtonText: this.confBtnTxt,
        cancelButtonText: "Cancel",
        reverseButtons: false,
        confirmButtonColor: this.confBtnClr
      }).then(result => {
        this.sendDatatoApi = { 'user_id': user_id , 'status' : status };
        if (result.value) {
          this.userFactory.approveRejectAgent(this.sendDatatoApi).subscribe(
            res => {
              let resData = JSON.parse(JSON.stringify(res));

              if (resData.status == 200) {
                swal.fire(this.succHeader, this.succTxt, 'success');
                // setTimeout(() => {
                  this.rerender()
                // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                //   dtInstance.destroy();
                //   this.dtTrigger.next();
                // });
                // }, 1200)
              }
            },
            error => {
              swal.fire("Error", "Something wrong.", 'error');
            }
          );
        }
      })
  }

  deleteUser(userId: any) {
    const that = this;
    if (userId) {
      this.txt = 'You want to delete this User ?';
      this.confBtnTxt = 'Yes, Delete it!';
      this.confBtnClr = '#d33';
      this.succHeader = 'Deleted';
      this.succTxt = 'User has been deleted successfully';
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
        this.sendDatatoApi = { 'user_id': userId };
        if (result.value) {
          this.userFactory.deleteUser(this.sendDatatoApi).subscribe(
            res => {
              let resData = JSON.parse(JSON.stringify(res));
              if (resData.status == 200) {
                swal.fire(this.succHeader, this.succTxt, 'success');
                this.rerender()
                // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                //   dtInstance.destroy();
                //   this.dtTrigger.next();
                // });
              }
            },
            error => {
              swal.fire("Error", "This user is associated with existing events.", 'error');
            }
          );
        }
      })
  }
  changeUserPassword() {
    this.submitted = true;
    var formData = {
      user_id : this.userId,
      password : this.changePasswordForm.value.cnfPassword
    };
    this.userFactory.changeUserPassword(formData).subscribe(
      (response) => {
        let resData = JSON.parse(JSON.stringify(response));
        if (resData.status == 200) {
          this.rerender();
          this.statusModal.hide();
          this.toastr.pop('success', "User password has been changed successfully!", resData.message)


        } else {
          this.toastr.pop('error', "Error", resData.message)
        }
      },
      (error) => {
        this.toastr.pop("error", "Something wen't wrong!");
      }
    );
  }

  onStatusChange(id: any) {


    this.userId = id;
    this.statusModal.show();
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
