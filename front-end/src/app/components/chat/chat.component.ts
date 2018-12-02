import { Component, OnInit,Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { SessionService } from '../../services/session.service';
import { Router, NavigationStart } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  message: string;
  messages: string[] = [];
  constructor(
    private chatService: ChatService, private sess:SessionService) { 

  }

  ngOnInit() {
    this.chatService.joinProject(this.sess.getFromSession('ActualProject'));
    this.getsavedMessages();
    this.chatService.getMessages()
    .subscribe((message:string)=>{
      this.messages.push(message);
    })
    
  }
  sendMessage(){
    this.chatService.saveMessage(
    
    this.sess.getFromSession('ActualProject'),
    isNullOrUndefined(this.message)? '...mensaje vacio...':this.message,
    this.sess.getFromSession('Name')
    ).subscribe(res =>{
      let name = this.sess.getFromSession('Name');
      let message = this.message;
      if (message == '' || isNullOrUndefined(message)) {
        message = '...mensaje vacio...'
      }
      console.debug('REGISTRADO//',name,':',message)
      this.chatService.sendMessage(`${name}:${message}`,this.sess.getFromSession('ActualProject'));
      this.message = '';
    })
    
  }
  getsavedMessages(){
    this.chatService.getSavedMessages(this.sess.getFromSession('ActualProject')).subscribe((res:any[]) =>{
      for (const msg of res) {
        this.messages.push(`${msg.authorName}:${msg.message}`);
      }
    })
  }
}
