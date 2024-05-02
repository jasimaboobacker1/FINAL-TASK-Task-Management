import { Component } from '@angular/core';
import { AdminnavComponent } from '../adminnav/adminnav.component';

@Component({
  selector: 'app-usermanage',
  standalone: true,
  imports: [AdminnavComponent],
  templateUrl: './usermanage.component.html',
  styleUrl: './usermanage.component.scss'
})
export class UsermanageComponent {

}
