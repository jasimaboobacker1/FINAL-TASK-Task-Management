import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { NavComponent } from '../nav/nav.component';
import { ApiService } from '../../Services/api.service';
import { Users } from '../../Interfaces/interfaces';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,NavComponent,RouterOutlet,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  

  formSubmitted = false;
  form!: FormGroup;
  UsersDetails: any;

  constructor(private router: Router, private fb: FormBuilder,private userServicee:ApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  
    this.userServicee.Getallusers().subscribe((res) => {
      this.UsersDetails = res;
    });
  }
  
  // login code
  async Login(){
    if(this.form.valid){
      const formValue = this.form.value;
      try {
        const user = this.UsersDetails.find((user: Users) => user.username === formValue.username && user.password === formValue.password);        
        if (user) {
            const token = uuidv4();
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('username', formValue.username);
            this.router.navigateByUrl('dashboard');
            Swal.fire({
                icon: 'success',
                title: 'Logged in successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Invalid username or password',
                timer: 1500,
                showConfirmButton: false
            });
        }
    } catch (error) {
        console.error('Error signing up:', error);
    }
    } else {
          this.formSubmitted = true; 
          this.form.markAllAsTouched();
        } 
  }

 
  Sign() {
    this.router.navigateByUrl('signup');
  }
}
