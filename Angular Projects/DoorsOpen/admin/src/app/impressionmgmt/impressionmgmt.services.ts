import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

// const httpOptions = {
//     headers: new HttpHeaders({
//         // 'X-Auth-Token': JSON.parse(localStorage.getItem('adminDetails')).auth_token
//         'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')).auth_token : "your OAuth access token",
//     })
// };

@Injectable()

export class ImpressionmgmtService {
    public httpOptions:any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        };
    }

    getImpData(data:any) {
        return this.http.post(`${environment.base_url}api/get_imp_data`, data, this.httpOptions);
    }

    updateData(data:any) {
        let formdata = new FormData();

        for (var key in data) {
            if (key != 'image' || data.image == null || data.image.length == 0) {
                formdata.append(key, data[key])
            } else {
                formdata.append("image", data[key], data[key].name);
            }
        }
        return this.http.post(`${environment.base_url}api/update_impression`, formdata, this.httpOptions);
    }

    addData(data:any) {
        let formdata = new FormData();

        for (var key in data) {
            if (key != 'image' || data.image == null || data.image.length == 0) {
                formdata.append(key, data[key])
            } else {
                formdata.append("image", data[key], data[key].name);
            }
        }
        return this.http.post(`${environment.base_url}api/add_impression`, formdata, this.httpOptions);
    }

    userAdStatus(data:any){
        return this.http.post(`${environment.base_url}api/update_ad_status`, data, this.httpOptions);
    }
}