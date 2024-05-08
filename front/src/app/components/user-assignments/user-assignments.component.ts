
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
import { SliderModule } from 'primeng/slider';
import { TimeZone } from '../../interfaces/time-zone';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { WorkPosition } from '../../interfaces/work-position';
import { PositionService } from '../../services/position.service';
import { Assignment } from '../../interfaces/assignment';
import { AssignmentService } from '../../services/assignment.service';
import { User } from '../../interfaces/user';
import { WorkDayService } from '../../services/work-day.service';
import { UserService } from '../../services/user.service';
import { EditAssignmentComponent } from '../edit-assignment/edit-assignment.component';
import { NewAssignmentComponent } from '../new-assignment/new-assignment.component';
import { Messsage } from '../../interfaces/messsage';
@Component({
  selector: 'app-user-assignments',
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
    SliderModule,
    EditAssignmentComponent,
    NewAssignmentComponent

  ],
  templateUrl: './user-assignments.component.html',
  styleUrl: './user-assignments.component.css'
})
export class UserAssignmentsComponent {
  constructor(
    public messageService: MessageService,
    private assignmentService: AssignmentService,
    public authService: AuthService,
    private positionService: PositionService,
    private userService: UserService,

  ) { }

  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() idWorkDay!: number
  @Input() buttonText: string = 'Añadir'
  @Input() buttonColor: string = 'success'
  @Input() idUser!: number
  value = ''
  subscription: Subscription = new Subscription;
  editVisible:boolean=false
 public user!: User
  @Input() date!:string
  styleValidPosition = ''
  horaInicio = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horaFin = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }


  estiloValidacionHoras = ''
  estiloValidacionMinutos = ''
  estilosValidacionesDias: string='';

  ngOnInit(): void {
 
  this.subscription=this.userService.getUserWithAssignments(this.idUser, this.idWorkDay).subscribe({
    next: (user) => {
      console.log(user)
      this.user=user
    }
  })


  }
  showDialog() {
    this.visible = true;
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }

showMessage(message:Messsage){
  this.messageService.add(message)
}

}
