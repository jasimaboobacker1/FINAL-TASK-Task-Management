import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from '../../../Shared-Module/Services/api.service';

@Component({
  selector: 'app-userprofileedit',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './userprofileedit.component.html',
  styleUrl: './userprofileedit.component.scss'
})
export class UserprofileeditComponent implements OnInit{

  User: any;
  Users: any;
  UserName: any;
  formSubmitted = false;
  form!: FormGroup;

  constructor(private service: ApiService, private router: ActivatedRoute, private roterr: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('username');
    this.service.Getallusers().subscribe(
      (res) => {
        try {
          this.Users = res;
          this.User = this.Users.find((user: any) => user.username === this.UserName);
          console.log(this.User);
          if (this.User) {
            this.form = this.fb.group({
              profilePicture: [''],
              place: [this.User.place, [Validators.required]],
              designation: [this.User.designation, [Validators.required]],
              birthdate: [this.User.birthdate, [Validators.required]],
              country: [this.User.country, [Validators.required]],
              facebook: [this.User.facebook, [Validators.required]],
              instagram: [this.User.instagram, [Validators.required]],
              linkedIn: [this.User.linkedIn, [Validators.required]]
            });
          }

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  // Adding UserDetails
  async AddDetails() {
    if (this.form.valid) {
      const formData = this.form.value;
      try {
        const userToUpdate = this.Users.find((user: any) => user.username === this.UserName);
        if (userToUpdate) {
          userToUpdate.place = formData.place;
          userToUpdate.designation = formData.designation;
          userToUpdate.birthdate = formData.birthdate;
          userToUpdate.country = formData.country;
          userToUpdate.facebook = formData.facebook;
          userToUpdate.instagram = formData.instagram;
          userToUpdate.linkedIn = formData.linkedIn;
          await this.service.UpdateUserDetails(userToUpdate).subscribe((res: any) => {
            this.roterr.navigateByUrl('profile');
            Swal.fire({
              icon: 'success',
              title: 'Details updated successfully',
              showConfirmButton: false,
              timer: 1500
            });
          });
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    } else {
      this.formSubmitted = true;
      this.form.markAllAsTouched();
    }
  }
  
  
  

}
