import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[UsersService]
})
export class ProjectsComponent implements OnInit {

  constructor(private sess:SessionService,private userService: UsersService) { }

  ngOnInit() {
    this.getResidents();
    this.getDesigners();
    
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
 

 
  

}
