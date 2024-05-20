
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { WorkDirective } from '../../interfaces/directives';
import { WorkArea } from '../../interfaces/work-area';
import { WorkPosition } from '../../interfaces/work-position';
import { AreaService } from '../../services/area.service';
import { AuthService } from '../../services/auth.service';
import { PositionService } from '../../services/position.service';
import { ConfirmComponent } from '../confirm/confirm.component';
@Component({
  selector: 'app-edit-area-position',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    ConfirmComponent,
    DropdownModule,
    InputNumberModule,
    SliderModule
  
  ],
  
  providers: [DialogService, MessageService],
  templateUrl: './edit-area-position.component.html',
  styleUrl: './edit-area-position.component.css'
})
export class EditAreaPositionComponent {
  constructor(
    public messageService: MessageService,
    private areaService: AreaService,
    public authService:AuthService,
    private positionService:PositionService
    ) {}

 @Input() visible: boolean = false;
 @Input() tipo=0
 @Output() cerrarModal = new EventEmitter<void>();
 @Input() typeElement : number=1
 @Input() areaList:Array<WorkArea>=[]
 @Input() positionList:Array<WorkPosition>=[]
 @Input() element!:WorkArea | WorkPosition
 @Output() updateAreaList = new EventEmitter<WorkArea[]>();
 @Output() updatePositionList = new EventEmitter<WorkPosition[]>();
 value=''
 subscription: Subscription=new Subscription;
 positionsList:Array<WorkPosition>=[]

 styleValidValue=''


 ngOnInit(): void {

 }
 showDialog(element:WorkArea | WorkPosition) {
    this.element=element
    this.value=this.element.description
    this.visible = true;
 }

cerrar(): void {
  this.visible=false
 this.value=''
 this.cerrarModal.emit();
}
 modificarArea(confirm:Boolean){
   if(confirm){
     if(this.validarCampos()){
      if(this.validarUnico()){

        let newWorkArea:WorkArea={id:this.element.id,idCompany:this.authService.getCompany(),description:this.value}
        this.messageService.add({ severity: 'info', summary: 'Modificar Area', detail: 'En curso', life: 3000 });
        this.areaService.updateWorkArea(newWorkArea).subscribe({
       next: (u:any) => {
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'Modificar Area', detail: 'Completado', life: 3000 });
               setTimeout(() => {
            
                this.element.description=this.value
              this.cerrar()
             }, 1); 
           }, 1000); 
         
       },
       error: (err) => {
    
         this.messageService.add({ severity:'error', summary: 'Modificar Area', detail: 'Cancelado', life: 3000 });
       }
     })
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Modificar Area', detail: 'Descripción en uso', life: 3000 });

    }
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Modificar Area', detail: 'Descripción incorrecta', life: 3000 });

    }
   
 }
 }
 modificarPosicion(confirm:Boolean){
  if(confirm){
    if(this.validarCampos()){
      if(this.validarUnico()){

        let newWorkPosition:WorkPosition={id:this.element.id,idCompany:this.authService.getCompany(),description:this.value}
        this.messageService.add({ severity: 'info', summary: 'Modificar Area', detail: 'En curso', life: 3000 });
     this.positionService.updateWorkPosition(newWorkPosition).subscribe({
      next: (u:any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Modificar Posicion', detail: 'Completado', life: 3000 });
              setTimeout(() => {
        
                this.element.description=this.value
                this.cerrar()
            }, 1); 
          }, 2000); 
      },
      error: (err) => {
   
        this.messageService.add({ severity:'error', summary: 'Modificar Posicion', detail: 'Cancelado', life: 3000 });
      }
    })
  }else{
    this.messageService.add({ severity: 'warn', summary: 'Modificar Posición', detail: 'Descripción en uso', life: 3000 });

  }
   }else{
   
    this.messageService.add({ severity: 'warn', summary: 'Modificar Posición', detail: 'Descripción incorrecta', life: 3000 });

   }
  
}
}
 validarCampos():Boolean{
    let valido = true
   if(this.value.split(' ').join('').length <= 0){
     this.styleValidValue='ng-invalid ng-dirty'
     valido=false
   }else{
     this.styleValidValue=''

    }
     return valido
 }
 validarUnico():boolean{
  if(this.typeElement==1){
    for (const position of this.positionList){
      if(position.description.split(' ').join('').toLowerCase()==this.value.split(' ').join('').toLowerCase() && this.element.id!=position.id){
        return false
      }
    }
  }else{
    for (const area of this.areaList){
      if(area.description.split(' ').join('').toLowerCase()==this.value.split(' ').join('').toLowerCase()&& this.element.id!=area.id){
        return false
      }
    }
  }
  return true
 }

 eliminarArea(b: Boolean) {
  this.messageService.add({ severity: 'info', summary: 'Eliminar Directiva', detail: 'En curso', life: 3000 });
  this.areaService.deleteWorkArea(this.element.id!).subscribe({
    next: (data: any) => {
      setTimeout(() => {
        this.visible = false
        this.messageService.add({ severity: 'success', summary: 'Eliminar Area', detail: 'Completado', life: 3000 });
        setTimeout(() => {
          let newList = this.areaList.filter((area) => area.id != this.element.id);
          this.areaList = newList;
          this.updateAreaList.emit(this.areaList); 
        }, 1000);
      }, 1000);
    },
    error: (err) => {
      this.messageService.add({ severity: 'error', summary: 'Eliminar Area', detail: 'Cancelado', life: 3000 });
    }
  })
}

eliminarPosicion(b: Boolean) {
  this.messageService.add({ severity: 'info', summary: 'Eliminar Directiva', detail: 'En curso', life: 3000 });
  this.positionService.deleteWorkPosition(this.element.id!).subscribe({
    next: (data: any) => {
      this.positionList = this.positionList.filter((position) => position.id != this.element.id);
      setTimeout(() => {
        this.messageService.add({ severity: 'success', summary: 'Eliminar Posición', detail: 'Completado', life: 3000 });
        setTimeout(() => {
          this.visible = false;
          this.updatePositionList.emit(this.positionList); 
        }, 1);
      }, 1000);
    },
    error: (err) => {
      this.messageService.add({ severity: 'error', summary: 'Eliminar Posición', detail: 'Cancelado', life: 3000 });
    }
  })
}
}
