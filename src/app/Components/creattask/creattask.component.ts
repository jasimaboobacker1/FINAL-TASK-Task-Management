import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';
import { tasks } from '../../Interfaces/interfaces';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-creattask',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterOutlet,RouterLink,NavComponent,DashboardComponent],
  templateUrl: './creattask.component.html',
  styleUrl: './creattask.component.scss'
})
export class CreattaskComponent implements OnInit{

  formSubmitted = false;
  form!: FormGroup;
  User:any;
  Users:any;
  UserName:any;
  UserId:any;



  pieChartLabels: string[] = ['Low', 'Medium', 'High'];
  pieChartData: number[] = [0, 0, 0];
  pieChartType: string = 'pie';

  constructor(private fb: FormBuilder, private router: Router,private service:ApiService) { }

  tasks: tasks[] = [];
  tasksDetails: any;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.UserName = sessionStorage.getItem('username');
    this.service.Getallusers().subscribe(
      (res) => {
        try {
          this.Users = res;         
          this.User = this.Users.find((user: any) => user.username === this.UserName);
         
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  async Addtaskk(){
    if(this.form.valid){
      const formValue = this.form.value;
      const userName = sessionStorage.getItem('username');
      if(userName){
        formValue.username = userName;
        try{
          await this.service.AddTask(formValue).subscribe((res)=>{
            this.router.navigateByUrl('dashboard')
            Swal.fire({
              icon: 'success',
              title: 'Task Added successfully',
              showConfirmButton: false,
              timer: 1500 
            });
          })
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
  
  
  // generateTaskId(): number {
  //   return Math.floor(Math.random() * 1000) + 1;
  // }
  

  
  canExit(): Promise<boolean> {
    if (this.form.dirty) {
      return Swal.fire({
        title: "Are you sure?",
        text: "You have unsaved changes. Do you want to navigate away?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "black",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, navigate away!"
      }).then((result) => {
        return result.isConfirmed;
      });
    } else {
      return Promise.resolve(true);
    }
  }
  
  
}
