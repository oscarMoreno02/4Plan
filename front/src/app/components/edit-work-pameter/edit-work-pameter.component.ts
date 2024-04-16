import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { WorkParameter } from '../../interfaces/work-parameter';
import { TimeZone } from '../../interfaces/time-zone';
import { Subscription } from 'rxjs';
import { WorkParametersService } from '../../services/work-parameters.service';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-work-pameter',
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
    InputNumberModule
  ],
  providers: [DialogService, MessageService],
  templateUrl: './edit-work-pameter.component.html',
  styleUrl: './edit-work-pameter.component.css'
})
export class EditWorkPameterComponent {
  constructor(
    public messageService: MessageService,
    private workParameterService: WorkParametersService,
    public authService:AuthService,
    private timeZoneService:TimeZoneService
    ) {}

 @Input() visible: boolean = false;
 @Input() tipo=0
 @Output() cerrarModal = new EventEmitter<void>();
 @Input()editParameter:WorkParameter={expectedVolume:0,idCompany:this.authService.getCompany(),idTimeZone:0}

 value=''
 subscription: Subscription=new Subscription;
 workParameterList:Array<WorkParameter>=[]
 timeZoneList:Array<TimeZone>=[]

 styleValidTimeZone=''
 styleValidVolume=''

 ngOnInit(): void {
   this.subscription = this.workParameterService.getAllWorkParametersWithTimeZoneOfCompany(this.authService.getCompany()).subscribe({
     next: (data: any) => {
       this.workParameterList=data

       this.timeZoneService.getAllTimeZonesOfCompany(this.authService.getCompany()).subscribe({
        next:(data)=>{
          this.timeZoneList=data
          for (const t of this.timeZoneList){
            t.formated=t.start+' - '+t.end
            if(t.id==this.editParameter.idTimeZone){
              this.editParameter.timeZone=t
            }
          }
        },
        error:(err)=>{
          
        }
       })
     },
     error: (err) => {

     }
     
   });
 }
 showDialog() {
     this.visible = true;
 }

cerrar(): void {
 this.cerrarModal.emit();
}
 editar(b:Boolean){
   if(b){


     if(this.validarCampos()){
    this.editParameter.idTimeZone=this.editParameter.timeZone!.id
     this.messageService.add({ severity: 'info', summary: 'editar Parametro', detail: 'En curso', life: 3000 });
     this.workParameterService.updateWorkParameter(this.editParameter).subscribe({
       next: (u:any) => {
        console.log(this.editParameter)
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'editar Parametro', detail: 'Completado', life: 3000 });
               setTimeout(() => {
                 window.location.reload()
             }, 1000); 
           }, 2000); 
         
       },
       error: (err) => {
    
         this.messageService.add({ severity:'error', summary: 'editar Parametro', detail: 'Cancelado', life: 3000 });
       }
     })
   }
 }
 }
 eliminar(b:Boolean){
  this.messageService.add({ severity: 'info', summary: 'Eliminar Parametro', detail: 'En curso', life: 3000 });
  this.workParameterService.deleteWorkParameter(this.editParameter.id!).subscribe({
    next:(data:any)=>{
      setTimeout(() => {
              this.visible=false
              this.messageService.add({ severity: 'success', summary: 'Eliminar Parametro', detail: 'Completado', life: 3000 });
              setTimeout(() => {
              window.location.reload()
            }, 1000);
          }, 1000); 
    },
      error: (err) => {
        this.messageService.add({ severity:'error', summary: 'Eliminar Parametro', detail: 'Cancelado', life: 3000 });
      }
  })
}
 validarCampos():Boolean{
   let valido = true
   if(this.editParameter.timeZone?.id==null){
     this.styleValidTimeZone='ng-invalid ng-dirty'
     valido=false
     this.messageService.add({ severity: 'warn', summary: 'Editar Parametro', detail: 'Franja Horaria no especificada', life: 3000 });
   }else{
     this.styleValidTimeZone=''
     if(this.editParameter.expectedVolume==0){
        
     this.styleValidVolume='ng-invalid ng-dirty'
     valido=false
     this.messageService.add({ severity: 'warn', summary: 'editar Parametro', detail: 'Debe introducir un volumen válido', life: 3000 });
     }else{
      this.styleValidVolume=''
      this.styleValidTimeZone=''
       if(!this.checkUnico()){
         valido=false
         this.messageService.add({ severity: 'warn', summary: 'editar Parametro', detail: 'Ya existe una parametro con esos valores', life: 3000 });
         this.styleValidTimeZone='ng-invalid ng-dirty'
         this.styleValidVolume='ng-invalid ng-dirty'
        }else{
          this.styleValidVolume=''
          this.styleValidTimeZone=''
        }
      }
    }
    return valido
 }

 
 checkUnico():Boolean{
   let valido=true
   for(const parameter of this.workParameterList){

     if(parameter.expectedVolume==this.editParameter.expectedVolume 
      && parameter.idTimeZone==this.editParameter.idTimeZone){
       valido=false
      }
      
    }
    return valido
  }

}
