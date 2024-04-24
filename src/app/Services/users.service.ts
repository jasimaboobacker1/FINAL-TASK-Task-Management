import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Users[] = [
    {
      id: 1,
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      number: '1234567890',
      image: 'https://example.com/avatar.jpg',
      birthdate: '1990-01-01',
      country: 'USA',
    }
  ];
  

  constructor(private router:Router) { }

  getUsers(): any[] {
    return this.users;
  }

 
  Signup(userDetails: any) {
    const newId = this.users.length + 1;
    const newUser = { id: newId, ...userDetails };
    this.users.push(newUser);
  }

}
