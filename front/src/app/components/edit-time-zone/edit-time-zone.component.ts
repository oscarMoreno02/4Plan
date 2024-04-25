import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Day, TimeZone } from '../../interfaces/time-zone';
import { Subscription } from 'rxjs';
import { TimeZoneService } from '../../services/time-zone.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmComponent } from '../confirm/confirm.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-edit-time-zone',
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
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule
  ],

  providers: [DialogService, MessageService],
  encapsulation:ViewEncapsulation.None,
  templateUrl: './edit-time-zone.component.html',
  styleUrl: './edit-time-zone.component.css'
})
export class EditTimeZoneComponent {
  constructor(
    public messageService: MessageService,
    public authService: AuthService,
    private timezoneService: TimeZoneService
  ) {

    this.days = this.backUp
  
   }
  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() idParameter: number = 0
  value = ''
  subscription: Subscription = new Subscription;
  timeZoneList: Array<TimeZone> = []

  editTimeZone: TimeZone = { start: '00', end: '00', idCompany: this.authService.getCompany() }
  days!: Day[];
  backUp: Day[]= [
    {name: 'Lunes', number: 2,checked:false},
    {name: 'Martes', number: 3,checked:false},
    {name: 'Miercoles', number: 4,checked:false},
    {name: 'Jueves', number: 5,checked:false},
    {name: 'Viernes', number: 6,checked:false},
    {name: 'Sabado', number: 7,checked:false},
    {name: 'Domingo', number: 1,checked:false}];
  selectedDays: Day[]=[];

  horaInicio = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horaFin = { hora: { valor: '00', numero: 0 }, minuto: { valor: '00', numero: 0 } }
  horas = [{ valor: '00', numero: 0 }]
  minutos = [{ valor: '00', numero: 0 }]


  estiloValidacionHoras = ''
  estiloValidacionMinutos = ''
  estilosValidacionesDias: string='';





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

    this.editTimeZone = { start: '00', end: '00', idCompany: this.authService.getCompany() }
    this.subscription = this.timezoneService.getAllTimeZonesOfCompany(this.authService.getCompany()).subscribe({
      next: (data => {
        this.timeZoneList = data
        
      }),
      error: (error => {
        
      })
    })

  }
  showDialog(id:number) {
    this.days=this.backUp
    this.selectedDays=[]
    for (const t of this.timeZoneList){
      if(t.id==id){
        this.editTimeZone=t
        this.parsearDatos(this.editTimeZone.start,this.editTimeZone.end)
      }

    }
    for (const day of this.days){
        let isSelect=false
        let i=0
        while (!isSelect && i<this.editTimeZone.days!.length){
          if(day.number==this.editTimeZone.days![i].number){
            isSelect=true
          }
          i++
        }

        day.checked=isSelect
    }

    this.visible = true;
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
  editar(confirm: Boolean) {
    if (confirm) {
      this.addDays()
      if (this.validarCampos()) {
        this.editTimeZone.end = this.horaFin.hora.valor + ':' + this.horaFin.minuto.valor
        this.editTimeZone.start = this.horaInicio.hora.valor + ':' + this.horaInicio.minuto.valor
        this.editTimeZone.days=this.selectedDays
        if (this.comprobarCompatibilidad()) {
         
          
          this.messageService.add({ severity: 'info', summary: 'Editar Franja Horaria', detail: 'En curso', life: 3000 });
          this.timezoneService.updateTimeZone(this.editTimeZone).subscribe({
            next: (u: any) => {

              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Editar Franja Horaria', detail: 'Completado', life: 3000 });
                setTimeout(() => {
                   window.location.reload()
                }, 1000);
              }, 2000);

            },
            error: (err) => {

              this.messageService.add({ severity: 'error', summary: 'Editar Franja Horaria', detail: 'Cancelado', life: 3000 });
              this.selectedDays=[]
            }
          })
        } else {
          this.selectedDays=[]
          this.messageService.add({ severity: 'warn', summary: 'Editar Franja Horaria', detail: 'Horarios de franja ya registrados anteriormente', life: 3000 });

        }
      }else{
        this.selectedDays=[]
      }

    }
  }
  validarCampos(): Boolean {

    let valido = true
    if (this.horaInicio.hora == null || this.horaFin.hora == null) {
      this.estiloValidacionHoras = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Editar Franja', detail: 'Horas introdudas incorrectamente', life: 3000 });
    }
    if (this.horaInicio.minuto == null || this.horaFin.minuto == null) {
      this.estiloValidacionHoras = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Editar Franja', detail: 'Minutos introducidos incorrectamente', life: 3000 });
    }
    if (this.horaInicio.hora.numero > this.horaFin.hora.numero) {
      this.estiloValidacionHoras = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Editar Franja', detail: 'Horas introdudas incorrectamente', life: 3000 });
    } else {
      if (this.horaInicio.hora.numero == this.horaFin.hora.numero && this.horaInicio.minuto.numero > this.horaFin.minuto.numero) {
        this.estiloValidacionMinutos = 'ng-invalid ng-dirty'
        valido = false
        this.messageService.add({ severity: 'warn', summary: 'Editar Franja', detail: 'Minutos introdudos incorrectamente', life: 3000 });
      } else {
        if (this.horaInicio.hora.numero == this.horaFin.hora.numero && this.horaInicio.minuto.numero == this.horaFin.minuto.numero) {
          this.estiloValidacionMinutos = 'ng-invalid ng-dirty'
          valido = false
          this.messageService.add({ severity: 'warn', summary: 'Editar Franja', detail: 'Minutos introdudos incorrectamente', life: 3000 });
        } else {
          this.estiloValidacionMinutos = ''
          this.estiloValidacionHoras = ''
          if(this.selectedDays.length==0){
            this.estilosValidacionesDias = 'ng-invalid ng-dirty'
            valido = false
            this.messageService.add({ severity: 'warn', summary: 'Editar Franja', detail: 'Debe introducir al menos un dia', life: 3000 });
          }

        }
      }
    }
    return valido
  }


  comprobarCompatibilidad(): boolean {
    let valido = true;
    for (const t of this.timeZoneList) {
      if(t.id!!=this.editTimeZone.id){
        if(this.hasSameDay(t.days!)){
          if ((this.editTimeZone.start >= t.start && this.editTimeZone.start < t.end) ||
          (this.editTimeZone.end > t.start && this.editTimeZone.end <= t.end) ||
          (this.editTimeZone.start <= t.start && this.editTimeZone.end >= t.end)) {
            valido = false;
            break;
          }
        }
      }
    }


    return valido;
}
  hasSameDay(list:Array<Day>):Boolean{
    let result = false
    let i =0
    let numbers=this.getNumbersOfDays(this.editTimeZone.days!)

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
  eliminar(b:Boolean){
    this.messageService.add({ severity: 'info', summary: 'Eliminar Franja Horaria', detail: 'En curso', life: 3000 });
    this.timezoneService.deleteTimeZone(this.editTimeZone.id!).subscribe({
      next:(data:any)=>{
        setTimeout(() => {
                this.visible=false
                this.messageService.add({ severity: 'success', summary: 'Eliminar Franja Horaria', detail: 'Completado', life: 3000 });
                setTimeout(() => {
                window.location.reload()
              }, 1000);
            }, 1000); 
      },
        error: (err) => {
          this.messageService.add({ severity:'error', summary: 'Eliminar Franja Horaria', detail: 'Cancelado', life: 3000 });
        }
    })
  }
  parsearDatos(horaInicio:string,horaFin:string){

    this.horaInicio.hora={valor:horaInicio.substring(0,2),numero:parseInt(horaInicio.substring(0,2))}
    this.horaInicio.minuto={valor:horaInicio.substring(3,5),numero:parseInt(horaInicio.substring(3,5))}
    this.horaFin.hora={valor:horaFin.substring(0,2),numero:parseInt(horaFin.substring(0,2))}
    this.horaFin.minuto={valor:horaFin.substring(3,5),numero:parseInt(horaFin.substring(3,5))}
  }
  addDays(){
  
    for (const d of this.days){
      if(d.checked){
        this.selectedDays.push({name:d.name,number:d.number})
      }
    }
  }
}
