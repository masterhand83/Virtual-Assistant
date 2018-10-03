import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
      
  }
  loginUser(){
    //ser: User = this.http.post<User>('http://localhost:3000/api/users/login');
  }
}
