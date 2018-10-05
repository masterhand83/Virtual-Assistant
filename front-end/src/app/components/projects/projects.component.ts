import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private sess:SessionService) { }

  ngOnInit() {
    this.sess.validateSession();
  }
  loggout(){
    this.sess.deleteSession();
  }

}
