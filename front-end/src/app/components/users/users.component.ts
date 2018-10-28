import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import { getDefaultService } from '../../../../node_modules/@types/selenium-webdriver/chrome';

import { SessionService } from '../../services/session.service';
import { TouchSequence } from '../../../../node_modules/@types/selenium-webdriver';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService,private sess:SessionService) { }
  name:string;
  email:string;
  mobile:string;
  password:string;
  userType:string;
  
  
  ngOnInit() {
    
    this.getUserType();
    
  }

  addUser(form: NgForm){
    if(form.value.name!=null && form.value.email!=null && form.value.mobile!=null
    && form.value.password!=null && form.value.userType!=null ){
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
    }
    
  }


}
