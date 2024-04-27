import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(private route: ActivatedRoute,private service:ApiService) { }

  ngOnInit(): void {
    this.TaskId = +(this.route.snapshot.paramMap.get('id') ?? '0');
     this.service.Getalltasks().subscribe((res) => {
      this.Tasks = res;
      console.log(this.Tasks);
    });
    this.Task = this.Tasks.find((taskkk:any) => taskkk.id === this.TaskId);
    console.log(this.Task);
    
  }
    
   
  

}
