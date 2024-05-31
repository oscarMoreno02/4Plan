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
@Component({
  selector: 'app-list-work-day-rates',
  standalone: true,
  imports: [DialogModule,AccordionModule,TableModule,RateUserAssingmentComponent],
  templateUrl: './list-work-day-rates.component.html',
  styleUrl: './list-work-day-rates.component.css'
})
export class ListWorkDayRatesComponent {
  constructor(public authService:AuthService,private userService:UserService){

  }
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();

 @Input() userList:Array<User>=[]
  subscripcion=new Subscription()
  newModalVisible={value:false}
  editModalVisible={value:false}
  editTimeZoneId=0
  nodes:TreeNode[]=[]


  ngOnInit() {
    
  }
  cerrar(): void {
    this.cerrarModal.emit();
   }


   showDialog() {
    
    setTimeout(() => {

      this.visible = true;
    }, 100);
   }


   changeNewModalVisibility() {
    this.newModalVisible.value=!this.newModalVisible.value
  }


  changeEditModalVisibility() {
   
    this.editModalVisible.value=!this.editModalVisible.value

  }
  totalHoursWorked(assignments:Array<Assignment>):number{
    let total:any=0

    for (const assignment of assignments){
      let start=new Date('2024-05-15T'+assignment.start)
      let end =new Date('2024-05-15T'+assignment.end)
      total+=end.getTime()-start.getTime();
  
    }
    
    return total / (1000 * 60 * 60);


  }
  
}
