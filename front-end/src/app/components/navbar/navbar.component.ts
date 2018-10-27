import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private sess:SessionService) { }

  ngOnInit() {
    this.sess.validateSession();
    
    this.getUserType();
  }
  loggout(){
    this.sess.deleteSession();
  }

  key:string;
  userTypeBoolean:boolean=false;
  userType:string;
  getUserType(){
    this.key="UserType";
    this.userType=this.sess.getFromSession(this.key);
    if(this.userType=="1"){
      this.userTypeBoolean=true;
    }
    else{
      this.userTypeBoolean=false;
    }
    
  }

}
