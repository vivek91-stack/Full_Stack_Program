import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';


@Injectable()

export class PaymgmtService {
    public httpOptions:any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        };
     }

    getAllPayment() {
        return this.http.get(`${environment.base_url}api/getUserPaymentDetails`,{});
    }

    getJobDetails(data : any) {
        return this.http.post(`${environment.base_url}view_job`,data, this.httpOptions);
    }
    
}