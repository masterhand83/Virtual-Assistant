import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import {UsersService} from '../../services/users.service';
import {ProjectsService} from '../../services/projects.service';
import {User} from '../../models/User';
import {Project} from '../../models/Project';

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
    if(form.value.name!="" && form.value.description!="" && form.value.idUser2!=null && 
    form.value.idUser3!=null && form.value.name!=undefined && form.value.description!=undefined && form.value.idUser2!=undefined && 
    form.value.idUser3!=undefined){
      this.projectsService.createProject(form.value.name,form.value.description,this.UserID,form.value.idUser2,form.value.idUser3)
      .subscribe(res=>{
        console.log(res);  
        alert('Proyecto Asignado Correctamente');
        form.reset();
        this.getProjects();
        
      });
    }
    else{
      alert('Favor de completar todos los campos');
    }
    
    
    
    
  }

  getProjects(){
    if(this.userType=="1"){
      this.projectsService.getProjects()
      .subscribe(res => {
        this.projectsService.project=res as Project[]; 
      });
      
    }
    if(this.userType=="2" || this.userType=="3"){
      this.projectsService.getProjectsRP(this.UserID)
      .subscribe(res=>{
        this.projectsService.project=res as Project[];
      })
    }
  }

  

  getUsersInCharge(_id:string){
    this.projectsService.getUsersInCharge(_id)
    .subscribe(res=>{
      console.log(res);
      this.projectsService.usersincharge=res as User[];
    })
  }

  updateInformation(form:NgForm){
   
    
    if(form.value.name!="" && form.value.description!="" && form.value.storeName!="" &&
      form.value.storeNumber!="" && form.value.m2!="" && form.value.location!="" &&  
      form.value.localReception!=null && form.value.furnitureDate!=null && form.value.openingDate!=null &&
      form.value.name!=undefined && form.value.description!=undefined && form.value.storeName!=undefined &&
      form.value.storeNumber!=undefined && form.value.m2!=undefined && form.value.location!=undefined
      && form.value.localReception!="" && form.value.furnitureDate!="" && form.value.openingDate!=""

      ){
        if (confirm('¿Estas seguro de actualizar?')) {
          this.projectsService.putInformation(form.value._id,form.value.name,form.value.description,form.value.storeName,
            form.value.storeNumber,form.value.m2,form.value.location,form.value.localReception,form.value.furnitureDate,
            form.value.openingDate)
            .subscribe(res=>{
              alert('Proyecto Actualizado Exitosamente');
              this.getProjects();
            });
        }
    }
    else{
      alert('Favor de completar todos los campos');
    }


    
    

  }

  projectCookie(projectid:string){
    this.sess.createProjectSession(projectid);
  }

  id2:string="";
  name2:string="";
  description2:string="";
  storeName2:string="";
  storeNumber2:number;
  m22:number;
  location2:string="";
  localReception2:Date;
  furnitureDate2:Date;
  openingDate2:Date;
  SelectedProject(_id:string,name:string,description:string,storeName: string,
    storeNumber: number,m2: number,location: string,localReception: Date,furnitureDate: Date,openingDate:Date){
    
    this.id2=_id;
    this.name2=name;
    this.description2=description; 
    this.storeName2=storeName;
    this.storeNumber2=storeNumber;
    this.m22=m2;
    this.location2=location;
    this.localReception2=localReception;
    this.furnitureDate2=furnitureDate;
    this.openingDate2=openingDate;

  }
  

}
