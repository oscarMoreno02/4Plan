import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { LoginComponent } from './components/login/login.component';
import { WorkParametersComponent } from './components/work-parameters/work-parameters.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ShiftWorkdaysListComponent } from './components/shift-workdays-list/shift-workdays-list.component';
import { ShiftsDateComponent } from './components/shifts-date/shifts-date.component';

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
    },
    {
        path:'shifts',
        component:ShiftWorkdaysListComponent
    },
    {
        path:'shifts/:date',
        component:ShiftsDateComponent
    }
];
