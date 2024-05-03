import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../../../Shared-Module/nav/nav.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../Shared-Module/Services/api.service';
import { tasks } from '../../../../core/Interfaces/interfaces';
import { log } from 'console';
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

  formSubmitted = false;
  form!: FormGroup;

  constructor(private route: ActivatedRoute,private service:ApiService,private fb: FormBuilder,private router:Router)
  {
  }

  ngOnInit(): void {
    this.TaskId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.Getalltasks().subscribe((res) => {
      this.Tasks = res;
      this.Task = this.Tasks.find((taskkk: tasks) => taskkk.id === this.TaskId);
      console.log(this.Task);
      
      this.form = this.fb.group({
        id: [this.Task.id, [Validators.required]],
        title: [this.Task.title, [Validators.required]],
        description: [this.Task.description, [Validators.required]],
        dueDate: [this.Task.dueDate, [Validators.required]],
        priority: [this.Task.priority, [Validators.required]],
        status: [this.Task.status, [Validators.required]]
      });
      console.log(this.form.controls);     
      
    });
  }
  

 async Edittaskk(){
    if (this.form.valid) {
      const formValue = this.form.value;
      console.log(formValue);
      
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
      this.formSubmitted = true;
      this.form.markAllAsTouched();
    }
  }

}
