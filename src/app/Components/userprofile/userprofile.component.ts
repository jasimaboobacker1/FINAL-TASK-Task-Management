import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NavComponent],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {

}
