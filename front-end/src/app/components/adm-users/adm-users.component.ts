import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var M: any;


@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.component.html',
  styleUrls: ['./adm-users.component.css'],
  providers:[UsersService]
})
export class AdmUsersComponent implements OnInit {
  
  constructor(private userService: UsersService) { 
    
  }
  name2:string;
  id2:string;


  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUser()
    .subscribe(res=>{
      this.userService.user=res as User[];
      console.log(res);
    });
    

  }

  deleteUser(_id:string){
    if(confirm('¿Estas seguro de eliminarlo?')){
      this.userService.deleteUser(_id)
      .subscribe(res=>{
        this.getUsers();
        alert("Eliminado Satisfactoriamente");
      });
    }

  }

  updateUser(form: NgForm){
   
    console.log(form.value);
    this.userService.putUser(form.value._id,form.value.email,form.value.mobile,form.value.password)
    .subscribe(res=>{
      console.log(res);
      this.getUsers();
      alert("Actualizado Satisfactoriamente");
    });

  }

  prueba(name2:string,id2:string){
   
    this.id2=id2;
    this.name2=name2;
    
  }

}
