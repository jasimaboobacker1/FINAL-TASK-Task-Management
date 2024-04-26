import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { ApiService } from '../../Services/api.service';
import { tasks } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-taskview',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './taskview.component.html',
  styleUrl: './taskview.component.scss'
})
export class TaskviewComponent implements OnInit{

  TaskId: any;
  Task:any;
  
  constructor(private route: ActivatedRoute,private service:ApiService) { }

  ngOnInit(): void {
    this.TaskId= +(this.route.snapshot.paramMap.get('id') ?? '0');
    this.service.Gettasks(this.TaskId).subscribe((res) => {
    this.Task = res;
    });
  }

}
