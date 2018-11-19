import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from "./crypto.service";
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  IP:string = 'localhost';
  constructor(private router: Router, private cookieService: CookieService,private helmet: CryptoService) { }
  createSession(res:any){
    let id = this.helmet.cryptoEncrypt(res._id);
    let usrType = this.helmet.cryptoEncrypt(res.userType);
    let name = this.helmet.cryptoEncrypt(res.name);
    this.cookieService.set('UserID',id,1,'/',this.IP);
    this.cookieService.set('UserType',usrType,1,'/',this.IP);
    this.cookieService.set('Name',name,1,'/',this.IP);
    console.debug('COOKIE CREADA,',this.cookieService.getAll());
    //localStorage.setItem('UserID',res._id);
    //localStorage.setItem('UserType',res.userType);
    //localStorage.setItem('Name',res.name)
    //console.log('SESION CREADA PARA',res);
  }
  createProjectSession(projectid:string){
    let pro = this.helmet.cryptoEncrypt(projectid);
    this.cookieService.set('ActualProject',pro,1,'/',this.IP);
    //localStorage.setItem('ActualProject',projectid);
    console.log('SESION CREADA PARA PROYECTO ',projectid);
  }
  deleteProjectSession(){
    this.cookieService.delete('ActualProject','/',this.IP);
    //localStorage.removeItem('ActualProject');
  }
  
  validateSession(){
    let usrID = this.cookieService.get('UserID');
    if (usrID == null || usrID === '') {
      this.router.navigate(['']);
    }
  }
  validateProject(){
    let actProject = this.cookieService.get('ActualProject');
    if(actProject==null||actProject === ''){
      this.router.navigate(['/projects']);
    }
  }
  deleteSession(){
    this.cookieService.deleteAll('/','localhost');
    /*localStorage.removeItem('UserID');
    localStorage.removeItem('UserType');
    localStorage.removeItem('Name');
    localStorage.removeItem('ActualProject');*/
    this.router.navigate(['']);
  }
  getFromSession(key:string){
    let value = this.cookieService.get(key);
    let decipher = this.helmet.cryptoDecrypt(value);
    //console.debug(decipher);
    return decipher;
    //return localStorage.getItem(key);
  }
}
