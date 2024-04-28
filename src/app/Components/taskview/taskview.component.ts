import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { ApiService } from '../../Services/api.service';
import { log } from 'console';

@Component({
  selector: 'app-taskview',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './taskview.component.html',
  styleUrl: './taskview.component.scss'
})
export class TaskviewComponent implements OnInit{

  TaskId: any;
  Tasks:any;
  Task:any;
  
  constructor(private route: ActivatedRoute,private service:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.TaskId = this.route.snapshot.paramMap.get('id');
    this.service.Getalltasks().subscribe((res) => {
      this.Tasks = res;
      this.Task = this.Tasks.find((taskkk: any) => taskkk.id === this.TaskId);
      console.log(this.Task); 
    });
  }

  Navigateedit(taskId: any){
    this.router.navigateByUrl(`edittask/${taskId}`)
    console.log(taskId);
  }
  
  
    
   
  

}
