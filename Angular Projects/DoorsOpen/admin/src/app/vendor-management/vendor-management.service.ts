import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable()
export class VendorManagementService {

  public httpOptions: any;
  constructor(public http: HttpClient) {
  this.httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': (JSON.parse(localStorage.getItem('adminDetails')!).auth_token != "") ? JSON.parse(localStorage.getItem('adminDetails')!).auth_token : "your OAuth access token",
      })
    };
  }

  getAllVandors(data: any) {
    return this.http
      .post<any>(
        `${environment.base_url}api/vendorList`,
        Object.assign(data),
        this.httpOptions
      )
  }

  addVendor(data: any) {
    return this.http
      .post<any>(
        `${environment.base_url}api/addNewVendor`,
        Object.assign(data),
        this.httpOptions
      )
  }

  deleteVendor(data: any) {
    return this.http
      .post<any>(
        `${environment.base_url}api/deleteVendor`,
        Object.assign(data),
        this.httpOptions
      )
  }

  getVendor(data: any) {
    return this.http
      .post<any>(
        `${environment.base_url}api/vendorDetails`,
        Object.assign(data),
        this.httpOptions
      )
  }

  editVendor(data: any) {
    return this.http
      .post<any>(
        `${environment.base_url}api/editVendor`,
        Object.assign(data),
        this.httpOptions
      )
  }
}
