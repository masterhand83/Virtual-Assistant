import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string = '';
  contra:string = '';
  recontra:string='';
  boton: boolean= true;
  constructor() { }
  ngOnInit() {
  }
  checkPasses(){
    if (this.contra != this.recontra || (this.contra.length <= 0&&this.recontra.length<=0)) {
      this.boton = true;
    }else{
      this.boton = false;
    }
  }
  login(){
    
  }
}
