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

  
  formSubmitted = false;
  form!: FormGroup;

  UserName: any;
  User: any;
  Users: any;

 

  constructor(private service: ApiService, private router: ActivatedRoute, private roterr: Router, private fb: FormBuilder) {}
  



  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('username');
    this.service.Getallusers().subscribe(
      (res) => {
        try {
          this.Users = res;
          this.User = this.Users.find((user: any) => user.username === this.UserName);
          this.initForm(); // Initialize the form after user data is fetched
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  
  initForm(): void {
    this.form = this.fb.group({
      place: [this.User.place, [Validators.required]],
      designation: [this.User.designation, [Validators.required]],
      birthdate: [this.User.birthdate, [Validators.required]],
      country: [this.User.country, [Validators.required]],
      facebook: [this.User.facebook, [Validators.required]],
      instagram: [this.User.instagram, [Validators.required]],
      linkedIn: [this.User.linkedIn, [Validators.required]],
    });
  }
  

 async Adddetail() {
    this.formSubmitted = true; 
    if (this.form.valid) {
      const formData = this.form.value;
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
