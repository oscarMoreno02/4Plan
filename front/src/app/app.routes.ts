import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { LoginComponent } from './components/login/login.component';
import { WorkParametersComponent } from './components/work-parameters/work-parameters.component';

export const routes: Routes = [

    {path: '', pathMatch: 'full', redirectTo: '/login'},
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'home',
        component:CabeceraComponent
    },
    {
        path:'parameters',
        component:WorkParametersComponent
    }
];
