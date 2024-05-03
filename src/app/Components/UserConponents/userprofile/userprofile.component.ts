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

  Edit(){
    this.roterr.navigateByUrl('editprofile')
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById('profilePhoto')!.setAttribute('src', reader.result as string);
        sessionStorage.setItem('picture',file.name)
      };
      reader.readAsDataURL(file);
    }
  }
  
  


  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('username');
    const profilePicture = sessionStorage.getItem('picture');
    if (profilePicture) {
        this.User.profileimage = profilePicture;
        console.log(this.User.profileimage);
        
    }
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
  
}
