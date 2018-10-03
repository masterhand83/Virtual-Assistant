import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  addUser(form: NgForm){
    
    this.userService.postUser(form.value)
    .subscribe(res=>{
      console.log(res);
    });

  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();    
    }
  }
 


}
