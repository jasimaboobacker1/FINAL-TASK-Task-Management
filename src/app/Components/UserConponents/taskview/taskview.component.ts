import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../Shared-Module/Services/api.service';
import { tasks } from '../../../core/Interfaces/interfaces';
import { NavComponent } from '../../../Shared-Module/nav/nav.component';

@Component({
  selector: 'app-taskview',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule],
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

  Get(){
    this.TaskId = Number(this.route.snapshot.paramMap.get('id'));
        this.service.Getalltasks().subscribe((res) => {
      this.Tasks = res;
      this.Task = this.Tasks.find((taskkk: any) => taskkk.id === this.TaskId);
      console.log(this.Task); 
    });

  }

  Navigateedit(taskId: any){
    this.router.navigateByUrl(`edittask/${taskId}`)
    console.log(taskId);
  }

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

  Cancell(){
    this.router.navigateByUrl('dashboard')
  }
  

}
