import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkPosition } from '../../interfaces/work-position';
import { WorkDirective } from '../../interfaces/directives';
import { PositionService } from '../../services/position.service';
import { AuthService } from '../../services/auth.service';
import { DirectivesService } from '../../services/directives.service';
import { MessageService } from 'primeng/api';
import { DialogService,  } from 'primeng/dynamicdialog';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmComponent } from '../confirm/confirm.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { Assignment } from '../../interfaces/assignment';
import { AssignmentService } from '../../services/assignment.service';

@Component({
  selector: 'app-rate-user-assingment',
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
  templateUrl: './rate-user-assingment.component.html',
  styleUrl: './rate-user-assingment.component.css'
})
export class RateUserAssingmentComponent {
  constructor(
    public messageService: MessageService,
    public assignmentService:AssignmentService,

    ) {}

 @Input() visible: boolean = false;
 @Input() tipo=0
 @Output() cerrarModal = new EventEmitter<void>();
 value=''
 @Input() assignment!:Assignment
 subscription: Subscription=new Subscription;

newRate:number=0



 ngOnInit(): void {
  if(this.assignment.valuation==null){

    this.newRate=0
  }else{
    this.newRate=this.assignment.valuation
  }
 }
 showDialog() {
  if(this.assignment.valuation==null){

    this.newRate=0
  }else{
    this.newRate=this.assignment.valuation
  }
  this.visible = true;
 }

cerrar(): void {
 this.cerrarModal.emit();
}
 crear(confirm:Boolean){
   if(confirm){
     this.assignment.valuation=this.newRate
    this.assignmentService.updateAssignment(this.assignment).subscribe({
      next:(data)=>{
       if(data){
        this.cerrar()
        this.visible=false
       }
      },
      error:(err)=>{

      }
    })

 }
 }

}
