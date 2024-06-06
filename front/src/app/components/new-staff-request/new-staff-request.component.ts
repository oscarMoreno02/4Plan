
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
import { CalendarModule } from 'primeng/calendar';
import { StaffRequestService } from '../../services/staff-request.service';
import { StaffRequest } from '../../interfaces/staff-request';

@Component({
  selector: 'app-new-staff-request',
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
    CalendarModule
  ],
  providers: [DialogService, MessageService],
  templateUrl: './new-staff-request.component.html',
  styleUrl: './new-staff-request.component.css'
})
export class NewStaffRequestComponent {
  typeStyle: string='';
  dateStyle: string='';
  constructor(
    public messageService: MessageService,
    private staffRequestService:StaffRequestService,
    public authService: AuthService,
 
  ) { }
  expand = false
  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<Messsage>();

  @Input() buttonText: string = 'Añadir'
  @Input() buttonColor: string = 'success'
  @Input() requestList: Array<StaffRequest> = []

  subscription: Subscription = new Subscription;

  maxDate = new Date()
  date!: Date|null
  typeSelected!:any
  typeList=[{text:'Dia Libre',value:1},{text:'Vacaciones',value:2}]
  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 1)

  }
  showDialog() {
    this.visible = true;
  }

  cerrar(): void {
    this.date=null
    this.typeSelected=null
    this.visible = false
    this.cerrarModal.emit();
  }
  crear(confirm: Boolean) {
    if (confirm) {

      if (this.validarCampos()) {
        let parsedDate=this.date!.getFullYear()+'-'+(this.date!.getMonth()+1)+'-'+this.date!.getDate()
        let request:StaffRequest=
        {
          idUser:this.authService.getUid(),
          idCompany:this.authService.getCompany(),
          type:this.typeSelected.value,status:0,
          date:parsedDate
        }

          this.staffRequestService.insertStaffRequest( request  ).subscribe({
              next:(data)=>{
                  request=data
                  this.requestList.push(request)
                  console.log(this.requestList)
                  this.sendMessage.emit({ severity: 'success', summary: 'Nueva Petición', detail: 'Completada', life: 3000 });
                  this.cerrar()

              },
              error:(err)=>{
                this.sendMessage.emit({ severity: 'error', summary: 'Nueva Petición', detail: 'Error', life: 3000 });

              }
            })
      }

    }
  }


  validarCampos(): Boolean {
   

    if(this.date==null){
      this.dateStyle='ng-invalid ng-dirty'
      this.sendMessage.emit({ severity: 'warn', summary: 'Nueva Petición', detail: 'Debe seleccionar una fecha para la petición', life: 3000 });
      return false
    }
    this.dateStyle=''
    if(this.typeSelected==null){
      this.typeStyle='ng-invalid ng-dirty'
      this.sendMessage.emit({ severity: 'warn', summary: 'Nueva Petición', detail: 'Debe seleccionar el tipo de petición', life: 3000 });
      return false
    }

    this.typeStyle=''
    return true
  }


}
