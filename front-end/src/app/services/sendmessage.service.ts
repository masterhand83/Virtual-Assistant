import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SendmessageService {
  readonly IP = 'http://localhost:3000'
  readonly URL_API = this.IP+'/api/sendmessage/send';
  constructor(private http: HttpClient) { }

  sendMessage(message:string){

    return this.http.post(this.URL_API,{
      message:message
    });
   
  }
 

}