import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { LoginComponent } from './components/login/login.component';
import { WorkParametersComponent } from './components/work-parameters/work-parameters.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

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
    },
    {
        path:'employees',
        component:EmployeeListComponent
    }
];
