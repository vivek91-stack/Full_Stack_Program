import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TeamManagementService {

  public httpOptions: any;
  constructor(public http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
      })
    };
  }

  getAllTeam(data: any) {
    return this.http
      .post<any>(
        `${environment.base_url}api/teamList`,
        Object.assign(data),
        this.httpOptions
      )
  }

  getTeamMember(data: any) {
    return this.http
      .post<any>(
        `${environment.base_url}api/teamMembersList`,
        Object.assign(data),
        this.httpOptions
      )
  }

  removeTeamMember(data: any) {
    return this.http
      .post<any>(
        `${environment.base_url}api/removeTeamMember`,
        Object.assign(data),
        this.httpOptions
      )
  }
}
