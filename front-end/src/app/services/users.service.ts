import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/User";
import { Project } from '../models/Project';
import {CryptoService} from '../services/crypto.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly IP = "localhost";
  readonly URL_API = 'http://'+this.IP+':3000/api/users/user';
  readonly URL_API2 = 'http://'+this.IP+':3000/api/users/project';
  
  user: User[];
  user2:User[];
  projects:Project[];

  constructor(private http: HttpClient, private crypto:CryptoService) {
      
  }
  loginUser(email:string,contra:string){

    
    var email2;
    email2=this.crypto.cryptoEncrypt(email);
    email2.toString();
    
    var contra2;
    contra2=this.crypto.cryptoEncrypt(contra);
    contra2.toString();
    
    var userData;
    
    userData={
      email:email2,
      password:contra2
      
    };

    console.log(userData);

    return this.http.post('http://'+this.IP+':3000/api/users/login',userData);
  }
  
  postUser(User: User){
    var String:String;
    var userData;
    String=this.crypto.cryptoEncrypt(User);
    String.toString();
    userData={userData: String};
    
    return this.http.post(this.URL_API,userData);
    
  }

  getUser(){
    return this.http.get(this.URL_API);
  }

  getResidents(){
    return this.http.get('http://'+this.IP+':3000/api/users/residents');
  }
  getDesigners(){
    return this.http.get('http://'+this.IP+':3000/api/users/designers');
  }

  deleteUser(_id: string){
    return this.http.delete(this.URL_API +`/${_id}`);
  }
  putUser(_id:string , email:string ,mobile:number,password:string){

    return this.http.put(this.URL_API + `/${_id}`,{
      _id:_id,
      email:email,
      mobile:mobile,
      password:password
    });
  }
  getUserProjects(_id:string){
    return this.http.get(this.URL_API2+`/${_id}`);
  }

  


}
