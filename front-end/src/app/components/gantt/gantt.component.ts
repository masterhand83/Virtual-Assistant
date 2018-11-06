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
      let authorName:string="";
      authorName=this.getAuthorName();
      
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
                    let hid = document.querySelector('#information');
                    hid.value = data.id;
                    getComments();
                    
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
        var deleteButton = $('#deleteActivity');

        function deleteActivity(){
        var id=document.querySelector('#information').value;

        var URL_API = 'http://localhost:3000/api/activities/activity';
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", URL_API + '/'+id, true);
        xhttp.send();
        }
        deleteButton.on('click',()=>{
          if (confirm('¿Estas seguro de eliminar esta actividad?')) {
            deleteActivity();
            location.reload();
          }
        });

        var addComment=$('#addComment');
        function addComments(){
          var id=document.querySelector('#information').value;
          

          var comment=document.querySelector('#comment').value;
          
          var authorName= '${authorName}';

          var url = "http://localhost:3000/api/activities/comment";

          var data = {};
          data.authorName = authorName;
          data.comment  = comment;
          var json = JSON.stringify(data);

          var xhr = new XMLHttpRequest();
          xhr.open("POST", url + '/'+id, true);
          xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
          xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "201") {
              console.table(users);
            } else {
              console.error(users);
            }
          }
          xhr.send(json);

          document.querySelector('#comment').value="";
          


        }
        addComment.on('click',()=>{ 
            addComments();  
            getComments();  
           
        });
        

        function getComments(){
          var id=document.querySelector('#information').value;
          
          var url  = "http://localhost:3000/api/activities/comment";
          var xhr  = new XMLHttpRequest()
          xhr.open('GET', url + '/'+id, true)
          xhr.onload = function () {
            var comments = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
              var texto="";
              for(i=0;i<comments.length;i++){
                
                texto+= comments[i].authorName + ": " + comments[i].comment + "                                                  "; 
              }
              document.querySelector('#textComment').value=texto;
              

            } else {
              console.error(users);
            }
          }
          xhr.send(null);

        }
        var editPriority = $('#editPriority');

        function editP(){
          var id=document.querySelector('#information').value;
          var priorityText=document.querySelector('#priority').value;
          
          var url = "http://localhost:3000/api/activities/priority";

          var data = {};
          data.priority = priorityText;
          var json = JSON.stringify(data);

          var xhr = new XMLHttpRequest();
          xhr.open("PUT", url + '/'+id, true);
          xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
          xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
              console.table(users);
            } else {
              console.error(users);
            }
          }
          xhr.send(json);
          


        }
        editPriority.on('click',()=>{
          editP();
          alert('Prioridad Actualizada Exitosamente');
          
        });

        var addObjective = $('#addObjective');

        function addO(){
          var id=document.querySelector('#information').value;
          var objective=document.querySelector('#objective').value;
          
          var url = "http://localhost:3000/api/activities/objective";

          var data = {};
          data.objective= objective;
          var json = JSON.stringify(data);

          var xhr = new XMLHttpRequest();
          xhr.open("PUT", url + '/'+id, true);
          xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
          xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
              console.table(users);
            } else {
              console.error(users);
            }
          }
          xhr.send(json);


        }
        addObjective.on('click',()=>{
          addO();
          document.querySelector('#objective').value="";
          alert('Objetivo añadido al proyecto');
        });

        var addDeliverable = $('#addDeliverable');

        function addD(){
          var id=document.querySelector('#information').value;
          var deliverable=document.querySelector('#deliverable').value;
          
          var url = "http://localhost:3000/api/activities/deliverable";

          var data = {};
          data.deliverable= deliverable;
          var json = JSON.stringify(data);

          var xhr = new XMLHttpRequest();
          xhr.open("PUT", url + '/'+id, true);
          xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
          xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
              console.table(users);
            } else {
              console.error(users);
            }
          }
          xhr.send(json);


        }
        addDeliverable.on('click',()=>{
          addD();
          document.querySelector('#deliverable').value="";
          alert('Entregable añadido al proyecto');
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
          location.reload();
        });
    }

  }
  addActivityToProject(form: NgForm) {
    if(form.value.name!="" && form.value.description!="" && form.value.start!="" && form.value.end!="" && form.value.priority!="" &&
    form.value.name!=null && form.value.description!=null && form.value.start!=null && form.value.end!=null && form.value.priority!=null &&
    form.value.name!=null && form.value.description!=undefined && form.value.start!=undefined && form.value.end!=undefined && form.value.priority!=undefined){
      if (confirm('¿Estas seguro de añadir esta actividad?')) {
        this.projectService.addActivityToProject(this._id, form.value.name, form.value.description,
          form.value.start, form.value.end, form.value.priority)
          .subscribe(res => {
            console.log(res);
            alert('Actividad añadida correctamente al proyecto');
            location.reload();
          });
          
      }
    }
    else{
      alert('Favor de completar todos los campos');
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
        alert('Alertas desactivadas');
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
    console.log(this._id);
  }

  key3: string;
  authorName: string;
  getAuthorName() {
    this.key3 = "Name";
    this.authorName = this.sess.getFromSession(this.key3);
    return this.authorName;
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
