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
  loginUser(email:string,contra:string){
    return this.http.post('http://localhost:3000/api/users/login',{
      email: email,
      password: contra
    });
  }
  postUser(User: User){
    return this.http.post(this.URL_API,User);
  }
}
