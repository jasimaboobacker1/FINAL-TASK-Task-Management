import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../../Shared-Module/nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  public loginshow=true;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.LoginCheck();
  }

  // navigating to login
  LoginNavigate(){
    this.router.navigateByUrl('login')
  }
//  login check ,checking weather loggined or not
  LoginCheck(){
    if (typeof sessionStorage !== 'undefined') {
            this.loginshow=false;
    }
  }

}
