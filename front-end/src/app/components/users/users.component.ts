import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import { getDefaultService } from '../../../../node_modules/@types/selenium-webdriver/chrome';

import { SessionService } from '../../services/session.service';
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
    //this.sess.validateSession();
  }

  addUser(form: NgForm){
    

    this.userService.postUser(form.value)
    .subscribe(res=>{
      console.log(res);   
      form.reset();
      alert("Usuario guardado exitosamente");
      
    });

  }
  loggout(){
    this.sess.deleteSession();
  }
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }
 


}
