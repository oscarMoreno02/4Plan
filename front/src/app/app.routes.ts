import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [

    {path: '', pathMatch: 'full', redirectTo: '/login'},
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'home',
        component:CabeceraComponent
    }
];
