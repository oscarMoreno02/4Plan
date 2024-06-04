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
  constructor(public authService:AuthService,private assigmentService:AssignmentService,private messageService:MessageService,private userService:UserService){
  }
  selectedButton=1
  assigmentsList:Array<Assignment>=[]
  subscripcion=new Subscription()
  adminAccess=false
  accessTypes=['owner','manager']
  ngOnInit(): void {
    this.adminAccess=this.accessTypes.includes(this.authService.getAccess())

    this.getData()
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
    if(b){

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
  }
  aceptar(b: Boolean,assigment:Assignment) {

    if(b){

      assigment.idUser=this.authService.getUid()
      this.assigmentService.updateAssignment(assigment).subscribe({
        next: (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Aceptar Vacante', detail: 'Completado', life: 3000 });
          this.getData()
         
        },
        error: (err) => {
        }
      })
    }
  }

  showMessage(message:any){
    this.messageService.add(message)
  }

  comprobarCompatibilidad(userAssignment:Array<Assignment>,newAssignment:Assignment): boolean {
    let valido = true;
    if (userAssignment.length>0) {
      
     

      for (const assignment of userAssignment) {
        if ((newAssignment.start >= assignment.start && newAssignment.start < assignment.end) ||
          (newAssignment.end > assignment.start && newAssignment.end <= assignment.end) ||
          (newAssignment.start <= assignment.start && newAssignment.end >= assignment.end)||
          assignment.type!=0
          ) {
          valido = false;
          break;
        }
       
      }
    }
    return valido;
  }
  getData(){

    this.subscripcion=this.assigmentService.getAllFreeAssignmentsOfCompany(this.authService.getCompany()).subscribe({
      next:(data:Array<Assignment>)=>{
        if(this.adminAccess){
          
          this.assigmentsList=data  

        }else{
          let auxList:Assignment[]=[]
          for(const assignment of data){
            this.userService.getUserWithAssignments(this.authService.getUid(),assignment.idWorkDay).subscribe({
              next:(user:User)=>{
                if(user.assignments){
                  if(this.comprobarCompatibilidad(user.assignments,assignment)){
                    auxList.push(assignment)
                  }
                }else{
                  auxList.push(assignment)
                }
              }
            })
          }
          this.assigmentsList=auxList
        }
        
      },
      
    })
  }
}


