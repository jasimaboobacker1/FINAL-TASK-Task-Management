import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users, tasks } from '../../core/Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private userapiurl='http://localhost:3000/users';
  private taskapiurl='http://localhost:3000/tasks';

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
  Signup(userDetails:any) {
    return this.http.post(this.userapiurl, userDetails);     
  }

  // AddUserDetails
  UpdateUserDetails(userToUpdate: any) {
    console.log(userToUpdate);
    const url = `${this.userapiurl}/${userToUpdate.id}`; 
    return this.http.put(url, userToUpdate);
  }

 Updatepeofilephoto(Updateduser: any) {
  console.log(Updateduser);
     const url = `${this.userapiurl}/${Updateduser.id}`; 
     return this.http.put(url, Updateduser);
  }

  // UpdateStatus
  UpdateStatus(Task: any) {
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

  // Delete User
  DeleteUser(id:number){
    return this.http.delete(`${this.userapiurl}/${id}`)
  }

  
}
