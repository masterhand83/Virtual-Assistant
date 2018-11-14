import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {ProjectsService} from '../../services/projects.service'
import { User } from '../../models/User';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Project } from '../../models/Project';
import { CryptoService } from '../../services/crypto.service';

declare var M: any;


@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.component.html',
  styleUrls: ['./adm-users.component.css'],
  providers: [UsersService]
})
export class AdmUsersComponent implements OnInit {

  constructor(private userService: UsersService, private sess: SessionService, private _route: ActivatedRoute, 
  private projectService:ProjectsService, private router:Router, private crypto:CryptoService) {

  }

  idUser: number;
  checku: boolean;



  ngOnInit() {


    this.idUser = +this._route.snapshot.paramMap.get('id');

    this.getUsers();
    this.getUserType();
    

  }

  
  getUsers() {
    if (this.idUser == 2) {
      this.checku = true;
      this.userService.getResidents()
        .subscribe(res => {

          
          let power: any = [];
          power = res;

          var user:User;
          var users:User[]=[];
          for (let i = 0; i < power.length; i++) {
            user=this.crypto.cryptoDecrypt(res[i]);   
            users.push(user);
          }

          
          this.userService.user = users as User[];
               

        });
    }
    else if (this.idUser == 3) {
      this.checku = false;
      this.userService.getDesigners()
        .subscribe(res => {

          let power: any = [];
          power = res;

          var user:User;
          var users:User[]=[];
          for (let i = 0; i < power.length; i++) {
            user=this.crypto.cryptoDecrypt(res[i]);   
            users.push(user);
          }


          this.userService.user = users as User[];

        });
    }



  }



  deleteUser(_id: string) {
    if (confirm('¿Estas seguro de eliminarlo?')) {
      this.userService.deleteUser(_id)
        .subscribe(res => {
          this.getUsers();
          alert("Eliminado Satisfactoriamente");
        });
    }

  }

  updateUser(form: NgForm) {

    if(form.value.email!="" && form.value.mobile!="" && form.value.password!="" &&
    form.value.email!=undefined && form.value.mobile!=undefined && form.value.password!=undefined ){
      if (confirm('¿Estas seguro de actualizar?')) {
        this.userService.putUser(form.value._id, form.value.email, form.value.mobile, form.value.password)
          .subscribe(res => {
            this.getUsers();
            alert("Actualizado Satisfactoriamente");
          });
      }
    }
    else{
      alert('Favor de completar todos los campos');
    }
    
  }
  
  projects:Object[];
  getUserProjects(_id:string){
    this.userService.getUserProjects(_id)
    .subscribe(res=>{
      
      this.projects=res as Project[];
    });
  }
  
  updateUserInCharge(form:NgForm){
    
    if(form.value.idNewUser!=null){
      if(this.idUser == 2){
        if (confirm('¿Estas seguro de actualizar?')) {
          this.projectService.changeResident(form.value.id3,form.value.idNewUser)
          .subscribe(res=>{
            alert('Usuario Actualizado Correctamente');
            this.getUsers(); 
            this.alertResident();
          });
        }
      }
      else if(this.idUser == 3){
        if (confirm('¿Estas seguro de actualizar?')) {
          this.projectService.changeDesigner(form.value.id3,form.value.idNewUser)
          .subscribe(res=>{
            alert('Usuario Actualizado Correctamente');
            this.getUsers();
            
          });
        }
      }
    }
    else{
      alert('Favor de completar todos los campos');
    }
    

  }

  alertResident(){
    var name="Urgente";
    var description="Se ha cambiado el residente encargado de proyecto";
    this.projectService.addAlert(this.id3,name,description)
    .subscribe(res=>{
      console.log(res);
    });
  }

  name2: string = "";
  id2: string = "";
  email2: string = "";
  mobile2: number;
  password2: string = "";
  SelectedUser(name2: string, id2: string, email2: string, mobile2: number, password2: string) {

    this.id2 = id2;
    this.name2 = name2;
    this.email2 = email2;
    this.mobile2 = mobile2;
    this.password2 = password2;

  }
  id3:string;
  SelectedProject(_id:string){
    console.log(_id);
    this.id3=_id;
  }
  
  key: string;
  userTypeBoolean: boolean = false;
  userType: string;
  getUserType() {
    this.key = "UserType";
    this.userType = this.sess.getFromSession(this.key);
    if (this.userType == "1") {
      this.userTypeBoolean = true;
    }
    else if(this.userType=="2" || this.userType=="3"){

      this.router.navigate(['control']);

    }

    
  }


}
