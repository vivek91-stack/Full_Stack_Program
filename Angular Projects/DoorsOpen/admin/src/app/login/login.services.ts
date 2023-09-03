import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
@Injectable()

export class LoginService {
    constructor(public http: HttpClient) { }
    admin_login(data: any): Observable<any> {
        return this.http.post(`${environment.base_url}auth/login`, data);
    }

    forgotPassword(data: any): Observable<any> {
        return this.http.post(`${environment.base_url}forgot_password`, data);
    }
}