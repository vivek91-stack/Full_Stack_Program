import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { Http } from '@angular/http';

@Component({
  templateUrl: 'datatable.component.html'
})
export class DataTableComponent {

  public data: any;
  public filterQuery = '';

  constructor(private http:HttpClient) {
    http.get('data.json')
      .subscribe((data)=> {
        console.log("data ---> " , data);
        
        setTimeout(()=> {
          this.data = JSON.stringify(data);
        }, 2000);
      });
  }

  public toInt(num:string) {
    return +num;
  }

  public sortByWordLength = (a:any) => {
    return a.name.length;
  }
}
