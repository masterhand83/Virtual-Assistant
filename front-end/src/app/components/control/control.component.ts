import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {



  constructor(private router:Router,private sess:SessionService) { }
  
  ngOnInit() {
    this.getUserType();
  }

 


  key:string;
  key2:string;
  userTypeBoolean:boolean=false;
  userType:string;
  name:string
  getUserType(){
    this.key="UserType";
    this.userType=this.sess.getFromSession(this.key);
    if(this.userType=="1" || this.userType=="2"){
      this.userTypeBoolean=true;
    }
    else{
      this.userTypeBoolean=false;
    }
    
    this.key2="Name";
    this.name=this.sess.getFromSession(this.key2);
  }
  


}
