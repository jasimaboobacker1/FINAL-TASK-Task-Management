import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../Shared-Module/Services/api.service';
import { tasks } from '../../../core/Interfaces/interfaces';
import { NavComponent } from '../../../Shared-Module/nav/nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterOutlet,RouterLink,NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  
})
export class DashboardComponent implements OnInit{

 

  tasks:any;
  pendingUserTasks: tasks[] = [];
  CompletedUserTasks: tasks[] = [];
  OverdueUserTasks:tasks[]=[];
  tasksDetails:any;
  Usertasks:any;
  pieChart: any;

  data:any;
  highcount:any[] = [];
  medcount:any[] = [];
  lowcount:any[] = [];
  taskcount:number;
  

  sortColumn: any;
  sortDirection: 'asc' | 'desc' = 'asc';
 
 
  public Alltaskshow=true;
  public Pendingtaskshow=false;
  public Completedtaskshow=false;
  public Overtaskshow=false;
 
  constructor(private taskService: ApiService, private router: Router) {
    this.taskcount = 0;
  }



  createPieChart(lowCount:number, medCount:number, highCount:number): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
          label: 'Priority Tasks',
          data: [highCount, medCount, lowCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',   
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tasks with priority'
          }
        }
      }
    });
  }



  sortTasks(): void {
    if (this.sortColumn && this.Usertasks) {
      this.Usertasks.sort((a: any, b: any) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];
        return typeof valueA === 'string'
          ? valueA.localeCompare(valueB)
          : valueA - valueB;
      });
    }
  }


  ngOnInit(): void {
    this.Alltask();
    this.taskService.Getalltasks().subscribe(
      (res) => {
        
        this.data = res ?? [];
        let highCount = 0;
        let medCount = 0;
        let lowCount = 0;
  
        this.data.forEach((task:any) => {
          if (task.priority === 'high') {
            highCount++;
          } else if (task.priority === 'medium') {
            medCount++;
          } else if (task.priority === 'low') {
            lowCount++;
          }
        });
        this.createPieChart(lowCount, medCount, highCount);
  
        this.taskcount = this.Usertasks.length;
      
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
    this.updateOverdueTasks();
  setInterval(() => {
    this.updateOverdueTasks();
    window.location.reload();

  }, 50000);
  }


  updateOverdueTasks(): void {
    this.taskService.Getalltasks().subscribe((tasks: any) => {
      tasks.forEach((task: any) => {
        if (task.status !== 'overdue' && new Date(task.dueDate) < new Date() && task.status !== 'completed') {
          task.status = 'overdue';
          this.taskService.UpdateStatusOverdue(task).subscribe(() => {
            console.log('Task status updated to overdue');
          }, (error) => {
            console.error('Error updating task status:', error);
          });
        }
      });
    });
  }
  
  

  // getting all tasks
  Alltask() {
    this.taskService.Getalltasks().subscribe((res) => {
      this.tasksDetails = res;
      const UserName = sessionStorage.getItem('username');
      this.Usertasks = this.tasksDetails.filter((task: any) => task.username === UserName);
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
    }); 
    this.Completedtaskshow=false;
    this.Pendingtaskshow=false;
    this.Alltaskshow=false;
    this.Overtaskshow=true;

  }
  
  //  deleting task
  deleteTask(taskId:number){
    this.taskService.DeleteTask(taskId).subscribe((res)=>{
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
  

  // Updating Tasks status code
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
        this.Alltask();
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

  
  // navigating to task
  viewnavigte(id:any){ 
    this.router.navigateByUrl(`viewtask/${id}`)

  }
}
