import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { LoginComponent } from './components/login/login.component';
import { WorkParametersComponent } from './components/work-parameters/work-parameters.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ShiftWorkdaysListComponent } from './components/shift-workdays-list/shift-workdays-list.component';
import { ShiftsDateComponent } from './components/shifts-date/shifts-date.component';
import { FreeAssignmentsComponent } from './components/free-assignments/free-assignments.component';
import { StaffRequestsComponent } from './components/staff-requests/staff-requests.component';
import { HomeComponent } from './components/home/home.component';
import { StaffWeekAssignmentsComponent } from './components/staff-week-assignments/staff-week-assignments.component';

export const routes: Routes = [

    {path: '', pathMatch: 'full', redirectTo: '/login'},
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'home',
        component:HomeComponent
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
    },
    {
        path:'assignments/free',
        component:FreeAssignmentsComponent
    },
    {
        path:'assignments/week',
        component:StaffWeekAssignmentsComponent
    },
   
    {
        path:'requests',
        component:StaffRequestsComponent
    }
];
