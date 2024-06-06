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

import { ConfirmComponent } from '../confirm/confirm.component';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StaffRequest } from '../../interfaces/staff-request';
import { StaffRequestService } from '../../services/staff-request.service';
import { DialogModule } from 'primeng/dialog';
import { NewStaffRequestComponent } from '../new-staff-request/new-staff-request.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-staff-requests',
  standalone: true,
  imports: [CabeceraComponent,TableModule,ButtonModule,CommonModule,ListAreasPositionsComponent,ConfirmComponent,ToastModule,DialogModule,NewStaffRequestComponent],
  encapsulation:ViewEncapsulation.None,
  providers:[MessageService,DialogService],
  templateUrl: './staff-requests.component.html',
  styleUrl: './staff-requests.component.css'
})
export class StaffRequestsComponent {
  constructor(public authService:AuthService,private requestService:StaffRequestService,private messageService:MessageService){
  }
  selectedButton=1
  requestList:Array<StaffRequest>=[]
  subscripcion=new Subscription()
  adminAccess=false
  accessTypes=['owner','manager']
  visible=false
  requestSelected!:StaffRequest
  ngOnInit(): void {
    this.adminAccess=this.accessTypes.includes(this.authService.getAccess())


    if(this.adminAccess){

      this.subscripcion=this.requestService.getAllStaffRequestsOfCompany(this.authService.getCompany()).subscribe({
        next:(data:Array<StaffRequest>)=>{
          this.requestList=data  
          
        },
        
      })
    }else{
      this.subscripcion=this.requestService.getAllStaffRequestsByUser(this.authService.getUid()).subscribe({
        next:(data:Array<StaffRequest>)=>{
          this.requestList=data  
        },
        
      })
    }
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
  eliminar(confirm: Boolean,request:StaffRequest) {
    if(confirm){
    
      this.requestService.deleteStaffRequest(request.id!).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Eliminar Solicitud', detail: 'Completado', life: 3000 });

        setTimeout(() => {
         this.requestList=this.requestList.filter((a=>a.id!=request.id))
        }, 1);
      },
      error: (err) => {
      }
    })
    }
  }
  actualizar(confirm:boolean,result: Boolean) {

    if(confirm){
      if(result){

        this.requestSelected.status=1
        this.requestService.acceptStaffRequest(this.requestSelected).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary:  'Actualizar Estado de Solicitud', detail: 'Completado', life: 3000 });
            
        setTimeout(() => {
          this.visible=false
        }, 1);
      },
      error: (err) => {
      }
    })
  }else{
    this.requestSelected.status=-1
        this.requestService.updateStaffRequest(this.requestSelected).subscribe({
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary:  'Actualizar Estado de Solicitud', detail: 'Completado', life: 3000 });
            
        setTimeout(() => {
          this.visible=false

        }, 1);
      },
      error: (err) => {
      }
    })
  }
  }
  }

  showMessage(message:any){
    this.messageService.add(message)
  }

  translateType(type:number){
    return type==1? 'Dia libre' : 'Vacaciones'
  }
  translateStatus(type:number){

    switch(type){
      case(0):{return 'Pendiente'}
      break
      case(1):{return 'Aceptada'}
      break
      case(-1):{return 'Denegada'}
      default: return ''
    }
  }
  showDialog(request:StaffRequest){
    this.requestSelected=request
    this.visible=true
  }
  cerrar(){
    this.visible=false
  }
}
