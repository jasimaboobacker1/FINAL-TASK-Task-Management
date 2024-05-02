import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../Shared-Module/Services/api.service';

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
  // visible: boolean = false;
  constructor(private service:ApiService,private router:ActivatedRoute,private roterr:Router){}

  Edit(){
    this.roterr.navigateByUrl('editprofile')
  }


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
  }

  Pro(){
    this.roterr.navigateByUrl('dashboard')
  }
  change(){
    this.roterr.navigateByUrl('changepassword')
  }
  // showDialog() {
  //   this.visible = true;
  // }
  
  
}
