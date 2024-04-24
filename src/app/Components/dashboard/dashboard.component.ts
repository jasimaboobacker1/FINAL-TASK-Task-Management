import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../Services/tasks.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { tasks } from '../../Interfaces/interfaces';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../Services/api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterOutlet,RouterLink,NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  tasks:any;
  pendingTasks: tasks[] = [];
  CompletedTasks: tasks[] = [];
  tasksDetails:any;

  public Alltaskshow=true;
  public Pendingtaskshow=false;
  public Completedtaskshow=false;
 
  constructor(private taskService: ApiService, private router: Router) { }

  Renderchart(){
    const config = {
      type: 'pie',
      data: this.tasks,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart'
          }
        }
      },
    };
  }

  ngOnInit(): void {
    this.Alltask();    
  }

  // getting all tasks
  Alltask() {
    this.taskService.Getalltasks().subscribe((res) => {
      this.tasksDetails = res;
    });
    this.Alltaskshow=true;
    this.Pendingtaskshow=false;
    this.Completedtaskshow=false;
  }
   
  // getting pending task
  Pending() {
    this.taskService.Getalltasks().subscribe((res) => {
      this.tasksDetails = res;
      this.pendingTasks = this.tasksDetails.filter((task: tasks) => task.status === 'pending');
    });
    this.Pendingtaskshow=true;
    this.Alltaskshow=false;
    this.Completedtaskshow=false;
}

  //getting Completed task
  Completed(){
    this.taskService.Getalltasks().subscribe((res) => {
      this.tasksDetails = res;
      this.CompletedTasks = this.tasksDetails.filter((task: tasks) => task.status === 'completed');
    }); 
    this.Completedtaskshow=true;
    this.Pendingtaskshow=false;
    this.Alltaskshow=false;
  }

  
  // updateStatus(task_id:any) {    
  //   this.taskService.EditStatus(task_id).subscribe((res)=>{
  //     console.log(res)
  //   })
  //   // task.status = task.status === 'completed' ? 'pending' : 'completed';
  // }
  
  
  // navigating to task create page
  Addnavigate() {
    this.router.navigateByUrl('createtask');
  }
}
