import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { WorkArea } from '../../interfaces/work-area';
import { WorkPosition } from '../../interfaces/work-position';
import { AreaService } from '../../services/area.service';
import { AuthService } from '../../services/auth.service';
import { PositionService } from '../../services/position.service';
import { EditAreaPositionComponent } from '../edit-area-position/edit-area-position.component';
import { NewAreaPositionComponent } from '../new-area-position/new-area-position.component';
import { UnregisterRequest } from '../../interfaces/unregister-request';
import { UnregisterRequestService } from '../../services/unregister-request.service';
import { RegisterRequestService } from '../../services/register-request.service';
import { RegisterRequest } from '../../interfaces/register-request';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Messsage } from '../../interfaces/messsage';
import { NewRegisterRequestComponent } from '../new-register-request/new-register-request.component';
@Component({
  selector: 'app-formalities',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    DataViewModule,
    TableModule,
    CommonModule,
    NewAreaPositionComponent,
    EditAreaPositionComponent,
    ConfirmComponent,
    NewRegisterRequestComponent
  ],
  providers: [DialogService, MessageService],
  templateUrl: './formalities.component.html',
  styleUrl: './formalities.component.css'
})
export class FormalitiesComponent {
  constructor(public authService:AuthService,private unregisterRequestService:UnregisterRequestService,private registerRequestService:RegisterRequestService){
    
  }
  selectedButton=1
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<Messsage>();
  registerRequestList:Array<RegisterRequest>=[]
  unregisterRequestList:Array<UnregisterRequest>=[]
  subscripcion=new Subscription()
  newModalVisible={value:false}
  editModalVisible={value:false}
  ngOnInit(): void {
    this.loadData()
  }
  cerrar(): void {
    this.cerrarModal.emit();
   }
   showDialog() {
   this.loadData()
    this.visible = true;
   }
   changeNewModalVisibility() {
    this.newModalVisible.value=!this.newModalVisible.value
  }
  changeEditModalVisibility() {
   
    this.editModalVisible.value=!this.editModalVisible.value

  }
  changeButtonSelected(button:number){
    this.selectedButton=button
  }

  loadData(){
    this.registerRequestService.getAllRegisterRequestsOfCompany(this.authService.getCompany()).subscribe({
      next:(register:Array<RegisterRequest>)=>{
        this.registerRequestList=register
        this.unregisterRequestService.getAllUnregisterRequestsOfCompany(this.authService.getCompany()).subscribe({
          next:(unregister:Array<UnregisterRequest>)=>{
            this.unregisterRequestList=unregister
            console.log(this.unregisterRequestList)
            console.log(this.registerRequestList)
          },
          error:(error)=>{
          }
        })
      },
      error:(error)=>{
      }
    })
  }

  cancelar(request:RegisterRequest|UnregisterRequest){
    let aux=request.status
    request.status=-1
    if(this.selectedButton==1 && request){
      this.registerRequestService.updateRegisterRequest(request as RegisterRequest).subscribe({
          next:(data)=>{
            this.sendMessage.emit({ severity: 'success', summary: 'Cancelar solicitud', detail: 'Completado', life: 3000 });

          },error:(err)=>{
            this.sendMessage.emit({ severity: 'error', summary: 'Cancelar solicitud', detail: 'Cancelado', life: 3000 });
            request.status=aux
          }
      })
    }else{
      this.unregisterRequestService.updateUnregisterRequest(request as UnregisterRequest).subscribe({
        next:(data)=>{
          this.sendMessage.emit({ severity: 'success', summary: 'Cancelar solicitud', detail: 'Completado', life: 3000 });

        },error:(err)=>{
          this.sendMessage.emit({ severity: 'error', summary: 'Cancelar solicitud', detail: 'Cancelado', life: 3000 });
          request.status=aux

        }
    })
    }
  }
}
