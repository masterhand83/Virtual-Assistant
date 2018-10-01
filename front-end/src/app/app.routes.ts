import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {LoginComponent} from '../app/components/login/login.component';
import {ControlComponent} from '../app/components/control/control.component';

const routes: Routes=[  
    {path: 'control', component: ControlComponent},
   
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}