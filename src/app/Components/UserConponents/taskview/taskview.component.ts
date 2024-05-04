import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../Shared-Module/Services/api.service';
import { tasks } from '../../../core/Interfaces/interfaces';
import { NavComponent } from '../../../Shared-Module/nav/nav.component';
import { OverduecheckPipe } from '../../../core/Pipes/overduecheck.pipe';

@Component({
  selector: 'app-taskview',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule,OverduecheckPipe],
  templateUrl: './taskview.component.html',
  styleUrl: './taskview.component.scss'
})
export class TaskviewComponent implements OnInit{

  TaskId: any;
  Tasks:any;
  Task:any;
  
  constructor(private route: ActivatedRoute,private service:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.Get();
  }

  // Getting all tasks
  Get(){
    this.TaskId = Number(this.route.snapshot.paramMap.get('id'));
        this.service.Getalltasks().subscribe((res) => {
      this.Tasks = res;
      this.Task = this.Tasks.find((taskkk: any) => taskkk.id === this.TaskId);
      console.log(this.Task); 
    });

  }

  // Navigating to edit task 
  Navigateedit(taskId: any){
    this.router.navigateByUrl(`edittask/${taskId}`);
  }

  // Delete Task code
  deleteTask(taskId:number){
    this.service.DeleteTask(taskId).subscribe((res)=>{
      console.log(res);
      this.Get();
      Swal.fire({
        icon: 'success',
        title: 'Deleted successfully',
        showConfirmButton: false,
        timer: 1500
    });  
    this.router.navigateByUrl('dashboard') 
    })
  }

  // Updating Status code
  async updateStatus(task: tasks) {
    try {
      const updatedTask = { ...task, status: 'completed' }; 
      await this.service.UpdateStatus(updatedTask).subscribe((res) => {
        this.Get();
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
  

  // Navigating to dashboard
  Cancell(){
    this.router.navigateByUrl('dashboard')
  }
  

}
