import { Component, OnInit,Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { SessionService } from '../../services/session.service';
import { Router, NavigationStart } from '@angular/router';

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
    this.message,
    this.sess.getFromSession('Name')
    

    
   
    ).subscribe(res =>{
      console.log('REGISTRADO')
      this.chatService.sendMessage(this.sess.getFromSession('Name')+': '+this.message,this.sess.getFromSession('ActualProject'));
      this.message = '';
    })
    
  }
  getsavedMessages(){
    this.chatService.getSavedMessages(this.sess.getFromSession('ActualProject'),).subscribe((res:any[]) =>{
      for (const msg of res) {
        this.messages.push(`${msg.message}`);
      }
    })
  }
}
