import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { consts } from "./constants.data";
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = `http://${consts.IP}:3000`
  private socket;
  expreg = /^[^<>(){};,]*$/;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }
  public sendMessage(message,project){
    this.socket.emit('new-message',{msg:message,room:project});
  }
  public joinProject(projectID:string){
    this.socket.emit('join-project',projectID);
  }
  public saveMessage(projectID:string, msg:string,author:string){
    if(this.expreg.test(msg)){
      return this.http.post(this.url+'/api/projects/message/'+projectID,{
        authorName:author,
        message:msg
      })
    }
    else{
      alert('Se han bloqueado algunos caracteres por cuestiones de seguridad.');
    }
   
  }
  public getSavedMessages(projectID:string){
    return this.http.get(this.url+'/api/projects/message/'+projectID)
  }
  public getMessages = ()=>{
    return new Observable(observer =>{
      const {next, error} = observer;
      this.socket.on('new-message',message =>{
        observer.next(message);
      })
    })
  }
}
