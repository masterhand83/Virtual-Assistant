import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Project} from '../models/Project';
import {User} from '../models/User';
import { NgForm } from '../../../node_modules/@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  readonly IP = "localhost";
  readonly URL_API = 'http://localhost:3000/api/projects/project';
  readonly URL_API2= 'http://localhost:3000/api/users/project';
  readonly URL_API3 = 'http://localhost:3000/api/projects/user';

  project:Project[];
  usersincharge:User[];
  
  constructor(private http: HttpClient) {
    
  }

  createProject(name:string,description:string,idUser1:string,idUser2:string,idUser3:string){

    return this.http.post(this.URL_API,{
      name:name,
      description:description,
      idUser1:idUser1,
      idUser2:idUser2,
      idUser3:idUser3
    });

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

  deleteProject(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
