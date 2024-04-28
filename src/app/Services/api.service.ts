import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users, tasks } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private userapiurl='http://localhost:3000/Users';
  private taskapiurl='http://localhost:3000/Tasks';

  // getting allusers
  Getallusers(){
     return this.http.get(this.userapiurl)
  }

  // GetUser
  GetUser(email:any){
  return this.http.get(`${this.userapiurl}/${email}`)
  }

  // getting alltasks
  Getalltasks(){
    return this.http.get(this.taskapiurl)
  }

  // getTask
  GetTask(id: number) {
    return this.http.get(`${this.taskapiurl}/${id}`);
  }
  
  // signup
  Signup(userDetails: any) {
    return this.http.post(this.userapiurl, userDetails);     
  }

  // AddUserDetails
  UpdateUserDetails(userToUpdate: any) {
    const url = `${this.userapiurl}/${userToUpdate.id}`; 
    return this.http.put(url, userToUpdate);
  }

  // UpdateStatus
  UpdateStatus(Task: any) {
    console.log(Task.id);
    const url = `${this.taskapiurl}/${Task.id}`;
    Task.status = 'completed'; 
    return this.http.put(url, Task);
  }


  // UpdateTaskDetail
  UpdateTask(id: string, updatedTask: any) {
    const url = `${this.taskapiurl}/${id}`;
    return this.http.put(url, updatedTask);
}

  
  

  // changepassword
  ChangePassword(user: Users) {
    return this.http.put(`${this.userapiurl}/${user.id}`, user);
  }



  

  // Addtask
  AddTask(Taskdetails:tasks){
    return this.http.post(this.taskapiurl,Taskdetails)
  }

  
  // Delete Task
  DeleteTask(id:number){
    return this.http.delete(`${this.taskapiurl}/${id}`)
  }

  
}
