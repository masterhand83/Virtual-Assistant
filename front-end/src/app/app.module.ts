import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ControlComponent } from './components/control/control.component';
//Rutas
import { AppRoutingModule } from "./app.routes";
import { AlertsComponent } from './components/alerts/alerts.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';
import { AdmUsersComponent } from './components/adm-users/adm-users.component';
import { GanttComponent } from './components/gantt/gantt.component';
import { PdfComponent } from './components/pdf/pdf.component';
//¿?
import { FormsModule } from "@angular/forms";

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
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
