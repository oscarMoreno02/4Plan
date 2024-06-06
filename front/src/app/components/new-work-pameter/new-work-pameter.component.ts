
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
import { Day, TimeZone } from '../../interfaces/time-zone';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { Messsage } from '../../interfaces/messsage';
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
 @Output() updateEvent= new EventEmitter<void>();
 @Output() sendMessage = new EventEmitter<Messsage>();
 ngOnInit(): void {
  this.getData()
 }
 showDialog() {
  this.getData()
  this.newParameter={expectedVolume:0,idCompany:this.authService.getCompany(),idTimeZone:0}
     this.visible = true;
 }

cerrar(): void {
  this.visible=false
 this.cerrarModal.emit();
}
 crear(b:Boolean){
   if(b){


     if(this.validarCampos()){
      this.newParameter.idTimeZone=this.newParameter.timeZone!.id!
     this.sendMessage.emit({ severity: 'info', summary: 'Crear Parametro', detail: 'En curso', life: 3000 });
     this.workParameterService.insertWorkParameter(this.newParameter).subscribe({
       next: (u:any) => {
             setTimeout(() => {
               this.sendMessage.emit({ severity: 'success', summary: 'Crear Parametro', detail: 'Completado', life: 3000 });
               this.updateEvent.emit()
           
               setTimeout(() => {
   
                  this.cerrar()
               }, 1)
         }, 1000);
         
       },
       error: (err) => {
    
         this.sendMessage.emit({ severity:'error', summary: 'Crear Parametro', detail: 'Cancelado', life: 3000 });
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
     this.sendMessage.emit({ severity: 'warn', summary: 'Crear Parametro', detail: 'Franja Horaria no especificada', life: 3000 });
   }else{
     this.styleValidTimeZone=''
     if(this.newParameter.expectedVolume==0){
        
     this.styleValidVolume='ng-invalid ng-dirty'
     valido=false
     this.sendMessage.emit({ severity: 'warn', summary: 'Crear Parametro', detail: 'Debe introducir un volumen válido', life: 3000 });
     }else{
      this.styleValidVolume=''
      this.styleValidTimeZone=''
       if(!this.checkUnico()){
         valido=false
         this.sendMessage.emit({ severity: 'warn', summary: 'Crear Parametro', detail: 'Ya existe una parametro con esos valores', life: 3000 });
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

  translateDays(days:Day[]):string {
    let str=[]
  if(days.length==7){
    return '[ TODOS] '
  }
  for (const day of days){
    console.log(days)
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
         for (const t of this.timeZoneList){
           t.formated=t.start+' - '+t.end+' '+this.translateDays(t.days!)
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
}

