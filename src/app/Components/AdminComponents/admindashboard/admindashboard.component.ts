import { Component } from '@angular/core';
import { AdminnavComponent } from '../adminnav/adminnav.component';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [AdminnavComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent {

}
