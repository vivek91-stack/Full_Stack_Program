import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagDataFilter'
})
export class tagDataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.tag_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.count.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }
    return array;
  }
}
