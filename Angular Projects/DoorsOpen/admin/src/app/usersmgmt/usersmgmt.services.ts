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

export class UsersmgmtService {
    public httpOptions: any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        };
    }

    getAllusers() {
        return this.http.get(`${environment.base_url}getAllusers`);
    }

    getUserDetails(data: any) {
        return this.http.post(`${environment.base_url}api/get_user_by_id`, data, this.httpOptions);
    }

    activeOrInactiveUser(data: any) {
        return this.http.post(`${environment.base_url}api/activeOrInactiveUser`, data);
    }

    deleteUser(data: any) {
        return this.http.post(`${environment.base_url}api/delete_user`, data, this.httpOptions);
    }

    getBrokerage() {
        return this.http.get(`${environment.base_url}api/get_brokerage`, this.httpOptions);
    }

    userStatusChange(data: any) {
        return this.http.post(`${environment.base_url}api/user_block_unblock`, data, this.httpOptions);
    }

    approveRejectAgent(data: any) {
      return this.http.post(`${environment.base_url}api/approveRejectAgent`, data, this.httpOptions);
    }

    changeUserPassword(data: any){
      return this.http.post(`${environment.base_url}api/changeUserPassword`, data, this.httpOptions);

    }

    updateUser(data: any) {
        let formdata = new FormData();

        for (var key in data) {
            if (key != 'image' || data.image == null || data.image.length == 0) {
                formdata.append(key, data[key])
            } else {
                formdata.append("image", data[key], data[key].name);
            }
        }
        return this.http.post(`${environment.base_url}api/edit_user`, formdata, this.httpOptions);
    }


    userAdd(data: any) {
        let formdata = new FormData();
        for (var key in data) {
            if (key != 'image' || data.image == null) {
                formdata.append(key, data[key])
            } else {
                formdata.append("image", data[key], data[key].name);
            }
        }

        return this.http.post(`${environment.base_url}api/user_add`, formdata, this.httpOptions);
    }
}
