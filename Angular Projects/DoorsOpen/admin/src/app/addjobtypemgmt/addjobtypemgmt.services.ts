import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment"


@Injectable()

export class AddJobTypemgmtService {
    public httpOptions :any;
    constructor(public http: HttpClient) { 
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        }; 
    }

    getJobTypeDetails(data:any) {
        return this.http.post(`${environment.base_url}api/get_job_category_by_id`,data, this.httpOptions);
    }

    addJobTypeDetails(data : any) {
        return this.http.post(`${environment.base_url}api/add_job_category`,data, this.httpOptions);
    }

    editJobTypeDetails(data:any) {
        return this.http.post(`${environment.base_url}api/update_job_category`,data, this.httpOptions);
    }

    deleteJobTypeDetails(data:any) {
        return this.http.post(`${environment.base_url}api/delete_job_category`,data, this.httpOptions);
    }
    
}