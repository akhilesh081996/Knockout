import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'chatTime'
})
export class ChatTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return moment(value, 'MMMM Do YYYY, h:mm:ss a').format('h:mm:ss a')
  }

}
