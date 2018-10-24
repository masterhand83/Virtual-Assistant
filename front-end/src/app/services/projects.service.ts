import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  readonly IP = "localhost";
  readonly URL_API = 'http://localhost:3000/api/projects/project';

  
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
}
