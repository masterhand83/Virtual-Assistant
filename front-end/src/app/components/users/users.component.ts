import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import { getDefaultService } from '../../../../node_modules/@types/selenium-webdriver/chrome';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import {CryptoService} from '../../services/crypto.service';
import { TouchSequence } from '../../../../node_modules/@types/selenium-webdriver';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService,private sess:SessionService, private router:Router, private crypto:CryptoService) { }
  name:string;
  email:string;
  mobile:string;
  password:string;
  userType:string;
  
  
  ngOnInit() {
    
    this.getUserType();
    


    
  }

  addUser(form: NgForm){
    
    if(form.value.name!="" && form.value.email!="" && form.value.mobile!=""
      && form.value.password!="" && form.value.userType!=null &&
      form.value.name!=undefined && form.value.email!=undefined && form.value.mobile!=undefined
      && form.value.password!=undefined && form.value.userType!=undefined
    
    ){
    
      this.userService.postUser(form.value)
      .subscribe(res=>{
        console.log(res); 
          
        form.reset();
        alert("Usuario guardado exitosamente");
        
      });
    }
    else{
      alert('Favor de completar todos los campos');
    } 
    

    

  }
  
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }
  
  key:string;
  userTypeBoolean:boolean;
  getUserType(){
    this.key="UserType";
    this.userType=this.sess.getFromSession(this.key);
    if(this.userType=="1"){
      this.userTypeBoolean=true;
    }
    else{
      this.userTypeBoolean=false;
      this.router.navigate(['control']);
    }
   
    
  }
  email2: string = '';
  contra: string = '';
  recontra: string = '';
  boton: boolean = true;

  checkPasses() {
    console.log('CHECKPASSES()')
    console.log(this.password,"==?",this.recontra);
    if(this.password !== this.recontra){
      console.log('incorrecto');
      this.boton = true;
    }else{
      console.log('correcto',this.password,"==",this.recontra)
      this.boton = false;
    }
  }


  

}
