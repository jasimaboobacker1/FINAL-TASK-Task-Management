import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../../../Shared-Module/nav/nav.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../Shared-Module/Services/api.service';
import { tasks } from '../../../../core/Interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taskedit',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './taskedit.component.html',
  styleUrl: './taskedit.component.scss'
})
export class TaskeditComponent implements OnInit{

  TaskId: any;
  Task: any;
  Tasks:any;
  invalid=false;

  constructor(private route: ActivatedRoute,private service:ApiService,private fb: FormBuilder,private router:Router)
  {
  }

  form = {
    title: '',
    description:'',
    dueDate:'',
    priority:'',
    status:'',
  };


  ngOnInit(): void {
    // geeting id from params
    this.TaskId = Number(this.route.snapshot.paramMap.get('id'));
    // getting all tasks
    this.service.Getalltasks().subscribe((res) => {
      this.Tasks = res;
      // finding that one task
      this.Task = this.Tasks.find((taskkk: tasks) => taskkk.id === this.TaskId);
      if (this.Task) {
        this.form.title = this.Task.title;
        this.form.description = this.Task.description;
        this.form.dueDate = this.Task.dueDate;
        this.form.priority = this.Task.priority;
        this.form.status = this.Task.status;
      }
    });
    
  }
  
  // edit task code
 async Edittaskk(){
    if (this.form) {
      const formValue = this.form;
      const userName = sessionStorage.getItem('username');
      const UpdatedTask = this.Tasks.find((taskkk: any) => taskkk.id === this.TaskId);    
      if (UpdatedTask) {
        try {
          UpdatedTask.id = this.TaskId;
          UpdatedTask.title = formValue.title;
          UpdatedTask.description = formValue.description;
          UpdatedTask.dueDate = formValue.dueDate;
          UpdatedTask.priority = formValue.priority;
          UpdatedTask.status = formValue.status;
          UpdatedTask.username = userName;
          console.log(UpdatedTask);
          
          await this.service.UpdateTask(UpdatedTask.id, UpdatedTask).subscribe((res:any)=>{
             Swal.fire({
            icon: 'success',
            title: 'Details updated successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl(`viewtask/${UpdatedTask.id}`);
          });
        } catch (error) {
          console.error('Error updating Task details:', error);
        }
      }
    } else {
       
    }
  }

 
  

}
