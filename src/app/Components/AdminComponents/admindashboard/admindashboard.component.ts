import { Component, OnInit } from '@angular/core';
import { AdminnavComponent } from '../adminnav/adminnav.component';
import { ApiService } from '../../../Shared-Module/Services/api.service';
import { Users } from '../../../core/Interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [AdminnavComponent,FormsModule,CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent implements OnInit{

  users: any;

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers(){
    this.service.Getallusers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });

  }

  async Blockuser(id:number){
    try{
     await this.service.DeleteUser(id).subscribe((res)=>{  
      Swal.fire({
        icon: 'error',
        title: 'Blocked',
        showConfirmButton: false,
        timer: 700
      });
      
    this.GetUsers();
    })
    }catch(error){
      console.log('Error',error);
    } 
  }

}
