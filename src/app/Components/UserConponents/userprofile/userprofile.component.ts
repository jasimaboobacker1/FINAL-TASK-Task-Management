import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../Shared-Module/Services/api.service';
import { NavComponent } from '../../../Shared-Module/nav/nav.component';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NavComponent,DialogModule,ButtonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit{
   
   User:any;
  Users:any;
  UserName:any;
 
  constructor(private service:ApiService,private router:ActivatedRoute,private roterr:Router){}
  // navigating to editprofile
  Edit(){
    this.roterr.navigateByUrl('editprofile')
  }


  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('username');
    const profilePicture = sessionStorage.getItem('picture');
    // getting all users
    this.service.Getallusers().subscribe(
      (res) => {
        try {
          this.Users = res;
          // finding loggined users details
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
  // navigating to dashboard
  Pro(){
    this.roterr.navigateByUrl('dashboard')
  }
  // navigating to password change form
  change(){
    this.roterr.navigateByUrl('changepassword')
  }
  
}
