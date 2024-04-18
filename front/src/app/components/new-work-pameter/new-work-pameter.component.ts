
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DropdownModule } from 'primeng/dropdown';
import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkParametersService } from '../../services/work-parameters.service';
import { WorkParameter } from '../../interfaces/work-parameter';
import { TimeZone } from '../../interfaces/time-zone';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-new-work-pameter',
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
  templateUrl: './new-work-pameter.component.html',
  styleUrl: './new-work-pameter.component.css',
  providers: [DialogService, MessageService],
})
export class NewWorkPameterComponent {
  constructor(
    public messageService: MessageService,
    private workParameterService: WorkParametersService,
    public authService:AuthService,
    private timeZoneService:TimeZoneService
    ) {}

 @Input() visible: boolean = false;
 @Input() tipo=0
 @Output() cerrarModal = new EventEmitter<void>();

 value=''
 subscription: Subscription=new Subscription;
 workParameterList:Array<WorkParameter>=[]
 timeZoneList:Array<TimeZone>=[]

 newParameter:WorkParameter={expectedVolume:0,idCompany:this.authService.getCompany(),idTimeZone:0}
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
  this.newParameter={expectedVolume:0,idCompany:this.authService.getCompany(),idTimeZone:0}
     this.visible = true;
 }

cerrar(): void {
 this.cerrarModal.emit();
}
 crear(b:Boolean){
   if(b){


     if(this.validarCampos()){
    this.newParameter.idTimeZone=this.newParameter.timeZone!.id
     this.messageService.add({ severity: 'info', summary: 'Crear Parametro', detail: 'En curso', life: 3000 });
     this.workParameterService.insertWorkParameter(this.newParameter).subscribe({
       next: (u:any) => {
        console.log(this.newParameter)
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'Crear Parametro', detail: 'Completado', life: 3000 });
               setTimeout(() => {
                 window.location.reload()
             }, 1000); 
           }, 2000); 
         
       },
       error: (err) => {
    
         this.messageService.add({ severity:'error', summary: 'Crear Parametro', detail: 'Cancelado', life: 3000 });
       }
     })
   }
 }
 }
 validarCampos():Boolean{
   let valido = true
   if(this.newParameter.timeZone?.id==null){
     this.styleValidTimeZone='ng-invalid ng-dirty'
     valido=false
     this.messageService.add({ severity: 'warn', summary: 'Crear Parametro', detail: 'Franja Horaria no especificada', life: 3000 });
   }else{
     this.styleValidTimeZone=''
     if(this.newParameter.expectedVolume==0){
        
     this.styleValidVolume='ng-invalid ng-dirty'
     valido=false
     this.messageService.add({ severity: 'warn', summary: 'Crear Parametro', detail: 'Debe introducir un volumen válido', life: 3000 });
     }else{
      this.styleValidVolume=''
      this.styleValidTimeZone=''
       if(!this.checkUnico()){
         valido=false
         this.messageService.add({ severity: 'warn', summary: 'Crear Parametro', detail: 'Ya existe una parametro con esos valores', life: 3000 });
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

     if(parameter.expectedVolume==this.newParameter.expectedVolume 
      && parameter.idTimeZone==this.newParameter.idTimeZone){
       valido=false
      }
      
    }
    return valido
  }


}

