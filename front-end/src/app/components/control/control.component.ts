import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if (localStorage.getItem('UserID') == null) {
      this.router.navigate(['']);
    }
  }
  loggout(){
    localStorage.removeItem('UserID');
    this.router.navigate(['']);
  }
}
