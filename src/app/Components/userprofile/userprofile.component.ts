import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NavComponent],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit{
   
   User:any;
  Users:any;
  UserName:any;

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
  
}
