import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
  /*email: string = '';
  contra: string = '';
  recontra: string = '';
  boton: boolean = true; */
  constructor(private userManager: UsersService, private router: Router, private sess: SessionService,
  private crypto:CryptoService) { 

  }
  ngOnInit() {
    
    
  }
  /*-
  checkPasses() {
    console.log('CHECKPASSES()')
    console.log(this.contra,"==?",this.recontra);
    if ((this.contra.length <= 0 && this.recontra.length <= 0)||(this.email.length <= 0) || (this.email === '')) {
      console.log('vacio');
      this.boton = true;
    }
    else if(this.contra !== this.recontra){
      console.log('incorrecto');
      this.boton = true;
    }else{
      console.log('correcto',this.contra,"==",this.recontra)
      this.boton = false;
    }
  }
  */
  login(form: NgForm) {

        
    //console.log(form.value);
    this.userManager.loginUser(form.value.email, form.value.contra)
      .subscribe(res => {
        let power: any = [];
        power = res;
        var estring:string;
        var userData;
        estring=this.crypto.cryptoDecrypt(res[0]);
        
       

        if (power.length > 0) {
          this.sess.createSession(estring);
          
          this.router.navigate(['control']);
          console.log('creado:')
        } else {
          alert('USUARIO NO EXISTENTE');
          form.reset();
        }
      });

  }
}
