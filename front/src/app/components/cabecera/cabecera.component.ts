import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';
import { ProfileIconComponent } from '../profile-icon/profile-icon.component';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [MenubarModule,ProfileIconComponent],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css',
  encapsulation:ViewEncapsulation.None
})
export class CabeceraComponent {
  items: MenuItem[] | undefined;
  adminItems: MenuItem[] | undefined;
constructor(public authService:AuthService){}
  ngOnInit() {
      this.items = [
          {
              label: 'Inicio',
              icon: 'pi pi-fw pi-home',

          },
          {
              label: 'Turnos',
              icon: 'pi pi-fw pi-calendar'
          },
          {
              label: 'Peticiones',
              icon: 'pi pi-fw pi-book',
          },
          {
              label: 'Vacantes',
              icon: 'pi pi-fw pi-search'
          }
      ];
      if(this.authService.hasRol(['owner'])){
        this.items.push({label:'Plantilla',icon:'pi pi-fw pi-users'},{label:'Parametros',icon:'pi pi-fw pi-sliders-h'})
      }
      this.adminItems = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',

        },
        {
            label: 'Empresas',
            icon: 'pi pi-fw pi-building'
        },
        {
            label: 'Solicitudes',
            icon: 'pi pi-fw pi-book',
        },
        {
            label: 'Incidencias',
            icon: 'pi pi-fw pi-exclamation-triangle'
        }
    ];
   
  }
}
