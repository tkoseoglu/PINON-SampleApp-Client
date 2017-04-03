import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

transform(value: any[], args?: any): any {
    if (value === null || value === undefined) return null;
    if (args === undefined) return null;
    let columnName = args[0];
    let predicate = args[1];
    return value.sort(function (a, b) {
      var valA = a[columnName];
      var valB = b[columnName];
      if (predicate) {
        if (valA > valB) {
          return -1;
        } else if (valA < valB) {
          return 1;
        } else {
          return 0;
        }
      }
      else {
        if (valA < valB) {
          return -1;
        } else if (valA > valB) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

}
