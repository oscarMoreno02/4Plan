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
import { Day, TimeZone } from '../../interfaces/time-zone';
import { Subscription } from 'rxjs';
import { WorkParametersService } from '../../services/work-parameters.service';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Messsage } from '../../interfaces/messsage';

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
@Input() idParameter:number=0
 @Input() visible: boolean = false;
 @Input() tipo=0
 @Output() cerrarModal = new EventEmitter<void>();
 editParameter:WorkParameter={expectedVolume:0,idCompany:this.authService.getCompany(),idTimeZone:0}
@Output() updateEvent= new EventEmitter<void>();
@Output() sendMessage = new EventEmitter<Messsage>();
 value=''
 subscription: Subscription=new Subscription;
 workParameterList:Array<WorkParameter>=[]
 timeZoneList:Array<TimeZone>=[]

 styleValidTimeZone=''
 styleValidVolume=''

 ngOnInit(): void {
  if(this.idParameter!=0){

   this.getData()
}

 }
 getParameter(){

  this.subscription=this.workParameterService.getWorkParameter(this.idParameter).subscribe({
    
    next:(data=>{

      this.editParameter=data
      for (const t of this.timeZoneList){
        t.formated=t.start+' - '+t.end+' '+this.translateDays(t.days!)
        if(t.id==this.editParameter.idTimeZone){
          this.editParameter.timeZone=t
          
        }
      }
    }),
    error:(error=>{

    })
  })
 }
 showDialog() {
  this.getData()
     this.visible = true;
 }

cerrar(): void {

 this.cerrarModal.emit();
}
 editar(b:Boolean){
   if(b){


     if(this.validarCampos()){
    this.editParameter.idTimeZone=this.editParameter.timeZone!.id!
     this.sendMessage.emit({ severity: 'info', summary: 'editar Parametro', detail: 'En curso', life: 3000 });
     this.workParameterService.updateWorkParameter(this.editParameter).subscribe({
       next: (u:any) => {

             setTimeout(() => {
               this.sendMessage.emit({ severity: 'success', summary: 'editar Parametro', detail: 'Completado', life: 3000 });
               this.updateEvent.emit()
           
               setTimeout(() => {
   
                  this.cerrar()
               }, 1)
         }, 1000);
         
       },
       error: (err) => {
    
         this.sendMessage.emit({ severity:'error', summary: 'editar Parametro', detail: 'Cancelado', life: 3000 });
       }
     })
   }
 }
 }
 eliminar(b:Boolean){
  if(b){

    this.sendMessage.emit({ severity: 'info', summary: 'Eliminar Parametro', detail: 'En curso', life: 3000 });
  this.workParameterService.deleteWorkParameter(this.editParameter.id!).subscribe({
    next:(data:any)=>{
      setTimeout(() => {
              this.visible=false
              this.sendMessage.emit({ severity: 'success', summary: 'Eliminar Parametro', detail: 'Completado', life: 3000 });
              this.updateEvent.emit()
           
              setTimeout(() => {
  
                 this.cerrar()
              }, 1)
        }, 1000);
        },
        error: (err) => {
          this.sendMessage.emit({ severity:'error', summary: 'Eliminar Parametro', detail: 'Cancelado', life: 3000 });
        }
      })
    }
}
 validarCampos():Boolean{
   let valido = true
   if(this.editParameter.timeZone?.id==null){
     this.styleValidTimeZone='ng-invalid ng-dirty'
     valido=false
     this.sendMessage.emit({ severity: 'warn', summary: 'Editar Parametro', detail: 'Franja Horaria no especificada', life: 3000 });
   }else{
     this.styleValidTimeZone=''
     if(this.editParameter.expectedVolume==0){
        
     this.styleValidVolume='ng-invalid ng-dirty'
     valido=false
     this.sendMessage.emit({ severity: 'warn', summary: 'Editar Parametro', detail: 'Debe introducir un volumen válido', life: 3000 });
     }else{
      this.styleValidVolume=''
      this.styleValidTimeZone=''
       if(!this.checkUnico()){
         valido=false
         this.sendMessage.emit({ severity: 'warn', summary: 'Editar Parametro', detail: 'Ya existe una parametro con esos valores', life: 3000 });
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
      && parameter.idTimeZone==this.editParameter.idTimeZone && this.editParameter.id!=parameter.id){
       valido=false
      }
      
    }
    return valido
  }

   translateDays(days:Day[]):string {
    let str=[]
  if(days.length==7){
    return '[ TODOS] '
  }
  for (const day of days){
    if(day.number==0){
      str.push('D')
    }
    if(day.number==1){
      str.push('L')
    }
    if(day.number==2){
      str.push('M')
    }
    if(day.number==3){
      str.push('X')
    }
    if(day.number==4){
      str.push('J')
    }
    if(day.number==5){
      str.push('V')
    }
    if(day.number==6){
      str.push('S')
    }

  }
  str.push()
  
 return '[ '+str.toString()+' ]'
}
getData(){
  this.subscription = this.workParameterService.getAllWorkParametersWithTimeZoneOfCompany(this.authService.getCompany()).subscribe({
    next: (data: any) => {
    this.workParameterList=data

    this.timeZoneService.getAllTimeZonesOfCompany(this.authService.getCompany()).subscribe({
     next:(data)=>{
       this.timeZoneList=data
       
       this.getParameter()
      
     
     },
     error:(err)=>{
       
     }
    })
  },
  error: (err) => {

  }
  
});
}
}
