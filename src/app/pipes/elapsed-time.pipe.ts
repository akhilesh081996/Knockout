import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return moment(value, 'MMMM Do YYYY, h:mm:ss a').fromNow()
  }

}
