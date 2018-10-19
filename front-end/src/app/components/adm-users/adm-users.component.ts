import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../services/session.service';


import { ActivatedRoute } from '../../../../node_modules/@angular/router';

declare var M: any;


@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.component.html',
  styleUrls: ['./adm-users.component.css'],
  providers:[UsersService]
})
export class AdmUsersComponent implements OnInit {
  
  constructor(private userService: UsersService,private sess:SessionService,private _route:ActivatedRoute) { 
    
  }
  name2:string;
  id2:string;
  idUser:number;
  checku:boolean;
 


  ngOnInit() {
   

    this.idUser=+this._route.snapshot.paramMap.get('id');
    
    this.getUsers();
     
  

  }
  
  getUsers(){
    if(this.idUser==2){
      this.checku=true;
      this.userService.getResidents()
      .subscribe(res=>{
        this.userService.user=res as User[];
        
      });
    }
    else if(this.idUser==3){
      this.checku=false;
      this.userService.getDesigners()
      .subscribe(res=>{
        this.userService.user=res as User[];
        
      });
    }
    
    

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
      
      this.getUsers();
      alert("Actualizado Satisfactoriamente");
    });

  }

  prueba(name2:string,id2:string){
   
    this.id2=id2;
    this.name2=name2;
    
  }

  
  

}
