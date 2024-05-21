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
import { Assignment } from '../../interfaces/assignment';
import { AssignmentService } from '../../services/assignment.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NewFreeAssignmentComponent } from '../new-free-assignment/new-free-assignment.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-free-assignments',
  standalone: true,
  imports: [CabeceraComponent,TableModule,ButtonModule,CommonModule,ListAreasPositionsComponent,ConfirmComponent,NewFreeAssignmentComponent,ToastModule],
  encapsulation:ViewEncapsulation.None,
  providers:[MessageService],
  templateUrl: './free-assignments.component.html',
  styleUrl: './free-assignments.component.css'
})
export class FreeAssignmentsComponent {
  constructor(public authService:AuthService,private assigmentService:AssignmentService,private messageService:MessageService){
  }
  selectedButton=1
  assigmentsList:Array<Assignment>=[]
  subscripcion=new Subscription()
  adminAccess=false
  accessTypes=['owner','manager']
  ngOnInit(): void {
    this.adminAccess=this.accessTypes.includes(this.authService.getAccess())
    console.log(this.adminAccess)
    console.log(this.authService.getAccess())
    this.subscripcion=this.assigmentService.getAllFreeAssignmentsOfCompany(this.authService.getCompany()).subscribe({
      next:(data:Array<Assignment>)=>{
        this.assigmentsList=data  
        console.log(this.assigmentsList)
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
  eliminar(b: Boolean,assigment:Assignment) {
    this.assigmentService.deleteAssignment(assigment.id!).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Eliminar Vacante', detail: 'Completado', life: 3000 });

        setTimeout(() => {
         this.assigmentsList=this.assigmentsList.filter((a=>a.id!=assigment.id))
        }, 1);
      },
      error: (err) => {
      }
    })
  }
  aceptar(b: Boolean,assigment:Assignment) {
    assigment.idUser=this.authService.getUid()
    this.assigmentService.updateAssignment(assigment).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Aceptar Vacante', detail: 'Completado', life: 3000 });

        setTimeout(() => {
         this.assigmentsList=this.assigmentsList.filter((a=>a.id!=assigment.id))
        }, 1);
      },
      error: (err) => {
      }
    })
  }

  showMessage(message:any){
    this.messageService.add(message)
  }
}


