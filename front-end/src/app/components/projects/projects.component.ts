import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import {UsersService} from '../../services/users.service';
import {ProjectsService} from '../../services/projects.service';
import {User} from '../../models/User';

import { NgForm } from '../../../../node_modules/@angular/forms';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[UsersService,ProjectsService]
})
export class ProjectsComponent implements OnInit {

  constructor(private sess:SessionService,private userService: UsersService,private projectsService:ProjectsService) { }

  ngOnInit() {
    this.getResidents();
    this.getDesigners();

    this.getUserType();
    this.getProjects();
  }

  

  key:string;
  userTypeBoolean:boolean=false;
  userTypeBoolean2:boolean=false;
  userTypeBoolean3:boolean=false;
  userType:string;

  key2:string;
  UserID:string;
  getUserType(){
    this.key="UserType";
    this.userType=this.sess.getFromSession(this.key);
    if(this.userType=="1"){
      this.userTypeBoolean=true;
    }
    else if(this.userType=="2"){
      this.userTypeBoolean2=true;
    }
    else if(this.userType="3"){
      this.userTypeBoolean3=true;
    }

    this.key2="UserID";
    this.UserID=this.sess.getFromSession(this.key2);
  }

  getResidents(){
    this.userService.getResidents()
      .subscribe(res=>{
      this.userService.user=res as User[];
        
    });
  }

  
  getDesigners(){
    this.userService.getDesigners()
      .subscribe(res=>{
      this.userService.user2=res as User[];
        
    });
  }
 
  createProject(form:NgForm){
    
    
    this.projectsService.createProject(form.value.name,form.value.description,this.UserID,form.value.idUser2,form.value.idUser3)
    .subscribe(res=>{
      console.log(res);  
      
    });
    
    
  }

  getProjects(){
    if(this.userType=="1"){
      this.projectsService.getProjects()
      .subscribe(res => {
        console.log(res);
        

      });
    }
  }

 
  

}
