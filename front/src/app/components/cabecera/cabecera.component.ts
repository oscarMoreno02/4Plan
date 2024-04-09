import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Inicio',
              icon: 'pi pi-fw pi-file',
          },
          {
              label: 'Turno',
              icon: 'pi pi-fw pi-pencil'
          },
          {
              label: 'Turno',
              icon: 'pi pi-fw pi-user',
          },
          {
              label: 'Peticiones',
              icon: 'pi pi-fw pi-calendar',
          },
          {
              label: 'Vacaciones',
              icon: 'pi pi-fw pi-power-off'
          }
      ];
  }
}
