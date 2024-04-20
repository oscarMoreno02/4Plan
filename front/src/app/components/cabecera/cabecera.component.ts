import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';
import { ProfileIconComponent } from '../profile-icon/profile-icon.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [MenubarModule, ProfileIconComponent],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CabeceraComponent {
  items: MenuItem[] | undefined;
  adminItems: MenuItem[] | undefined;
  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.router.navigate(['/home'])
        }
      },
      {
        label: 'Turnos',
        icon: 'pi pi-fw pi-calendar',
        command: () => {
          this.router.navigate(['/shifts'])
        }
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
    if (this.authService.hasRol(['owner'])) {
      this.items.push(
        {
          label: 'Plantilla', icon: 'pi pi-fw pi-users',
          command: () => {
            this.router.navigate(['/parameters'])
          }
        }

        , {
          label: 'Parametros', icon: 'pi pi-fw pi-sliders-h'
          , command: () => {
            this.router.navigate(['/parameters'])
          }
        }

      )
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
