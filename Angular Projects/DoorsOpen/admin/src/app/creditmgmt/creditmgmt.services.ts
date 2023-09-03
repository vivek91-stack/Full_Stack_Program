import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Injectable()

export class CreditmgmtService {
    public httpOptions: any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        };
    }

    getAllPayment() {
        return this.http.get(`${environment.base_url}getUserPaymentDetails`, {});
    }

    getJobDetails(data: any) {
        return this.http.post(`${environment.base_url}api/view_job`, data, this.httpOptions);
    }

    getAgentsNonAgents(data: any) {
        return this.http.post(`${environment.base_url}api/get_users_list`, data, this.httpOptions);
    }

    creditSettings(data: any) {
        return this.http.post(`${environment.base_url}credit_setting`, data, this.httpOptions);
    }

    getCreditsData() {
        return this.http.get(`${environment.base_url}get_credit_settings`, this.httpOptions);
    }
}