import { Component } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-edittask',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule,ReactiveFormsModule,],
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.scss'
})
export class EdittaskComponent {

  TaskId: any;
  Task: any;
  Tasks:any;

  formSubmitted = false;
  form!: FormGroup;

  constructor(private route: ActivatedRoute,private service:ApiService,private fb: FormBuilder){}

  ngOnInit(): void {
   
    this.TaskId = this.route.snapshot.paramMap.get('id');
    this.service.Getalltasks().subscribe((res) => {
      this.Tasks = res;
      this.Task = this.Tasks.find((taskkk: any) => taskkk.id === this.TaskId);
      console.log(this.Task); 
    });
    this.form = this.fb.group({
      title: [this.Task.title, [Validators.required]],
      description: [this.Task.description, [Validators.required]],
      dueDate: [this.Task.dueDate, [Validators.required]],
      priority: [this.Task.priority, [Validators.required]],
      status: [this.Task.status, [Validators.required]]
    });
  }

  


 async Edittaskk(){
    if(this.form.valid){
      const formValue = this.form.value;
      const userName = sessionStorage.getItem('username');
     
      if(userName){
        formValue.username = userName;
        try{
        
        } catch(error){
          console.error('Error adding task:', error);        
        }
      } else {
        console.error('User email not found in session storage');
      }
    } else {
      this.formSubmitted = true;
      this.form.markAllAsTouched();
    }

  }

}
