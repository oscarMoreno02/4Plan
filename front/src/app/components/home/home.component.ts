import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { AuthService } from '../../services/auth.service';
import { StaffHomeComponent } from '../staff-home/staff-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CabeceraComponent,StaffHomeComponent],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
constructor(private authService:AuthService ){}
adminAccessList=['manager','owner']
admin=false
ngOnInit(): void {
  let access=this.authService.getAccess()
  this.admin=this.adminAccessList.includes(access)?true:false
}
}
