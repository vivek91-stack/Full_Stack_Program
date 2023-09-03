import { Component, OnInit, ViewChild, Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { CustomValidation } from '../custom_validation/customValidation';
import { ItemtagsService } from './tagitems.services';
import swal from 'sweetalert2';
import { DataTableComponent } from '../plugins/datatable/datatable.component';
import { DataTableModule } from 'angular2-datatable';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';

class Tags {
      tag_name: string;
      count: string;
}

class DataTablesResponse {
  data: any[];
  draw: any;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  templateUrl: 'tagitems.component.html',
  styleUrls: ['./tagitem.css']
})
export class ItemTagsComponent implements OnInit {
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  users: Tags[];

  public AllUsers: any;
  public filterQuery = '';
  public txt: string;
  public confBtnTxt: string;
  public confBtnClr: string;
  public succHeader: string;
  public succTxt: string;
  public res: any;

  public sendDatatoApi: any;
  public itemPerPage = environment.item_per_page;

  constructor(public userFactory: ItemtagsService,
              public router: Router,
              private http: HttpClient
           ) {
            }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.itemPerPage,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            `${environment.base_url}getTagsProductCount`,
            dataTablesParameters
          ).subscribe(res => {
            // this.toasterService.pop('success', 'Success', 'Users list get successfully.');       
            this.AllUsers = JSON.parse(JSON.stringify(res));
            that.users = this.AllUsers.data;
            callback({
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'tag_name' }, 
                { data: 'count' },  
                { data: 'Action' , orderable : false}]
    };
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
