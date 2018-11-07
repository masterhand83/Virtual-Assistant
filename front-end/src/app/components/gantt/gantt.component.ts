import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ProjectsService } from '../../services/projects.service';
import { ActivitiesService } from '../../services/activities.service';
import { Router } from '@angular/router';

import { Renderer2, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { NgForm } from '../../../../node_modules/@angular/forms';
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {

  constructor(
    private sess: SessionService, 
    private projectService: ProjectsService, 
    private activitiesService: ActivitiesService,
    private router: Router,
    private _Renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) { }
  script: string;
  ngOnInit() {


    this.sess.validateProject();
    this.getUserType();
    this.getIdProject();
    this.getActivitiesProject(res=>{
      console.log('ñlkjafñlkjasfñlkjaslñj')
      console.log(res)
      let result: string = '[';
      result = this.arrayToString(res, 'gantt');
      let s = this._Renderer2.createElement('script');
      s.text = `
      var ganttDatas = ${result}
      $(function () {
        $("#ganttChart").ganttView({
            data: ganttDatas,
            slideWidth: 800,
            behavior: {
                onClick: function (data) {
                    $('#actividadg').modal();
                    let hid = document.querySelector('#activityName');
                    let ed = document.querySelector('#actID');
                    hid.innerHTML= data.name;
                    ed.value = data.id;
                    
                },
                onResize: function (data) {
                    var msg = "Cambiaste de fecha el proyecto: {Empieza: " + data.start.toString("M/d/yyyy") + ", Termina: " + data.end.toString("M/d/yyyy") + " }";
                    $("#eventMessage").text(msg);
                },
                onDrag: function (data) {
                    var msg = "Cambiaste de lugar la actividad: { Empieza: " + data.start.toString("M/d/yyyy") + ", Termina: " + data.end.toString("M/d/yyyy") + " }";
                    $("#eventMessage").text(msg);
                }
            }
        });
      });
    `
      console.log(s.text);
      this._Renderer2.appendChild(this._document.body, s);
    });
    

  }


 

  gantt: any[];
  getActivitiesProject(cb) {
    this.projectService.getActivitiesProject(this._id)
      .subscribe((res: any[]) => {
       cb(res);
        
      });

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
  addActivityToProject(form: NgForm) {
    if (confirm('¿Estas seguro de añadir esta actividad?')) {
      this.projectService.addActivityToProject(this._id, form.value.name, form.value.description,
        form.value.start, form.value.end, form.value.priority)
        .subscribe(res => {
          console.log(res);
          alert('Actividad añadida correctamente al proyecto')
        });
    }

  }

  activated: boolean;
  activateProjectAlerts() {
    this.activated = true;

    this.projectService.activateProjectAlerts(this._id, this.activated)
      .subscribe(res => {
        alert('Alertas activivadas');
      });
  }

  desactivateProjectAlerts() {
    this.activated = false;

    this.projectService.activateProjectAlerts(this._id, this.activated)
      .subscribe(res => {
        alert('Alertas desactivivadas');
      });
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

  arrayToString(data: any[], mode: string) {

    let datos: string = '[';
    if (mode === 'gantt') {
      for (const d of data) {
        datos += `
          {
            id: '${d.id}',
            name: '${d.name}',
            series: ${this.arrayToString(d.series, 'series')}
          }${data.length > 0 ? ',' : ''}
        `
      }
      datos += ']';
    } else {
      for (const g of data) {
        datos += `
        {name:'${g.name}', start: new Date('${g.start}'), end: new Date('${g.end}'), color: '${g.color}'}
        `
      }
      datos += ']';
    }
    return datos;
  }

}
