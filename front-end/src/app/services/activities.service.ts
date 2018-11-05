import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  
  readonly URL_API = 'http://localhost:3000/api/activities/activity';
  readonly URL_API2 = 'http://localhost:3000/api/activities/comment';
  
  
  constructor(private http: HttpClient) {
    
  }

  deleteActivity(_id:string){
    return this.http.delete(this.URL_API +`/${_id}`);
  }

  addComment(_id:string,authorName:string,comment:string,date:Date){
    return this.http.post(this.URL_API2 +`/${_id}`,{
      _id:_id,
      authorName:authorName,
      comment:comment,
      date:date
    });
  }

  getComments(_id:string){
    return this.http.get(this.URL_API2 +`/${_id}`);
  }



}
