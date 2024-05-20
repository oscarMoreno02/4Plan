import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { WorkArea } from '../../interfaces/work-area';
import { WorkPosition } from '../../interfaces/work-position';
import { AreaService } from '../../services/area.service';
import { AuthService } from '../../services/auth.service';
import { PositionService } from '../../services/position.service';
import { EditAreaPositionComponent } from '../edit-area-position/edit-area-position.component';
import { NewAreaPositionComponent } from '../new-area-position/new-area-position.component';

@Component({
  selector: 'app-list-areas-positions',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    DataViewModule,
    TableModule,
    CommonModule,
    NewAreaPositionComponent,
    EditAreaPositionComponent
  ],
  templateUrl: './list-areas-positions.component.html',
  styleUrl: './list-areas-positions.component.css'
})
export class ListAreasPositionsComponent {
  constructor(public authService:AuthService,private positionService:PositionService,private areaService:AreaService){
    
  }
  selectedButton=1
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  workPositionList:Array<WorkPosition>=[]
  workAreasList:Array<WorkArea>=[]
  subscripcion=new Subscription()
  newModalVisible={value:false}
  editModalVisible={value:false}
  editDirectiveId=0
  ngOnInit(): void {
    this.loadData()
  }
  cerrar(): void {
    this.cerrarModal.emit();
   }
   showDialog() {
   this.loadData()
    this.visible = true;
   }
   changeNewModalVisibility() {
    this.newModalVisible.value=!this.newModalVisible.value
  }
  changeEditModalVisibility() {
   
    this.editModalVisible.value=!this.editModalVisible.value

  }
  changeButtonSelected(button:number){
    this.selectedButton=button
  }

  loadData(){
    this.positionService.getAllWorkPositionsOfCompany(this.authService.getCompany()).subscribe({
      next:(positions:Array<WorkPosition>)=>{
        this.workPositionList=positions
        this.areaService.getAllWorkAreasOfCompany(this.authService.getCompany()).subscribe({
          next:(areas)=>{
            this.workAreasList=areas
          },
          error:(error)=>{
          }
        })
      },
      error:(error)=>{
      }
    })
  }
}
