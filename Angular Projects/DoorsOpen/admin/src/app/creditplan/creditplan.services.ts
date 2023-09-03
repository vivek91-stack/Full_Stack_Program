import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()

export class CreditPlanService {
    public httpOptions: any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        };
    }

    getAllCreditPlan() {
        return this.http.get(`${environment.base_url}api/getUserPaymentDetails`, {});
    }

    addCreditPlan(data: any) {
        return this.http.post(`${environment.base_url}api/add_credit_plan`, data, this.httpOptions);
    }

    getCreditPlansDetails(data: any) {
        return this.http.post(`${environment.base_url}api/get_credit_plan_by_id`, data, this.httpOptions);
    }

    creditPlanStatusChange(data: any) {
        return this.http.post(`${environment.base_url}api/active_inactive_credit_plan`, data, this.httpOptions);
    }

    updateCreditPlans(data: any) {
        return this.http.post(`${environment.base_url}api/edit_credit_plan`, data, this.httpOptions);
    }

    deleteCreditPlan(data: any) {
        return this.http.post(`${environment.base_url}api/delete_credit_plan`, data, this.httpOptions);
    }

}