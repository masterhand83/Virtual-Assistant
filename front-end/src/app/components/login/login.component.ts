import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
  email: string = '';
  contra: string = '';
  recontra: string = '';
  boton: boolean = true;
  constructor(private userManager: UsersService, private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('UserID') != null) {
      this.router.navigate(['control']);
    }
  }
  checkPasses() {
    if (this.contra != this.recontra || (this.contra.length <= 0 && this.recontra.length <= 0)
      || (this.email.length <= 0) || (this.email === '')) {
      this.boton = true;
    } else {
      this.boton = false;
    }
  }
  login(form: NgForm) {
    console.log(form.value);
    this.userManager.loginUser(form.value.email, form.value.contra)
      .subscribe(res => {
        let power: any = [];
        power = res;
        if (power.length > 0) {
          console.log('USUARIO EXISTENTE');
          console.log(res[0]);
          localStorage.setItem('UserID',res[0]._id);
          console.log('cookie',localStorage.getItem('UserID'));
          this.router.navigate(['control']);
        } else {
          console.log('USUARIO NO EXISTENTE');
        }
      });

  }
}
