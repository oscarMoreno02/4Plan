import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { TableModule } from 'primeng/table';
import { Button, ButtonModule } from 'primeng/button';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ListAreasPositionsComponent } from '../list-areas-positions/list-areas-positions.component';
import { FormalitiesComponent } from '../formalities/formalities.component';
import { Message, MessageService } from 'primeng/api';
import { Messsage } from '../../interfaces/messsage';
import { ToastModule } from 'primeng/toast';
import { EditEmpoyeeComponent } from '../edit-empoyee/edit-empoyee.component';



@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CabeceraComponent,TableModule,ButtonModule,CommonModule,ListAreasPositionsComponent,FormalitiesComponent,ToastModule,EditEmpoyeeComponent],
  providers:[MessageService],
encapsulation:ViewEncapsulation.None,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(public authService:AuthService,private userService:UserService,private messageService: MessageService){
  }
  selectedButton=1
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
  changeButtonSelected(button:number){
    this.selectedButton=button
  }

  showMessage(message:Messsage){
    this.messageService.add(message)
  }
}
