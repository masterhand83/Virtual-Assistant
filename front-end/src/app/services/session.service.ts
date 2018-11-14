import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from "./crypto.service";
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router, private cookieService: CookieService,private helmet: CryptoService) { }
  createSession(res:any){
    var res_prueba = this.helmet.cryptoEncrypt('hola mundet');
    this.cookieService.set('prueba',res_prueba,0,'/','localhost');
    console.debug('COOKIE CREADA,',this.cookieService.getAll());
    localStorage.setItem('UserID',res._id);
    localStorage.setItem('UserType',res.userType);
    localStorage.setItem('Name',res.name)
    console.log('SESION CREADA PARA',res);
  }
  createProjectSession(projectid:string){
    localStorage.setItem('ActualProject',projectid);
    console.log('SESION CREADA PARA PROYECTO ',projectid);
  }
  deleteProjectSession(){
    localStorage.removeItem('ActualProject');
  }
  
  validateSession(){
    if (localStorage.getItem('UserID') == null) {
      this.router.navigate(['']);
    }
  }
  validateProject(){
    if(localStorage.getItem('ActualProject')==null){
      this.router.navigate(['/projects']);
    }
  }
  deleteSession(){
    this.cookieService.deleteAll('/','localhost');
    localStorage.removeItem('UserID');
    localStorage.removeItem('UserType');
    localStorage.removeItem('Name');
    localStorage.removeItem('ActualProject');
    this.router.navigate(['']);
  }
  getFromSession(key:string){
    return localStorage.getItem(key);
  }
}
