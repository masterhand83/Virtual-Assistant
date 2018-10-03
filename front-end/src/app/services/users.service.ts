import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly URL_API = 'http://localhost:3000/api/users/user';
  constructor(private http: HttpClient) {
      
  }
  loginUser(){
    //ser: User = this.http.post<User>('http://localhost:3000/api/users/login');
  }
  postUser(User: User){
    return this.http.post(this.URL_API,User);
  }
}
