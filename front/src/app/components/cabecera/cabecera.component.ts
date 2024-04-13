import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css',
  encapsulation:ViewEncapsulation.None
})
export class CabeceraComponent {
  items: MenuItem[] | undefined;

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
  }
}
