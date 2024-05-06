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

  // GettingUser
  GetUser(email:any){
  return this.http.get(`${this.userapiurl}/${email}`)
  }

  // getting alltasks
  Getalltasks(){
    return this.http.get(this.taskapiurl)
  }

  // gettingTask
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

 

  // UpdateStatus code
  UpdateStatus(Task: any) {
    const url = `${this.taskapiurl}/${Task.id}`;
    Task.status = 'completed'; 
    return this.http.put(url, Task);
  }

  // updating status to overdue
  UpdateStatusOverdue(task: tasks) {
    return this.http.put<tasks>(`${this.taskapiurl}/${task.id}`, task);
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

  updateUserPicture(user: any) {
    const userId = user.id; // Assuming user id is available in the user object
    return this.http.patch(`http://your-json-server-url/users/${userId}`, { picture: user.picture });
  }

  
}
