import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable()

export class ItemtagsService {
    constructor(public http: HttpClient) { }

    getTagWiseProductCountServices() {
        return this.http.get(`${environment.base_url}getTagsProductCount`);
    }
}