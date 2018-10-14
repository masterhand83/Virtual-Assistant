import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {LoginComponent} from '../app/components/login/login.component';
import {ControlComponent} from '../app/components/control/control.component';
import {ProjectsComponent} from '../app/components/projects/projects.component';
import {UsersComponent} from '../app/components/users/users.component';
import {AdmUsersComponent} from '../app/components/adm-users/adm-users.component';
import{GanttComponent} from '../app/components/gantt/gantt.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes=[  
    {path: 'control', component: ControlComponent},
    {path: '',component:LoginComponent},
    {path: 'projects',component:ProjectsComponent},
    {path: 'users',component:UsersComponent},
    {path: 'adm-users/:id',component:AdmUsersComponent},
    {path: 'gantt',component:GanttComponent},
    {path:'home',component:HomeComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}