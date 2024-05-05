import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../Shared-Module/Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../../../core/Interfaces/interfaces';
import Swal from 'sweetalert2';
import { NavComponent } from '../../../../Shared-Module/nav/nav.component';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss'
})
export class EditprofileComponent implements OnInit{


  UserName: any;
  User: any;
  Users: any;

  form = {
    place:'',
      designation:'',
      birthdate:'',
      country: '',
      facebook: '',
      instagram: '',
      linkedIn: '',
  };

  constructor(private service: ApiService, private router: ActivatedRoute, private roterr: Router, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('username');
    // getting all user
    this.service.Getallusers().subscribe(
      (res) => {
        try {
          this.Users = res;
          // finding loggined user details
          this.User = this.Users.find((user: any) => user.username === this.UserName);
          if (this.User) {
            this.form.place = this.User.place;
            this.form.designation = this.User.designation;
            this.form.birthdate = this.User.birthdate;
            this.form.country = this.User.country;
            this.form.facebook = this.User.facebook;
            this.form.instagram = this.User.instagram;
            this.form.linkedIn = this.User.linkedIn;

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

  // Adding details of user 
 async Adddetail() {
    if (this.form) {
      const formData = this.form;
      try {
        const userToUpdate = this.Users.find((user: Users) => user.username === this.UserName);
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
        }else{
          console.error('User not found');
        }
      } catch(error) {
        console.error('Error updating user details:', error);
      }
    } else {
     
    }
  }

 

  Cancel(){
    this.roterr.navigateByUrl('profile')
  }
  
}
