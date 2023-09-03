import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment"


@Injectable()

export class AddBrokeragemgmtService {
    public httpOptions: any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        };
    }

    getAllJobType() {
        return this.http.get(`${environment.base_url}getUserPaymentDetails`, {});
    }

    getJobTypeDetails(data: any) {
        return this.http.post(`${environment.base_url}api/view_job`, data, this.httpOptions);
    }

    addBrokerage(data: any) {
        return this.http.post(`${environment.base_url}api/add_brokerage`, data, this.httpOptions);
    }

    editBrokerageTypeDetails(data: any) {
        return this.http.post(`${environment.base_url}api/update_brokerage`, data, this.httpOptions);
    }

    deleteBrokerageTypeDetails(data: any) {
        return this.http.post(`${environment.base_url}api/delete_brokerage`, data, this.httpOptions);
    }

    getBrokerage() {
        return this.http.get(`${environment.base_url}api/get_brokerage`, this.httpOptions);
    }

}