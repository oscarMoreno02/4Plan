
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
import { Day, TimeZone } from '../../interfaces/time-zone';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { WorkDirective } from '../../interfaces/directives';
import { DirectivesService } from '../../services/directives.service';
import { WorkPosition } from '../../interfaces/work-position';
import { PositionService } from '../../services/position.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import {MultiSelect, MultiSelectModule} from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { Messsage } from '../../interfaces/messsage';
@Component({
  selector: 'app-new-time-zone',
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
    MultiSelectModule,
    CheckboxModule

  ],

  providers: [DialogService, MessageService],
  encapsulation:ViewEncapsulation.None,
  templateUrl: './new-time-zone.component.html',
  styleUrl: './new-time-zone.component.css'
})
export class NewTimeZoneComponent {
  checked: boolean = true;
  constructor(
    public messageService: MessageService,
    public authService: AuthService,
    private timezoneService: TimeZoneService
  ) {

    this.days = [
      {name: 'Lunes', number: 1 },
      {name: 'Martes', number: 2},
      {name: 'Miercoles', number: 3},
      {name: 'Jueves', number: 4},
      {name: 'Viernes', number: 5},
      {name: 'Sabado', number: 6},
      {name: 'Domingo', number: 0}]
 
   }
  @Output() updateEvent= new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<Messsage>();
  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() idParameter: number = 0
  value = ''
  subscription: Subscription = new Subscription;
  timeZoneList: Array<TimeZone> = []

  newTimeZone: TimeZone = { start: '00', end: '00', idCompany: this.authService.getCompany() }
  days!: Day[];
  selectedDays: Day[]=[];

  horaInicio = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horaFin = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horas = [{ valor: '00', numero: 0 }]
  minutos = [{ valor: '00', numero: 0 }]


  estiloValidacionHoras = ''
  estiloValidacionMinutos = ''
  estilosValidacionesDias: string='';


mostrar(event:any){
}


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

  this.getData()
  }
  showDialog() {
    this.newTimeZone = { start: '00', end: '00', idCompany: this.authService.getCompany() }
    this.visible = true;
  }

  cerrar(): void {
    this.selectedDays=[];

    this.horaInicio = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
    this.horaFin = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
    this.newTimeZone = { start: '00', end: '00', idCompany: this.authService.getCompany() }
    this.visible=false
    this.cerrarModal.emit();
  }
  crear(confirm: Boolean) {
    if (confirm) {
      if (this.validarCampos()) {
        this.newTimeZone.end = this.horaFin.hora.valor + ':' + this.horaFin.minuto.valor
        this.newTimeZone.start = this.horaInicio.hora.valor + ':' + this.horaInicio.minuto.valor
        this.newTimeZone.days=this.selectedDays
        if (this.comprobarCompatibilidad()) {
         
          
          this.messageService.add({ severity: 'info', summary: 'Crear Franja Horaria', detail: 'En curso', life: 3000 });
          this.timezoneService.insertTimeZone(this.newTimeZone).subscribe({
            next: (u: any) => {

              this.getData()
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Crear Franja Horaria', detail: 'Completado', life: 3000 });
                
                this.updateEvent.emit()
                setTimeout(() => {
    
             
                   this.cerrar()
                }, 100)
          }, 1000);

            },
            error: (err) => {

              this.messageService.add({ severity: 'error', summary: 'Crear Franja Horaria', detail: 'Cancelado', life: 3000 });
            }
          })
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Crear Franja Horaria', detail: 'Horarios de franja ya registrados anteriormente', life: 3000 });

        }
      }

    }
  }
  validarCampos(): Boolean {

    let valido = true
    if (this.horaInicio.hora == null || this.horaFin.hora == null) {
      this.estiloValidacionHoras = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Horas introdudas incorrectamente', life: 3000 });
    }
    if (this.horaInicio.minuto == null || this.horaFin.minuto == null) {
      this.estiloValidacionHoras = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Minutos introducidos incorrectamente', life: 3000 });
    }
    if (this.horaInicio.hora.numero > this.horaFin.hora.numero) {
      this.estiloValidacionHoras = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Horas introdudas incorrectamente', life: 3000 });
    } else {
      if (this.horaInicio.hora.numero == this.horaFin.hora.numero && this.horaInicio.minuto.numero > this.horaFin.minuto.numero) {
        this.estiloValidacionMinutos = 'ng-invalid ng-dirty'
        valido = false
        this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Minutos introdudos incorrectamente', life: 3000 });
      } else {
        if (this.horaInicio.hora.numero == this.horaFin.hora.numero && this.horaInicio.minuto.numero == this.horaFin.minuto.numero) {
          this.estiloValidacionMinutos = 'ng-invalid ng-dirty'
          valido = false
          this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Minutos introdudos incorrectamente', life: 3000 });
        } else {
          this.estiloValidacionMinutos = ''
          this.estiloValidacionHoras = ''
          if(this.selectedDays.length==0){
            this.estilosValidacionesDias = 'ng-invalid ng-dirty'
            valido = false
            this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Debe introducir al menos un dia', life: 3000 });
          }

        }
      }
    }
    return valido
  }


  comprobarCompatibilidad(): boolean {
    let valido = true;
    for (const t of this.timeZoneList) {
      if (this.hasSameDay(t.days!)) {
        let [newStartHour, newStartMinute] = this.newTimeZone.start.split(':').map(Number);
        let [newEndHour, newEndMinute] = this.newTimeZone.end.split(':').map(Number);
        let [existingStartHour, existingStartMinute] = t.start.split(':').map(Number);
        let [existingEndHour, existingEndMinute] = t.end.split(':').map(Number);
  
        let newStartTime = newStartHour * 60 + newStartMinute;
        let newEndTime = newEndHour * 60 + newEndMinute;
        let existingStartTime = existingStartHour * 60 + existingStartMinute;
        let existingEndTime = existingEndHour * 60 + existingEndMinute;
  
        if ((newStartTime < existingEndTime && newEndTime > existingStartTime) &&
            !((newStartTime === existingEndTime || newEndTime === existingStartTime))) {
          valido = false;
          break;
        }
      }
    }
    return valido;
  }
  
  hasSameDay(list:Array<Day>):Boolean{
    let result = false
    let i =0
    let numbers=this.getNumbersOfDays(this.newTimeZone.days!)

    while(!result && i<list.length){
      if(numbers.includes( list[i].number)){
        result=true
      }
      i++
    }
    return result
  }

  getNumbersOfDays(list:Array<Day>):Array<number>{
    let numbers:Array<number>=[]

    for (const day of list){
      numbers.push(day.number)
    }

    return numbers
  }
  getData(){
    this.subscription = this.timezoneService.getAllTimeZonesOfCompany(this.authService.getCompany()).subscribe({
      next: (data => {
        this.timeZoneList = data
        
      }),
      error: (error => {

      })
    })
  }

}