import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ControlComponent } from './components/control/control.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//Rutas
import { AppRoutingModule } from "./app.routes";
import { AlertsComponent } from './components/alerts/alerts.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';
import { AdmUsersComponent } from './components/adm-users/adm-users.component';
import { GanttComponent } from './components/gantt/gantt.component';

//¿?
import { FormsModule } from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from "./components/chat/chat.component";
//lib
import { CookieService } from "ngx-cookie-service";
import { ChatService } from './services/chat.service';

//Maps
import {AgmCoreModule} from '@agm/core';

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
    HomeComponent,
    NavbarComponent,
    ChatComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAujVbRi-7jyqu3-K_RIfR8iwLWeqQlbDY'
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
