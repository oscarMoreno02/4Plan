
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
import { WorkArea } from '../../interfaces/work-area';
import { AreaService } from '../../services/area.service';
@Component({
  selector: 'app-edit-assignment',
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
  encapsulation: ViewEncapsulation.None,
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'
})
export class EditAssignmentComponent {
  estilosValidacionesTipo: string = '';
  constructor(
    public messageService: MessageService,
    private assignmentService: AssignmentService,
    public authService: AuthService,
    private positionService: PositionService,
    private userService: UserService,
    private areaService:AreaService
  ) { }

  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<Messsage>();


  value = ''
  subscription: Subscription = new Subscription;
  positionsList: Array<WorkPosition> = []
 areasList: Array<WorkArea> = []
  @Input() id: number = 0
  @Input() date!: string
  user!: User
  editAssignment: Assignment = { idCompany: this.authService.getCompany(), idPosition: 0, cost: 0, valuation: null, idUser: 0, idWorkDay: 0, start: '', end: '', type: 0 ,idArea:0}
  styleValidPosition = ''
  styleValidAreas = ''
  horaInicio = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horaFin = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horas = [{ valor: '00', numero: 0 }]
  minutos = [{ valor: '00', numero: 0 }]
  estiloValidacionHoras = ''
  estiloValidacionMinutos = ''
  types = [{ text: 'Turno de trabajo', value: 0 }, { text: 'Dia Libre', value: 1 }, { text: 'Vacaciones', value: 2 }]
  typeSelected = this.types[0]

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
      next: (data => {
        this.positionsList = data
        this.areaService.getAllWorkAreasOfCompany(this.authService.getCompany()).subscribe({
          next:(areas)=>{
            this.areasList=areas
          }
        })
      }),
      error: (error => {

      })
    })

  }
  showDialog(assignment: Assignment) {
    this.subscription = this.userService.getUserWithAssignments(assignment.idUser!, assignment.idWorkDay).subscribe({
      next: (user) => {
        console.log(user)
        this.user = user
        for (const a of user.assignments) {
          if (assignment.id == a.id) {
            this.editAssignment = a
            this.parsearDatos(this.editAssignment.start, this.editAssignment.end, this.editAssignment.type)
            break
          }
        }
        console.log(this.editAssignment)

        this.visible = true;
      }
    })
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
  editar(confirm: Boolean) {
    if (confirm) {

      if (this.validarCampos()) {
        
        this.editAssignment.type = this.typeSelected.value
        this.editAssignment.cost = 0
        this.editAssignment.valuation = null

        if(this.editAssignment.type==0){
          this.editAssignment.end = this.horaFin.hora.valor + ':' + this.horaFin.minuto.valor
          this.editAssignment.start = this.horaInicio.hora.valor + ':' + this.horaInicio.minuto.valor
          this.editAssignment.idPosition = this.editAssignment.position!.id!
          this.editAssignment.idArea=this.editAssignment.area!.id!
        }else{
          this.editAssignment.idPosition=null
          this.editAssignment.idArea=null
          this.editAssignment.start='00:00'
          this.editAssignment.end='00:00'

        }
        if (this.comprobarCompatibilidad()) {

          this.sendMessage.emit({ severity: 'info', summary: 'Modificar Asignación', detail: 'En curso', life: 3000 });
          this.assignmentService.updateAssignment(this.editAssignment).subscribe({
            next: (u: any) => {
              console.log(this.editAssignment)
              setTimeout(() => {
                this.sendMessage.emit({ severity: 'success', summary: 'Modificar Asignación', detail: 'Completado', life: 3000 });
                setTimeout(() => {
                  window.location.reload()
                }, 1000);
              }, 2000);

            },
            error: (err) => {

              this.sendMessage.emit({ severity: 'error', summary: 'Modificar Asignación', detail: 'Cancelado', life: 3000 });
            }
          })
        } else {
          this.sendMessage.emit({ severity: 'warn', summary: 'Modificar Asignación', detail: 'Asignación incompatible con las existentes', life: 3000 });

        }
      }

    }
  }
  eliminar(b: Boolean) {
    this.sendMessage.emit({ severity: 'info', summary: 'Eliminar Directiva', detail: 'En curso', life: 3000 });
    this.assignmentService.deleteAssignment(this.editAssignment.id!).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.visible = false
          this.sendMessage.emit({ severity: 'success', summary: 'Eliminar Asignación', detail: 'Completado', life: 3000 });
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }, 1000);
      },
      error: (err) => {
        this.sendMessage.emit({ severity: 'error', summary: 'Eliminar asignación', detail: 'Cancelado', life: 3000 });
      }
    })
  }
  validarCampos(): Boolean {
    let valido = true
    if (this.typeSelected == null) {
      valido = false
      this.sendMessage.emit({ severity: 'warn', summary: 'Modificar  Asignación', detail: 'Debe seleccionar un tipo de asignación', life: 3000 });
      this.estilosValidacionesTipo = 'ng-invalid ng-dirty'
    } else {
      this.estilosValidacionesTipo=''
      if (this.typeSelected.value == 0) {
        if (!this.editAssignment.position) {
          this.styleValidPosition = 'ng-invalid ng-dirty'
          valido = false
          this.sendMessage.emit({ severity: 'warn', summary: 'Modificar Asignación', detail: 'Posicion de trabajo no especificada', life: 3000 });
        } else {
          this.styleValidAreas=''
          if(!this.editAssignment.area){
            this.styleValidPosition = 'ng-invalid ng-dirty'
            valido = false
            this.sendMessage.emit({ severity: 'warn', summary: 'Modificar Asignación', detail: 'Area de trabajo no especificada', life: 3000 });
          }else{
            this.styleValidAreas=''
          
          if (this.horaInicio.hora == null || this.horaFin.hora == null) {
            this.estiloValidacionHoras = 'ng-invalid ng-dirty'
            valido = false
            this.sendMessage.emit({ severity: 'warn', summary: 'Modificar Asignación', detail: 'Horas introdudas incorrectamente', life: 3000 });
          }else{
            this.estiloValidacionHoras=''
          }
          
          if (this.horaInicio.minuto == null || this.horaFin.minuto == null) {
            this.estiloValidacionHoras = 'ng-invalid ng-dirty'
            valido = false
            this.sendMessage.emit({ severity: 'warn', summary: 'Modificar Asignación', detail: 'Minutos introducidos incorrectamente', life: 3000 });
          }
          if (this.horaInicio.hora.numero > this.horaFin.hora.numero) {
            this.estiloValidacionHoras = 'ng-invalid ng-dirty'
            valido = false
            this.sendMessage.emit({ severity: 'warn', summary: 'Modificar Asignación', detail: 'Horas introdudas incorrectamente', life: 3000 });
          } else {
            if (this.horaInicio.hora.numero == this.horaFin.hora.numero && this.horaInicio.minuto.numero > this.horaFin.minuto.numero) {
              this.estiloValidacionMinutos = 'ng-invalid ng-dirty'
              valido = false
              this.sendMessage.emit({ severity: 'warn', summary: 'Modificar Asignación', detail: 'Minutos introdudos incorrectamente', life: 3000 });
            } else {
              if (this.horaInicio.hora.numero == this.horaFin.hora.numero && this.horaInicio.minuto.numero == this.horaFin.minuto.numero) {
                this.estiloValidacionMinutos = 'ng-invalid ng-dirty'
                valido = false
                this.sendMessage.emit({ severity: 'warn', summary: 'Modificar Asignación', detail: 'Minutos introdudos incorrectamente', life: 3000 });
              } else {
                this.estiloValidacionMinutos = ''
                this.estiloValidacionHoras = ''
              }
            }
          }
        }}
      }
    }
    return valido
  }
  comprobarCompatibilidad(): boolean {
    let valido = true;
    if (this.user.assignments) {
      for (const assignment of this.user.assignments) {
        if (this.editAssignment.id != assignment.id) {
          

          if ((this.editAssignment.start >= assignment.start && this.editAssignment.start < assignment.end) ||
            (this.editAssignment.end > assignment.start && this.editAssignment.end <= assignment.end) ||
            (this.editAssignment.start <= assignment.start && this.editAssignment.end >= assignment.end)||
            assignment.type!=0 ) {
            valido = false;
            break;
          }
        }
      }
    }
    return valido;
  }
  parsearDatos(horaInicio: string, horaFin: string, type: number) {

    this.horaInicio.hora = { valor: horaInicio.substring(0, 2), numero: parseInt(horaInicio.substring(0, 2)) }
    this.horaInicio.minuto = { valor: horaInicio.substring(3, 5), numero: parseInt(horaInicio.substring(3, 5)) }
    this.horaFin.hora = { valor: horaFin.substring(0, 2), numero: parseInt(horaFin.substring(0, 2)) }
    this.horaFin.minuto = { valor: horaFin.substring(3, 5), numero: parseInt(horaFin.substring(3, 5)) }

    for (const t of this.types) {
      if (t.value == type) {
        this.typeSelected = t
      }
    }
  }
}
