import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()

export class PushNotificationService {
    public httpOptions:any;
    constructor(public http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
            })
        };
     }

    getAllUsers() {
        return this.http.get(`${environment.base_url}getUsers`);
    }

    sendPushNotificationByAdmin(data:any) {
        return this.http.post(`${environment.base_url}api/sendPushNotificationByAdmin`, data, this.httpOptions);
    }

    getAgentsNonAgents(data:any) {
        return this.http.post(`${environment.base_url}get_users_list`, data, this.httpOptions);
    }
}