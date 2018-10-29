import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/Project';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private projectsService:ProjectsService,private sess:SessionService) { }

  ngOnInit() {
    this.getUserType();
    this.getProjects();
    
  }

  
  getProjects(){


    if(this.userType=="1"){
      this.projectsService.getProjects()
      .subscribe(res => {
        this.projectsService.project=res as Project[];
      
      });   
    }
    else if(this.userType=="2" || this.userType=="3"){
      this.projectsService.getProjectsRP(this.UserID)
      .subscribe(res=>{
        this.projectsService.project=res as Project[];
      })
    }
  }

  key:string;
  key2:string;
  UserID:string;
  
  userType:string;
  getUserType(){
    this.key="UserType";
    this.userType=this.sess.getFromSession(this.key);
    
    this.key2="UserID";
    this.UserID=this.sess.getFromSession(this.key2);
    
  }

  

}
