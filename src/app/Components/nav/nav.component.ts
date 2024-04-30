import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterOutlet,RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  

  public userShow=false;
  public loginshow=true;
  public logoutshoow = false;
  


  constructor(private router:Router){}

  UserCheck(){
    if(typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')){
      this.userShow=true;
      this.loginshow=false;
    } 
  }


  logout(){
    sessionStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      timer: 1500,
      showConfirmButton: false
    });  
    this.router.navigateByUrl('');
  }

  logoutCheck() {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')) {
      this.logoutshoow = true;
    }
  }


  ngOnInit(): void {
    this.UserCheck();
    this.logoutCheck();
  }

}
