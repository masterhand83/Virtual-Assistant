import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ControlComponent } from './components/control/control.component';
//Rutas
import { Route, RouterModule, Router } from "@angular/router";
import { AppRoutingModule } from "./app.routes";
import { AlertsComponent } from './components/alerts/alerts.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';
import { AdmUsersComponent } from './components/adm-users/adm-users.component';
import { GanttComponent } from './components/gantt/gantt.component';
import { PdfComponent } from './components/pdf/pdf.component';
const routes: Route[] = [
  {
  path: 'control', component: ControlComponent
  },
  {
    path: '', component: LoginComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ControlComponent,
    AlertsComponent,
    MessagesComponent,
    ProjectsComponent,
    UsersComponent,
    AdmUsersComponent,
    GanttComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
