import { Component, OnInit,Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
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
    private chatService: ChatService) { 

  }

  ngOnInit() {
    this.chatService.joinProject(localStorage.getItem('ActualProject'));
    this.getsavedMessages();
    this.chatService.getMessages()
    .subscribe((message:string)=>{
      this.messages.push(message);
    })
    
  }
  sendMessage(){
    this.chatService.saveMessage(
    localStorage.getItem('ActualProject'),
    localStorage.getItem('Name')+': '+this.message,
    localStorage.getItem('Name')
    ).subscribe(res =>{
      console.log('REGISTRADO')
      this.chatService.sendMessage(localStorage.getItem('Name')+': '+this.message,localStorage.getItem('ActualProject'));
      this.message = '';
    })
    
  }
  getsavedMessages(){
    this.chatService.getSavedMessages(localStorage.getItem('ActualProject')).subscribe((res:any[]) =>{
      for (const msg of res) {
        this.messages.push(`${msg.message}`);
      }
    })
  }
}
