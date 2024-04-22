import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { TableModule } from 'primeng/table';
import { Button, ButtonModule } from 'primeng/button';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CabeceraComponent,TableModule,ButtonModule],

  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(public authService:AuthService,private userService:UserService){
    console.log(this.authService.getCompany())
  }
  
  usersList:Array<User>=[]
  subscripcion=new Subscription()
  
  ngOnInit(): void {
    this.subscripcion=this.userService.getAllUsersOfCompany(this.authService.getCompany()).subscribe({
      next:(data:Array<User>)=>{
        this.usersList=data
        console.log(this.usersList)
  
      },
      
    })
  }
  translateAccess(access:String):string{
    let translate=''
    switch(access){
      case 'owner': translate='Gerente'
      break
      
      case'manager': translate='Encargado'
      break
      
      default:translate='Empleado'
      
        }
        return translate
  }
}
