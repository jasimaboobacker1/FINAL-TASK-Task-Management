import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overduecheck',
  standalone: true
})
export class OverduecheckPipe implements PipeTransform {

  transform(dueDate: string): any {

    const today = new Date();
    const due = new Date(dueDate);
    return due < today ? 'overdue' : '';
   
  }

}


