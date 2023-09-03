import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class JobsmgmtService {
    public httpOptions: any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != null) ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        };
    }

    getJobDetails(data: any) {
        return this.http.post(`${environment.base_url}api/view_job`, data, this.httpOptions);
    }

    editJobDetails(data: any) {

        // let formdata = new FormData();
        // for (var key in data) {
        //     if (key != 'images') {
        //         formdata.append(key, data[key])
        //     } else {
        //         console.log("dddd....... ", data.images)
        //         formdata.append("images", data.images);
        //     }
        // }
        // // if (data.images.length > 0) {
        // //     for (let i = 0; i < data.images.length; i++) {
        // //         formdata.append('images[' + i + ']', data.images[i]);
        // //     }
        // // }
        return this.http.post(`${environment.base_url}api/edit_job`, data, this.httpOptions);
    }

    job_delete(data: any) {
        return this.http.post(`${environment.base_url}api/job_delete`, data, this.httpOptions);
    }

    getEvenCategoryList(data: any) {
        return this.http.get(`${environment.base_url}/api/get_job_categories_list`, this.httpOptions);
    }

    jobCheckout(data: any){
      return this.http.post(`${environment.base_url}api/check_out`, data, this.httpOptions)
    }

    jobCheckin(data: any){
      return this.http.post(`${environment.base_url}api/check_in`, data, this.httpOptions)
    }
}
