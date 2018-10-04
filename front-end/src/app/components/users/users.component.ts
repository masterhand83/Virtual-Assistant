import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import { getDefaultService } from '../../../../node_modules/@types/selenium-webdriver/chrome';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService) { }
  name:string;
  email:string;
  mobile:string;
  password:string;
  userType:string;
  ngOnInit() {
    
  }

  addUser(form: NgForm){
    

    this.userService.postUser(form.value)
    .subscribe(res=>{
      console.log(res);   
      form.reset();
      alert("Usuario guardado exitosamente");
      
    });

  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }
 


}
