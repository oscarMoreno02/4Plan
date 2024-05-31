
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { WorkDirective } from '../../interfaces/directives';
import { WorkArea } from '../../interfaces/work-area';
import { WorkPosition } from '../../interfaces/work-position';
import { AreaService } from '../../services/area.service';
import { AuthService } from '../../services/auth.service';
import { PositionService } from '../../services/position.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { RegisterRequest } from '../../interfaces/register-request';
import { Messsage } from '../../interfaces/messsage';
import { RegisterRequestService } from '../../services/register-request.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-new-register-request',
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
  templateUrl: './new-register-request.component.html',
  styleUrl: './new-register-request.component.css'
})
export class NewRegisterRequestComponent {
  constructor(
    public messageService: MessageService,
    private userService: UserService,
    public authService:AuthService,
    private requestService:RegisterRequestService
    ) {}

 @Input() visible: boolean = false;
 @Input() tipo=0
 @Output() cerrarModal = new EventEmitter<void>();
 @Input() areaList:Array<WorkArea>=[]
 @Output() sendMessage = new EventEmitter<Messsage>();
@Input() requestList:Array<RegisterRequest>=[]

  newRequest:RegisterRequest={idCompany:this.authService.getCompany(),newFirstName:'',newLastName:'',newSalary:0,newHiredHours:0,newEmail:'',idProcessor:null,status:0}
  subscription: Subscription=new Subscription;
  positionsList:Array<WorkPosition>=[]
  styleValidValue=''
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

 ngOnInit(): void {

 }
 showDialog() {
     this.visible = true;
 }

cerrar(): void {
  this.newRequest= {idCompany:this.authService.getCompany(),newFirstName:'',newLastName:'',newSalary:0,newHiredHours:0,newEmail:'',idProcessor:null,status:0}
 this.cerrarModal.emit();
}

 async crear(confirm:Boolean){
  if(confirm){
    if(this.validarCampos()){
      if(await this.validarUnico()){
        this.requestService.insertRegisterRequest(this.newRequest).subscribe({
          next:(data)=>{
            this.newRequest.id=data.id
            this.requestList.unshift(this.newRequest)
            this.sendMessage.emit({ severity: 'success', summary: 'Nueva Solicitud', detail: 'Completada', life: 3000 });

            this.cerrar()
          }
        })
  }else{
    this.sendMessage.emit({ severity: 'warn', summary: 'Nueva Solicitud', detail: 'Email en uso', life: 3000 });

  }
   }
  
}
}
 validarCampos():Boolean{
   if(this.newRequest.newFirstName.split(' ').join('').length<3){
    this.sendMessage.emit({ severity: 'warn', summary: 'Nueva Solicitud', detail: 'Tamaño de nombre incorrecto', life: 3000 });
    return false
   }
   if(this.newRequest.newLastName.split(' ').join('').length<3){
    this.sendMessage.emit({ severity: 'warn', summary: 'Nueva Solicitud', detail: 'Tamaño de apellidos incorrecto', life: 3000 });
    return false

   }
   if(!this.emailRegex.test(this.newRequest.newEmail)){
    this.sendMessage.emit({ severity: 'warn', summary: 'Nueva Solicitud', detail: 'Formato de email incorrecto', life: 3000 });
    return false


   }
     return true
 }
 async validarUnico():Promise<boolean>{
  let userRegistered= await this.getUserRegistered(this.newRequest.newEmail)
    if(userRegistered.length>0){
      return false
    }
  return true
 }
  
 async getUserRegistered(email:string) {
  return new Promise<Array<User>>((resolve, reject) => {
    this.userService.getUserByEmail(email).subscribe({      
      next: (user: Array<User>) => {
        resolve(user);
      },
      error: (error) => {
        reject(error);
      }
    });
  });

}
}
