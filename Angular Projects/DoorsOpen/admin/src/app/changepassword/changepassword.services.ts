import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

 
@Injectable()

export class ChangePasswordService {
    public httpOptions:any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
          }; 
    }

    changePassword(data:any) {
        return this.http.post(`${environment.base_url}api/change_password`, data, this.httpOptions);
    }
}