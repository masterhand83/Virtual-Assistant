import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {

  constructor(private sess:SessionService) { }

  ngOnInit() {
   this.getUserType();
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

}
