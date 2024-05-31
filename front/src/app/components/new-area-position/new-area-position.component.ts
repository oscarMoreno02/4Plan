
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
  selector: 'app-new-area-position',
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
  templateUrl: './new-area-position.component.html',
  styleUrl: './new-area-position.component.css'
})
export class NewAreaPositionComponent {
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

 value=''
 subscription: Subscription=new Subscription;
 positionsList:Array<WorkPosition>=[]
 styleValidValue=''


 ngOnInit(): void {
  this.subscription=this.positionService.getAllWorkPositionsOfCompany(this.authService.getCompany()).subscribe({
    next:(data)=>{
      this.positionsList=data
      
    },
    error:(error=>{
      
    })
  })
 }
 showDialog() {
     this.visible = true;
 }

cerrar(): void {
  
    this.value=''
 this.cerrarModal.emit();
}
 crearArea(confirm:Boolean){
   if(confirm){
     if(this.validarCampos()){
      if(this.validarUnico()){

        let newWorkArea:WorkArea={idCompany:this.authService.getCompany(),description:this.value}
        this.messageService.add({ severity: 'info', summary: 'Crear Area', detail: 'En curso', life: 3000 });
        this.areaService.insertWorkArea(newWorkArea).subscribe({
       next: (u:any) => {
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'Crear Area', detail: 'Completado', life: 3000 });
               setTimeout(() => {
                newWorkArea.id=u.id
                this.areaList.push(newWorkArea)
              this.cerrar()
             }, 1); 
           }, 500); 
         
       },
       error: (err) => {
    
         this.messageService.add({ severity:'error', summary: 'Crear Area', detail: 'Cancelado', life: 3000 });
       }
     })
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Crear Area', detail: 'Descripción en uso', life: 3000 });

    }
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Crear Area', detail: 'Descripción incorrecta', life: 3000 });

    }
   
 }
 }
 crearPosicion(confirm:Boolean){
  if(confirm){
    if(this.validarCampos()){
      if(this.validarUnico()){

        let newWorkPosition:WorkPosition={idCompany:this.authService.getCompany(),description:this.value}
        this.messageService.add({ severity: 'info', summary: 'Crear Area', detail: 'En curso', life: 3000 });
     this.positionService.insertWorkPosition(newWorkPosition).subscribe({
      next: (u:any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Crear Posicion', detail: 'Completado', life: 3000 });
              setTimeout(() => {
                newWorkPosition.id=u.id
                this.positionList.push(newWorkPosition)
                this.cerrar()
            }, 1); 
          }, 500); 
      },
      error: (err) => {
   
        this.messageService.add({ severity:'error', summary: 'Crear Posicion', detail: 'Cancelado', life: 3000 });
      }
    })
  }else{
    this.messageService.add({ severity: 'warn', summary: 'Crear Posición', detail: 'Descripción en uso', life: 3000 });

  }
   }else{
   
    this.messageService.add({ severity: 'warn', summary: 'Crear Posición', detail: 'Descripción incorrecta', life: 3000 });

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
      if(position.description.split(' ').join('').toLowerCase()==this.value.split(' ').join('').toLowerCase()){
        return false
      }
    }
  }else{
    for (const area of this.areaList){
      if(area.description.split(' ').join('').toLowerCase()==this.value.split(' ').join('').toLowerCase()){
        return false
      }
    }
  }
  return true
 }
}
