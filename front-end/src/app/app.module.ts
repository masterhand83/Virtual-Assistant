import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ControlComponent } from './components/control/control.component';
//Rutas
import { Route, RouterModule, Router } from "@angular/router";
import { AppRoutingModule } from "./app.routes";
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
    ControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
