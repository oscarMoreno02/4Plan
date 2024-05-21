
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
import { Messsage } from '../../interfaces/messsage';
import { AreaService } from '../../services/area.service';
import { WorkArea } from '../../interfaces/work-area';
import { WorkDay } from '../../interfaces/work-day';
@Component({
  selector: 'app-new-free-assignment',
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
  templateUrl: './new-free-assignment.component.html',
  styleUrl: './new-free-assignment.component.css'
})
export class NewFreeAssignmentComponent {
  constructor(
    public messageService: MessageService,
    private assignmentService: AssignmentService,
    public authService: AuthService,
    private positionService: PositionService,
    private userService: UserService,
    private areaService:AreaService,
    private workDayService:WorkDayService
  ) { }

  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<Messsage>();

  @Input() buttonText: string = 'Añadir'
  @Input() buttonColor: string = 'success'
  @Input() assignmentList:Array<Assignment>=[]
  value = ''
  subscription: Subscription = new Subscription;
  positionsList: Array<WorkPosition> = []
  areasList: Array<WorkArea> = []

  newAssignment: Assignment = { idCompany: this.authService.getCompany(), idPosition: 0, cost: 0, valuation: null, idUser: null, idWorkDay: 0, start: '', end: '', type: 0,idArea:0 }
  styleValidPosition = ''
  horaInicio = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horaFin = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horas = [{ valor: '00', numero: 0 }]
  minutos = [{ valor: '00', numero: 0 }]
  estiloValidacionHoras = ''
  estiloValidacionMinutos = ''
  estilosValidacionesTipo: string = '';
  estilosValidacionesAreas: string = '';



  workDayList:Array<WorkDay>=[]
  workDaySelected!:WorkDay
  ngOnInit(): void {
    let listaHoras = []
    for (let i = 0; i < 24; i++) {
      let v = i.toString()
      if (i < 10) {
        v = '0' + i
      }
      listaHoras.push({ valor: v, numero: i })
    }
    this.horas = listaHoras
    let listaMinutos = []

    for (let i = 0; i < 60; i++) {
      let v = i.toString()
      if (i < 10) {
        v = '0' + i
      }
      listaMinutos.push({ valor: v, numero: i })
    }
    this.minutos = listaMinutos
    this.subscription = this.positionService.getAllWorkPositionsOfCompany(this.authService.getCompany()).subscribe({
      next: (data) => {
        this.positionsList = data
      
        this.areaService.getAllWorkAreasOfCompany(this.authService.getCompany()).subscribe({
          next:(areas)=>{
              this.areasList=areas
          },

        })
        
   
        this.workDayService.getNextDays(this.authService.getCompany()).subscribe({
          next:(workdays)=>{
            console.log(workdays)
            this.workDayList=workdays
          }
        })
      },
      error: (error => {

      })
    })

  }
  showDialog() {
    this.newAssignment = { idCompany: this.authService.getCompany(), idPosition: 0, cost: 0, valuation: null, idUser: null, idWorkDay: 0, start: '', end: '', type: 0,idArea:0 }
    this.visible = true;
  }

  cerrar(): void {
    this.visible=false
    this.cerrarModal.emit();
  }
  crear(confirm: Boolean) {
    if (confirm) {

      if (this.validarCampos()) {
          this.newAssignment.idWorkDay = this.newAssignment.workDay!.id!
          this.newAssignment.end = this.horaFin.hora.valor + ':' + this.horaFin.minuto.valor
          this.newAssignment.start = this.horaInicio.hora.valor + ':' + this.horaInicio.minuto.valor
          this.newAssignment.idPosition = this.newAssignment.position!.id!
          this.newAssignment.idArea=this.newAssignment.area!.id!
      
          this.sendMessage.emit({ severity: 'info', summary: 'Crear Asignación', detail: 'En curso', life: 3000 });
          this.assignmentService.insertAssignment(this.newAssignment).subscribe({
            next: (u: any) => {
              this.newAssignment.id=u.id
              setTimeout(() => {
                this.sendMessage.emit({ severity: 'success', summary: 'Crear Asignación', detail: 'Completado', life: 3000 });
                this.assignmentList.push(this.newAssignment)
                setTimeout(() => {
                 this.cerrar()
                }, 1);
              }, 1000);

            },
            error: (err) => {

              this.sendMessage.emit({ severity: 'error', summary: 'Crear Asignación', detail: 'Cancelado', life: 3000 });
            }
          })
        
      }

    }
      }

    
  validarCampos(): Boolean {
    let valido = true
      if(!this.newAssignment.workDay){
        valido=false
        this.sendMessage.emit({ severity: 'warn', summary: 'Crear Asignación', detail: 'Dia de trabajo no especificado', life: 3000 });

      }else{

        if (!this.newAssignment.position) {
          this.styleValidPosition = 'ng-invalid ng-dirty'
          valido = false
          this.sendMessage.emit({ severity: 'warn', summary: 'Crear Asignación', detail: 'Posicion de trabajo no especificada', life: 3000 });
        } else {
          this.styleValidPosition=''
          if (!this.newAssignment.area) {
            this.estilosValidacionesAreas = 'ng-invalid ng-dirty'
            valido = false
            this.sendMessage.emit({ severity: 'warn', summary: 'Crear Asignación', detail: 'Area de trabajo no especificada', life: 3000 });
          } else {
            this.estilosValidacionesAreas=''
          if (this.horaInicio.hora == null || this.horaFin.hora == null) {
            this.estiloValidacionHoras = 'ng-invalid ng-dirty'
            valido = false
            this.sendMessage.emit({ severity: 'warn', summary: 'Crear  Asignación', detail: 'Horas introdudas incorrectamente', life: 3000 });
          }
          if (this.horaInicio.minuto == null || this.horaFin.minuto == null) {
            this.estiloValidacionHoras = 'ng-invalid ng-dirty'
            valido = false
            this.sendMessage.emit({ severity: 'warn', summary: 'Crear  Asignación', detail: 'Minutos introducidos incorrectamente', life: 3000 });
          }
          if (this.horaInicio.hora.numero > this.horaFin.hora.numero) {
            this.estiloValidacionHoras = 'ng-invalid ng-dirty'
            valido = false
            this.sendMessage.emit({ severity: 'warn', summary: 'Crear  Asignación', detail: 'Horas introdudas incorrectamente', life: 3000 });
          } else {
            if (this.horaInicio.hora.numero == this.horaFin.hora.numero && this.horaInicio.minuto.numero > this.horaFin.minuto.numero) {
              this.estiloValidacionMinutos = 'ng-invalid ng-dirty'
              valido = false
              this.sendMessage.emit({ severity: 'warn', summary: 'Crear  Asignación', detail: 'Minutos introdudos incorrectamente', life: 3000 });
            } else {
              if (this.horaInicio.hora.numero == this.horaFin.hora.numero && this.horaInicio.minuto.numero == this.horaFin.minuto.numero) {
                this.estiloValidacionMinutos = 'ng-invalid ng-dirty'
                valido = false
                this.sendMessage.emit({ severity: 'warn', summary: 'Crear  Asignación', detail: 'Minutos introdudos incorrectamente', life: 3000 });
              } else {
                this.estiloValidacionMinutos = ''
                this.estiloValidacionHoras = ''
              }
            }
          }
        }}
      }
      
    

    return valido
  }
 
}
