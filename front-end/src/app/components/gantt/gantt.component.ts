import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';

import { Renderer2,Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {

  constructor(
    private sess: SessionService, 
    private projectService: ProjectsService, 
    private router: Router,
    private _Renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
    ) { }
  script: string;
  ngOnInit() {
    let s = this._Renderer2.createElement('script');
    s.text = `
    var i = 'hola mundo'
    alert(i)
    `
    this._Renderer2.appendChild(this._document.body,s);






    this.sess.validateProject();
    this.getUserType();
    this.getIdProject();
    this.generateScript();
  }
  generateScript(){
    this.script = `<script></script>`
  }



  deleteProject(_id: string) {
    if (confirm('¿Estas seguro de eliminarlo?')) {
      this.projectService.deleteProject(_id)
        .subscribe(res => {
          this.sess.deleteProjectSession();
          this.router.navigate([('/projects')]);
          alert('Eliminado Exitosamente');

        });
    }

  }



  key: string;
  userTypeBoolean: boolean = false;
  userTypeBoolean2: boolean = false;
  userType: string;
  getUserType() {
    this.key = "UserType";
    this.userType = this.sess.getFromSession(this.key);
    if (this.userType == "1") {
      this.userTypeBoolean = true;
    }
    else if (this.userType == "2") {
      this.userTypeBoolean2 = true;
    }


  }

  key2: string;
  _id: string;
  getIdProject() {
    this.key2 = "ActualProject";
    this._id = this.sess.getFromSession(this.key2);
  }


}
