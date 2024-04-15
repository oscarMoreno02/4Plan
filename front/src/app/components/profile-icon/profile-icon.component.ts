import { Component, Input, OnChanges, OnInit, SimpleChanges,Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
// import { UsersService } from '../../services/users.service';
// import { Users } from '../../interface/users';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [ToastModule,SplitButtonModule,DialogModule,FormsModule,ConfirmComponent],
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.css',
  providers: [ MessageService,AuthService ],
  encapsulation:ViewEncapsulation.None
})
export class ProfileIconComponent implements OnInit {
  @Input() access:Array<string>=[]
  items: MenuItem[]=[
    { separator: true },
    {
    label: 'Notificaciones', 
    icon: 'pi pi-inbox', 
    command: () => {
    this.servicioAutenticacion.logout()}
    },
    {
    label: 'Cerrar Sesion', 
    icon: 'pi pi-power-off', 
    command: () => {
    this.servicioAutenticacion.logout()}
    }


  ];
  @Input() nombre='usuario'
  constructor(private messageService: MessageService, private servicioAutenticacion:AuthService,
    ) {

  }

  // value = ''
  // us!:Users
  // usuarios: Users = { 
  //   id: 0, 
  //   nombre: '', 
  //   email: '', 
  //   password: '' 
  // }
  @Input() usuario?: any
  @Input() id!: number
  subscripcionUsuarios:Subscription = new Subscription();

  @Input() visible: boolean = false

  @Output() cerrarModal = new EventEmitter<void>();

  @Input() tipo=0

  estiloValidacionNombre = ''
  estiloValidacionCorreo = ''
  estiloValidacionContrasena = ''



ngOnInit(): void {
 this.nombre=this.servicioAutenticacion.getName()
 this.access=this.servicioAutenticacion.getAccess()
 this.id = this.servicioAutenticacion.getUid()
}


  


  // validaciones():Boolean{

  //   let validado = true
  //   let nombreRegex = /^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+([\s-][A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/
  //   let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  //   if (this.usuarios.nombre){

  //     var nombrePrueba = nombreRegex.test(this.usuarios.nombre)
      
  //     if (nombrePrueba){
  //       this.estiloValidacionNombre
  //     }else{
  //       this.estiloValidacionNombre = 'ng-invalid ng-dirty'
  //       validado = false
  //       this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El nombre no puede contener caracteres especiales', life:3000})

  //     }
  //   }else{

  //     this.estiloValidacionNombre = 'ng-invalid ng-dirty'
  //     validado = false
  //     this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El nombre es obligatorio', life:3000})

  //   }

  //   if (this.usuarios.email){

  //     var emailPrueba = emailRegex.test(this.usuarios.email)
      
  //     if (emailPrueba){
  //       this.estiloValidacionCorreo
  //     }else{
  //       this.estiloValidacionCorreo = 'ng-invalid ng-dirty'
  //       validado = false
  //       this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El correo tiene que tener el @', life:3000})

  //     }
  //   }else{

  //     this.estiloValidacionCorreo = 'ng-invalid ng-dirty'
  //     validado = false
  //     this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El correo es obligatorio', life:3000})

  //   }
  //   return validado
  // }


  cerrar(): void {
    this.cerrarModal.emit();
  }

  // async guardar(b:Boolean){
  //   if(b){
  //     if(this.validaciones()){
  //        this.servicioUsers.usuariosPut(this.usuarios,this.id).subscribe({
  //         next: (data:any)=> {
  //           setTimeout(()=>{
  //             this.messageService.add({severity:'success', summary:'Actualizar usuario', detail:'Completada', life:3000})
            
  //             for(let i=0;i<this.usuario.length;i++){
  //               if(this.usuario[i].id == this.usuarios.id){
               
  //                 this.usuario[i]=this.usuarios
  //                 this.visible=false
  //               }
  //               this.visible=false
  //             }
  //           }, 1000)
  //         },
  //         error: (err) => {
      
  //           this.messageService.add({ severity:'error', summary: 'Actualizar usuario', detail: 'Error al actualizar el usuario, inténtelo de nuevo', life: 3000 });
  //         }
  //       })
  //     }
  //   }
  // }

  showDialog(){
  //   this.servicioUsers.usuarioGet(this.id!).subscribe({
      
  //     next: (usu:Users) => {
  //       this.us = usu
  //       this.visible=true
  //       this.usuarios.nombre = usu.nombre
  //       this.usuarios.email = usu.email
  //       this.usuarios.password = usu.password
  //     },
  //     error: (e) => {
      
  //     }
  //   })
  }
}
