import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';

import { TreeNode } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../interfaces/assignment';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { RateUserAssingmentComponent } from '../rate-user-assingment/rate-user-assingment.component';
import { Volume } from '../../interfaces/volume';
import { ButtonModule } from 'primeng/button';
import { InsertExpectedVolumeComponent } from '../insert-expected-volume/insert-expected-volume.component';
@Component({
  selector: 'app-list-expected-volume',
  standalone: true,
  imports: [DialogModule,AccordionModule,TableModule,RateUserAssingmentComponent,ButtonModule,InsertExpectedVolumeComponent],
  templateUrl: './list-expected-volume.component.html',
  styleUrl: './list-expected-volume.component.css'
})
export class ListExpectedVolumeComponent {
  constructor(){

  }
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
 @Input() volumeList:Array<Volume>=[]
  @Input() textHeader='Volumen Esperado'
  editModalVisible=false
  @Input() tipo =0
  @Input() withButton=true
  ngOnInit() {
  }
  cerrar(): void {
    this.cerrarModal.emit();
   }
   showDialog() {
    console.log(this.volumeList)
    setTimeout(() => {

      this.visible = true;
    }, 100);
   }

  
}
