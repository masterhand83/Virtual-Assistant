import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import {ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {

  constructor(private sess:SessionService, private projectService:ProjectsService,private router: Router) { }

  ngOnInit() {
   this.sess.validateProject();
   this.getUserType();
   this.getIdProject();
  }
  
  deleteProject(_id: string) {
    if (confirm('¿Estas seguro de eliminarlo?')) {
      this.projectService.deleteProject(_id)
        .subscribe(res => {
          this.router.navigate([('/projects')]);
          alert('Eliminado Exitosamente');
          
        });
    }

  }



  key:string;
  userTypeBoolean:boolean=false;
  userTypeBoolean2:boolean=false;
  userType:string;
  getUserType(){
    this.key="UserType";
    this.userType=this.sess.getFromSession(this.key);
    if(this.userType=="1"){
      this.userTypeBoolean=true;
    }
    else if(this.userType=="2"){
      this.userTypeBoolean2=true;
    }
    
    
  }

  key2:string;
  _id:string;
  getIdProject(){
    this.key2="ActualProject";
    this._id=this.sess.getFromSession(this.key2);
  }


}
