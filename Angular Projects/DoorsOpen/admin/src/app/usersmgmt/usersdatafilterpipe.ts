import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersDataFilter'
})
export class UsersDataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, (row:any) => row.user_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.mobile_number.indexOf(query) > -1 || row.address.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.city.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }
    return array;
  }
}
