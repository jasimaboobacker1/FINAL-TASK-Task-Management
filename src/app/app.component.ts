import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Final-Task';
  // public userShow=false;
  // public loginshow=true;
  


  // constructor(private router:Router){}

  // UserCheck(){
  //   if(sessionStorage.getItem('token')){
  //     this.userShow=true;
  //     this.loginshow=false;
  //   } 
  // }


  // logout(){
  //   sessionStorage.clear();
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Logged Out',
  //     timer: 1500,
  //     showConfirmButton: false
  //   });  
  //   this.router.navigateByUrl('');
  //   window.location.reload();

    
  // }

  ngOnInit(): void {
    // this.UserCheck();
  }

  
}
