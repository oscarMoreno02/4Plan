
import { Component, Directive, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
import { SliderModule } from 'primeng/slider';
import { TimeZone } from '../../interfaces/time-zone';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { WorkDirective } from '../../interfaces/directives';
import { DirectivesService } from '../../services/directives.service';
import { WorkPosition } from '../../interfaces/work-position';
import { PositionService } from '../../services/position.service';
@Component({
  selector: 'app-new-directive',
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
  templateUrl: './new-directive.component.html',
  styleUrl: './new-directive.component.css'
})
export class NewDirectiveComponent {
  constructor(
    public messageService: MessageService,
    private directiveService: DirectivesService,
    public authService:AuthService,
    private positionService:PositionService
    ) {}

 @Input() visible: boolean = false;
 @Input() tipo=0
 @Output() cerrarModal = new EventEmitter<void>();
@Input() idParameter : number=0
 value=''
 subscription: Subscription=new Subscription;
 positionsList:Array<WorkPosition>=[]

 newDirective:WorkDirective={expectedValuation:0,idCompany:this.authService.getCompany(),idPosition:0,idParameter:0,id:0}
 styleValidPosition=''


 ngOnInit(): void {
  this.subscription=this.positionService.getAllWorkPositionsOfCompany(this.authService.getCompany()).subscribe({
    next:(data=>{
      this.positionsList=data
      console.log(data)
    }),
    error:(error=>{
      
    })
  })
 }
 showDialog() {
  this.newDirective={expectedValuation:0,idCompany:this.authService.getCompany(),idParameter:0,idPosition:0}
     this.visible = true;
 }

cerrar(): void {
 this.cerrarModal.emit();
}
 crear(confirm:Boolean){
   if(confirm){
     if(this.validarCampos()){
      this.newDirective.idPosition=this.newDirective.position!.id
      this.newDirective.idParameter=this.idParameter
      this.messageService.add({ severity: 'info', summary: 'Crear Directiva', detail: 'En curso', life: 3000 });
      this.directiveService.insertDirective(this.newDirective).subscribe({
       next: (u:any) => {
        console.log(this.newDirective)
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'Crear Directiva', detail: 'Completado', life: 3000 });
               setTimeout(() => {
                 window.location.reload()
             }, 1000); 
           }, 2000); 
         
       },
       error: (err) => {
    
         this.messageService.add({ severity:'error', summary: 'Crear Directiva', detail: 'Cancelado', life: 3000 });
       }
     })
    }
   
 }
 }
 validarCampos():Boolean{
    let valido = true
   if(!this.newDirective.position){
     this.styleValidPosition='ng-invalid ng-dirty'
     valido=false
     this.messageService.add({ severity: 'warn', summary: 'Crear Directiva', detail: 'Posicion de trabajo no especificado', life: 3000 });
   }else{
     this.styleValidPosition=''

    }
     return valido
 }

 

}
