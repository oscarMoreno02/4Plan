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
import { TimeZone } from '../../interfaces/time-zone';
import { Subscription } from 'rxjs';
import { WorkParametersService } from '../../services/work-parameters.service';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UserService } from '../../services/user.service';
import { UnregisterRequest } from '../../interfaces/unregister-request';
import { UnregisterRequestService } from '../../services/unregister-request.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-edit-empoyee',
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
  templateUrl: './edit-empoyee.component.html',
  styleUrl: './edit-empoyee.component.css'
})
export class EditEmpoyeeComponent {
  constructor(
    public messageService: MessageService,
    public authService: AuthService,
    private userService: UserService,
    private unregisterService: UnregisterRequestService

  ) { }
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() user!: User

  subscription: Subscription = new Subscription;
    accessList=[{value:'owner',text:'Gerente'},{value:'manager',text:'Encargado'},{value:'staff',text:'Empleado'}]
    newSalary:number|null=0
    newHours:number| null=0
    newAccess:any
    styleHours=''
    styleSalary=''
    styleAccess=''
    unregisterRequestActive:null | UnregisterRequest=null
  ngOnInit(): void {
  
    this.newHours=this.user.hiredHours
    this.newSalary=this.user.salary

    for(const access of this.accessList){
      if (access.value==this.user.access) this.newAccess=access
    }
    this.subscription=this.unregisterService.getAllUnregisterRequestsActiveByUser(this.user.id).subscribe({
      next:(request)=>{
        if(request.length>0){
          this.unregisterRequestActive=request
        }

      },
      error:(err)=>{

      }
    })
  }

  showDialog() {
    this.visible = true;
  }

  cerrar(): void {
    this.cerrarModal.emit();
    this.visible=false
  }

  editar(confirm: Boolean) {
    if (confirm) {
      if (this.validarCampos()) {
      let  auxSalary:number|null=this.user.salary
      let  auxHours:number| null=this.user.hiredHours
      let  auxAccess=this.user.access
      this.user.salary=this.newSalary
      this.user.access=this.newAccess.value
      this.user.hiredHours=this.newHours

      this.userService.updateUser(this.user).subscribe({
        next:(data)=>{
          this.messageService.add({ severity: 'success', summary: 'Editar usuario', detail: 'Completado', life: 3000 });
          this.cerrar()
        },
        error:(err)=> {
          this.user.access=auxAccess
          this.user.hiredHours=auxHours
          this.user.salary=auxSalary
        },
      })
      }
    }

  }
  sendUnregisterRequest(confirm: Boolean) {
    if(confirm){
      if(this.unregisterRequestActive==null){
        let newRequest:UnregisterRequest={idCompany:this.authService.getCompany(),idUser:this.user.id,status:0,idProcessor:null}
        this.unregisterService.insertUnregisterRequest(newRequest).subscribe({
          next:(data)=>{
            this.messageService.add({ severity: 'success', summary: 'Solicitud de baja', detail: 'Realizada', life: 3000 });
            newRequest.id=data.id
            this.unregisterRequestActive=newRequest
            this.cerrar()
          },
          error:(err)=>{
            this.messageService.add({ severity: 'danger', summary: 'Solicitud de baja', detail: 'Cancelada', life: 3000 });
            
          }
        })
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Solicitud de baja', detail: 'Ya existe una solicitud en tramite', life: 3000 });

      }
    }
  }
  validarCampos(): Boolean {


      if(!this.newAccess){
        this.messageService.add({ severity: 'warn', summary: 'Editar usuario', detail: 'Acceso de usuario no seleccionado', life: 3000 });
        this.styleAccess='ng-invalid ng-dirty'
        return false
      }
      this.styleAccess=''
      if((!this.newHours || isNaN(this.newHours )) && this.newAccess.value!='owner'){
        this.messageService.add({ severity: 'warn', summary: 'Editar usuario', detail: 'Horas de contrato no indicadas', life: 3000 });
        this.styleHours='ng-invalid ng-dirty'
        return false
      }
      this.styleHours=''

      if((!this.newSalary || isNaN(this.newSalary ) )&& this.newAccess.value!='owner'){
        this.messageService.add({ severity: 'warn', summary: 'Editar usuario', detail: 'Salario del trabajador no indicado', life: 3000 });
        this.styleSalary='ng-invalid ng-dirty'
        return false
      }
      this.styleSalary=''



    return true
  }



}
