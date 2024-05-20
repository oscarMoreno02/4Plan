
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
import { Volume } from '../../interfaces/volume';
import { VolumeService } from '../../services/volume.service';

@Component({
  selector: 'app-insert-expected-volume',
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
  encapsulation:ViewEncapsulation.None,
  templateUrl: './insert-expected-volume.component.html',
  styleUrl: './insert-expected-volume.component.css'
})
export class InsertExpectedVolumeComponent {
  constructor(
    public messageService: MessageService,
    public volumeService: VolumeService,
  ) { }

  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<Messsage>();
  @Input() volume!: Volume
  @Input() textHeader='Modificar Volumen Esperado'
  newExpectedVolume = 0
  newReachedVolume = 0
  subscription: Subscription = new Subscription;
  styleValidVolume = ''


  ngOnInit(): void {

    this.newExpectedVolume=this.volume.volumeExpect
    this.newReachedVolume=this.volume.reachedVolume

  }
  showDialog() {
    this.visible = true;
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
  crear(confirm: Boolean) {
    if(confirm){
      let auxExpect=this.volume.volumeExpect
      let auxReached=this.volume.reachedVolume
      this.volume.volumeExpect=this.newExpectedVolume
      this.volume.reachedVolume=this.newReachedVolume

      this.volumeService.updateVolume(this.volume).subscribe({
        next:(data=>{
            this.cerrar()
            this.visible=false
        }),
        error:(err)=>{
          this.volume.volumeExpect=auxExpect
          this.volume.reachedVolume=auxReached
        }
      })
    }
  }
  validarCampos(): Boolean {
    let valido = true
    return valido
  }
 
}
