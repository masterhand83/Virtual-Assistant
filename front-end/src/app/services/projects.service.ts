import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Project} from '../models/Project';
import {User} from '../models/User';
import { NgForm } from '../../../node_modules/@angular/forms';
import { TouchSequence } from '../../../node_modules/@types/selenium-webdriver';
import { Alert } from '../models/Alert';
import {Message}from '../models/Message';
import { formArrayNameProvider } from '../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_name';
import { consts } from "./constants.data";
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  readonly IP = `http://${consts.IP}:3000`

  readonly URL_API = this.IP+'/api/projects/project';
  readonly URL_API2= this.IP+'/api/users/project';
  readonly URL_API3 = this.IP+'/api/projects/user';
  readonly URL_API4 = this.IP+'/api/projects/resident';
  readonly URL_API5= this.IP+'/api/projects/designer';
  readonly URL_API6= this.IP+'/api/projects/activity';
  readonly URL_API7= this.IP+'/api/projects/alert';
  readonly URL_API8= this.IP+'/api/alerts/alert';
  readonly URL_API9= this.IP+'/api/projects/10messages';

  project:Project[];
  project2:Project[];
  usersincharge:User[];
  messages:Message[];

  alerts:Alert[];

  expreg = /^[^<>(){};,]*$/;
  
  constructor(private http: HttpClient) {
    
  }

  createProject(name:string,description:string,idUser1:string,idUser2:string,idUser3:string){

    if(this.expreg.test(name) && this.expreg.test(description)){
      return this.http.post(this.URL_API,{
        name:name,
        description:description,
        idUser1:idUser1,
        idUser2:idUser2,
        idUser3:idUser3
      });
    }
    else{
      alert('Se han bloqueado algunos caracteres por cuestiones de seguridad.');
    }


   

  }

  getProjects(){
    return this.http.get(this.URL_API);
  }
  getProjectsRP(_id:string){
    return this.http.get(this.URL_API2+`/${_id}`);
  }

  getUsersInCharge(_id:string){
    return this.http.get(this.URL_API3+`/${_id}`)
  }

  putInformation(_id:string, name:string, description:string,storeName: string,
  storeNumber: number,m2: number,location: string,localReception: Date,furnitureDate: Date,openingDate:Date){

    if(this.expreg.test(name) && this.expreg.test(description) &&
    this.expreg.test(storeName) && this.expreg.test(location) ){
      return this.http.put(this.URL_API + `/${_id}`,{
        _id:_id,
        name:name,
        description:description,
        storeName:storeName,
        storeNumber:storeNumber,
        m2:m2,
        location:location,
        localReception:localReception,
        furnitureDate:furnitureDate,
        openingDate:openingDate,
        }
       
      );
    }
    else{
      alert('Se han bloqueado algunos caracteres por cuestiones de seguridad.');
    }


    
    
  }

  deleteProject(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  
  changeResident(_id:string,idNewUser:string){

    return this.http.put(this.URL_API4 + `/${_id}`,{
      _id:_id,
      idNewResident:idNewUser,

    });
    
  }
  changeDesigner(_id:string,idNewUser:string){

    return this.http.put(this.URL_API5 + `/${_id}`,{
      _id:_id,
      idNewDesigner:idNewUser,

    });
    
  }

  addActivityToProject(_id:string,name:string,description:string,start:Date,end:Date,
  priority:Number){

    if(this.expreg.test(name) && this.expreg.test(description) ){
      return this.http.put(this.URL_API6 + `/${_id}`,{
        name: name,
        description:description,
        start:start,
        end: end,
        priority: priority
       
      });
    }
    else{
      alert('Se han bloqueado algunos caracteres por cuestiones de seguridad.');
    }
    
  }

  activateProjectAlerts(_id:string,activated:boolean){
    return this.http.put(this.URL_API7 + `/${_id}`,{
      _id:_id,
      activated:activated
    });
  }

  getActivitiesProject(_id:string){
    return this.http.get(this.URL_API6 + `/${_id}`);
  }

  getAlertsProject(_id:string){
    return this.http.get(this.URL_API7+ `/${_id}`);
  }

  deleteAlert(_id:string){
    return this.http.delete(this.URL_API8+ `/${_id}`);
  } 

  addAlert(_id:string,name:string,description:string){
    return this.http.post(this.URL_API7 +`/${_id}`,{ 
      name:name,
      description:description
    });
  }

  get10Messages(_id:string){
    return this.http.get(this.URL_API9 +`/${_id}`);
  }

  

}
