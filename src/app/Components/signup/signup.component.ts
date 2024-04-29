import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { NavComponent } from '../nav/nav.component';
import { ApiService } from '../../Shared-Module/Services/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterOutlet,RouterLink,NavComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  formSubmitted = false;
  form!: FormGroup;

  constructor(private _fb: FormBuilder,private router:Router,private userService:ApiService) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]],
    });
    console.log(this.form.value);
    
  }

  // SignUp code
  async signUp(){
    if(this.form.valid){
      const formValue = this.form.value;
      try{
        await this.userService.Signup(formValue).subscribe((res)=>{
          this.router.navigateByUrl('login');
          sessionStorage.setItem('email',formValue.email)
          Swal.fire({
                    icon: 'success',
                    title: 'Signed up successfully',
                    showConfirmButton: false,
                    timer: 1500 
                  });
        })
      }catch(error){
        console.error('Error signing up:', error);
      }
    } else {
          this.formSubmitted = true; 
          this.form.markAllAsTouched();
        } 
  }

  // navigation to login
  Log(){
    this.router.navigateByUrl('login')
  }
  

}
