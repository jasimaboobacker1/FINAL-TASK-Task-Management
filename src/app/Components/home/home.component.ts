import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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


  LoginNavigate(){
    this.router.navigateByUrl('login')
  }

  LoginCheck(){
    if(sessionStorage.getItem('token')){
      this.loginshow=false;
    }
  }

}
