import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users, tasks } from '../../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private userapiurl='https://task-jsonserver.onrender.com/users';
  private taskapiurl='https://task-jsonserver.onrender.com/tasks';

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

  uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    // Replace 'your-upload-url' with your actual upload URL
    return this.http.post<any>('your-upload-url', formData);
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
