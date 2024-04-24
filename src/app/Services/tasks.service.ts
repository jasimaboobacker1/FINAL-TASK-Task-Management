import { Injectable } from '@angular/core';
import { tasks } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: tasks[] = [];
  

  constructor() { }

  Add(taskDetails: any) {
    const newId = this.tasks.length + 1;
    const newTask = { id: newId, ...taskDetails };
    this.tasks.push(newTask);
  }



  getTaskdetails(): any[] {
    return this.tasks;
  }
 
  addtask(Taskdetails: any) {
    const newId = this.tasks.length + 1;
    const newTask = { id: newId, ...Taskdetails };
    this.tasks.push(newTask);
  }
}
