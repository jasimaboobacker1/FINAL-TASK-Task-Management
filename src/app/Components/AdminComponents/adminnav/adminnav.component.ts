import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './adminnav.component.html',
  styleUrl: './adminnav.component.scss'
})
export class AdminnavComponent {

  constructor(private router:Router){}
  // admin logout check
  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('login')
  }

}
