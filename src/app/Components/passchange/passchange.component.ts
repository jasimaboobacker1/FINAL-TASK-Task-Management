import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../Shared-Module/Services/api.service';

@Component({
  selector: 'app-passchange',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './passchange.component.html',
  styleUrl: './passchange.component.scss'
})
export class PasschangeComponent implements OnInit{

  
  formSubmitted = false;
  form!: FormGroup;
  UserName: any;
  User: any;
  Users: any;
  formData: any;
  password: any;


  


  constructor(private service: ApiService, private router: ActivatedRoute, private roterr: Router, private fb: FormBuilder) {}

  

  ngOnInit(): void {
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
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      newpassword: ['', [Validators.required]]
    });
  }

  async Changepass() {
    if (this.form.valid) {
      const oldPassword = this.form.value.password;
      const newPassword = this.form.value.newpassword;
      if (oldPassword === this.User.password) {
        this.User.password = newPassword;
  
        try {
          const res = await this.service.ChangePassword(this.User).toPromise();
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Password changed successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.roterr.navigateByUrl('profile')
        } catch (error) {
          console.error('Error changing password:', error);
          Swal.fire({
            icon: 'error',
            title: 'Password change failed',
            timer: 1500,
            showConfirmButton: false
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Old password is incorrect',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } else {
      this.formSubmitted = true;
      this.form.markAllAsTouched();
    }
  }
  
  navigatetoprofile(){
    this.roterr.navigateByUrl('profile')
  }

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
