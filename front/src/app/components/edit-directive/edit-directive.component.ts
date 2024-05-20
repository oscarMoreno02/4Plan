
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
import { TimeZone } from '../../interfaces/time-zone';
import { AuthService } from '../../services/auth.service';
import { TimeZoneService } from '../../services/time-zone.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { WorkDirective } from '../../interfaces/directives';
import { DirectivesService } from '../../services/directives.service';
import { WorkPosition } from '../../interfaces/work-position';
import { PositionService } from '../../services/position.service';
import { Messsage } from '../../interfaces/messsage';
import { AreaService } from '../../services/area.service';
import { WorkArea } from '../../interfaces/work-area';

@Component({
  selector: 'app-edit-directive',
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
  templateUrl: './edit-directive.component.html',
  styleUrl: './edit-directive.component.css'
})
export class EditDirectiveComponent {
  constructor(
    public messageService: MessageService,
    private directiveService: DirectivesService,
    public authService: AuthService,
    private positionService: PositionService,
    private areaService:AreaService
  ) { }


  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() idDirective: number = 0
  value = ''
  subscription: Subscription = new Subscription;
  positionsList: Array<WorkPosition> = []
  areasList:Array<WorkArea>=[]
  editDirective: WorkDirective = { expectedValuation: 0, idCompany: this.authService.getCompany(), idPosition: 0, idParameter: 0, id: 0,idArea:0 }
  styleValidPosition = ''
  styleValidArea=''

  ngOnInit(): void {
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
  showDialog(id: number) {
    this.directiveService.getDirective(id).subscribe({
      next: (data => {
        this.editDirective = data
        console.log(this.editDirective)
        this.visible = true;

      }),
      error: (error => {

      })
    })
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
  guardar(confirm: Boolean) {
    if (confirm) {
      if (this.validarCampos()) {
        this.editDirective.idPosition = this.editDirective.position!.id!
        this.editDirective.idArea=this.editDirective.position!.id!
        this.messageService.add({ severity: 'info', summary: 'Editar Directiva', detail: 'En curso', life: 3000 });
        this.directiveService.updateDirective(this.editDirective).subscribe({
          next: (u: any) => {
            console.log(this.editDirective)
            console.log(u)
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Editar Directiva', detail: 'Completado', life: 3000 });
              setTimeout(() => {
                console.log(this.editDirective)
                 window.location.reload()
              }, 1000);
            }, 2000);

          },
          error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Editar Directiva', detail: 'Cancelado', life: 3000 });
          }
        })
      }

    }
  }
  eliminar(b: Boolean) {
    this.messageService.add({ severity: 'info', summary: 'Eliminar Directiva', detail: 'En curso', life: 3000 });
    this.directiveService.deleteDirective(this.editDirective.id!).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.visible = false
          this.messageService.add({ severity: 'success', summary: 'Eliminar Directiva', detail: 'Completado', life: 3000 });
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Eliminar directiva', detail: 'Cancelado', life: 3000 });
      }
    })
  }
  validarCampos():Boolean{
    let valido = true
   if(!this.editDirective.position){
     this.styleValidPosition='ng-invalid ng-dirty'
     valido=false
     this.messageService.add({ severity: 'warn', summary: 'Crear Directiva', detail: 'Posicion de trabajo no especificado', life: 3000 });
   }else{
     this.styleValidPosition=''

    }
    if(!this.editDirective.area){
      this.styleValidArea='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Directiva', detail: 'Area de trabajo no especificada', life: 3000 });
    }else{
      this.styleValidArea=''
 
     }
    
     return valido
 }



}
