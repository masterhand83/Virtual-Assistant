import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }
  createSession(res:any){
    localStorage.setItem('UserID',res._id);
    localStorage.setItem('UserType',res.userType);
    console.log('SESION CREADA PARA',res);
  }
  createProjectSession(projectid:string){
    localStorage.setItem('ActualProject',projectid);
    console.log('SESION CREADA PARA ',projectid);
  }
  deleteProjectSession(){
    localStorage.removeItem('ActualProject');
  }
  validateSession(){
    if (localStorage.getItem('UserID') == null) {
      this.router.navigate(['']);
    }
  }
  deleteSession(){
    localStorage.removeItem('UserID');
    localStorage.removeItem('UserType');
    this.router.navigate(['']);
  }
  getFromSession(key:string){
    return localStorage.getItem(key);
  }
}
