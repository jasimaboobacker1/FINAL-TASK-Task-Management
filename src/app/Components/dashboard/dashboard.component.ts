import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { tasks } from '../../Interfaces/interfaces';
import {  Chart, registerables } from 'chart.js';
import { ApiService } from '../../Services/api.service';
import Swal from 'sweetalert2';

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
  pendingUserTasks: tasks[] = [];
  CompletedUserTasks: tasks[] = [];
  OverdueUserTasks:tasks[]=[];
  tasksDetails:any;
  Usertasks:any;
  // completedTaskLength: number = 0; 
  // pendingTaskLength: number = 0; 
 
  public Alltaskshow=true;
  public Pendingtaskshow=false;
  public Completedtaskshow=false;
  public Overtaskshow=false;
 
  constructor(private taskService: ApiService, private router: Router) { }
   


  createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Completed', 'Pending', 'Overdue'],
        datasets: [{
          label: 'Task Status',
          data: [4, 4, 2],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',  
            'rgba(25, 99, 132, 0.5)',   
            'rgba(234, 99, 120, 0.5)'    
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(25, 99, 132, 1)',
            'rgba(234, 99, 120, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Task Status'
          }
        }
      }
    });
  }
  
 
  // lengthCheck() {
  //    this.pendingTaskLength = this.tasksDetails.filter((task: any) => task.status === 'pending').length;
  //   console.log('Number of pending tasks:', this.pendingTaskLength);
  //    this.completedTaskLength = this.tasksDetails.filter((task: any) => task.status === 'completed').length;
  //   console.log('Number of completed tasks:', this.completedTaskLength);
  // }
  

    

  ngOnInit(): void {
    this.Alltask();
    // this.Pending();
    // this.Completed();
    this.createPieChart();
   
        
  }

  view(taskId:any){
    this.router.navigateByUrl(`viewtask/${taskId}`)
  }

  // getting all tasks
  Alltask() {
    this.taskService.Getalltasks().subscribe((res) => {
      console.log(res);
      this.tasksDetails = res;
      const UserName = sessionStorage.getItem('username');
      this.Usertasks = this.tasksDetails.filter((task: any) => task.username === UserName);
      // this.lengthCheck();
    });
    this.Alltaskshow = true;
    this.Pendingtaskshow = false;
    this.Completedtaskshow = false;
     this.Overtaskshow=false;

  }
  
  // getting pending task
  Pending() {
    this.taskService.Getalltasks().subscribe((res) => {
      this.tasksDetails = res;
      const UserName = sessionStorage.getItem('username');
      this.pendingUserTasks = this.tasksDetails.filter((task: any) => task.username === UserName && task.status == "pending");
      console.log(this.pendingUserTasks);
      // this.lengthCheck();      
    });
    this.Pendingtaskshow=true;
    this.Alltaskshow=false;
    this.Completedtaskshow=false;
    this.Overtaskshow=false;

}

  //getting Completed task
  Completed(){
    this.taskService.Getalltasks().subscribe((res) => {
      this.tasksDetails = res;
      const UserName = sessionStorage.getItem('username');
      this.CompletedUserTasks = this.tasksDetails.filter((task: any) => task.username === UserName && task.status == "completed");
      // this.lengthCheck();
    }); 
    this.Completedtaskshow=true;
    this.Pendingtaskshow=false;
    this.Alltaskshow=false;
    this.Overtaskshow=false;

  }
  // getting overdue tasks
  Overdue(){
    this.taskService.Getalltasks().subscribe((res) => {
      this.tasksDetails = res;
      const UserName = sessionStorage.getItem('username');
      this.OverdueUserTasks = this.tasksDetails.filter((task: any) => task.username === UserName && task.status == "overdue");
      // this.lengthCheck();
    }); 
    this.Completedtaskshow=false;
    this.Pendingtaskshow=false;
    this.Alltaskshow=false;
    this.Overtaskshow=true;

  }
  


  deleteTask(taskId:number){
    this.taskService.DeleteTask(taskId).subscribe((res)=>{
      console.log(res);
      this.Alltask();
      Swal.fire({
        icon: 'success',
        title: 'Deleted successfully',
        showConfirmButton: false,
        timer: 1500
    });   
    })
  }


  trackById(index: number, item: any) {
    return item.id; 
  }
  

  
  async updateStatus(task: any) {
    try {
      const updatedTask = { ...task, status: 'completed' }; 
      await this.taskService.UpdateStatus(updatedTask).subscribe((res) => {
        this.Alltask();
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          showConfirmButton: false,
          timer: 700 
        });
      }, (error) => {
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }
  
  
  
  
  // navigating to task create page
  Addnavigate() {
    this.router.navigateByUrl('createtask');
  }

  viewnavigte(id:any){ 
    this.router.navigateByUrl(`viewtask/${id}`)

  }
}
