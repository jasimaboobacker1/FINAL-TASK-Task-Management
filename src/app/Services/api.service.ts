import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  // getting alltasks
  Getalltasks(){
    return this.http.get(this.taskapiurl)
  }

  Gettasks(id:number){
    return this.http.get(`${this.taskapiurl}/${id}`)
  }
  

  // signup
  Signup(userDetails: any) {
    return this.http.post(this.userapiurl, userDetails);     
  }



  // Addtask
  AddTask(Taskdetails:any){
    return this.http.post(this.taskapiurl,Taskdetails)
  }
  
  // Delete Task
  DeleteTask(id:number){
    return this.http.delete(`${this.taskapiurl}/${id}`)
  }

  // edit task
  // EditStatus(id:any){
  //   return this.http.patch(`${this.taskapiurl}/${id}`)
  // }
}
