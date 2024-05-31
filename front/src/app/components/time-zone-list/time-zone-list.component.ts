import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';

import { TimeZoneService } from '../../services/time-zone.service';
import { Day, TimeZone } from '../../interfaces/time-zone';
import { NewTimeZoneComponent } from '../new-time-zone/new-time-zone.component';
import { EditTimeZoneComponent } from '../edit-time-zone/edit-time-zone.component';

@Component({
  selector: 'app-time-zone-list',
  standalone: true,
  imports: [DialogModule,ButtonModule,DataViewModule,TableModule,NewTimeZoneComponent,EditTimeZoneComponent],
  templateUrl: './time-zone-list.component.html',
  styleUrl: './time-zone-list.component.css'
})
export class TimeZoneListComponent {
  
  constructor(public authService:AuthService,private timeZone:TimeZoneService){}

  
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();

  timezonesList:Array<TimeZone>=[]
  subscripcion=new Subscription()
  newModalVisible={value:false}
  editModalVisible={value:false}
  editTimeZoneId=0


  ngOnInit(): void {
    this.getUpdate()
  }


  cerrar(): void {
    this.cerrarModal.emit();
   }


   showDialog() {
       this.visible = true;
   }


   changeNewModalVisibility() {
    this.newModalVisible.value=!this.newModalVisible.value
  }


  changeEditModalVisibility() {
   
    this.editModalVisible.value=!this.editModalVisible.value

  }

 getDays(dayList:Array<Day>):string{
  let dayStr=''


  for (let i=0 ;i<dayList.length;i++){
    dayStr+=' '+dayList[i].name.substring(0,3)
    if(i!=(dayList.length-1)){
      dayStr+=','
    }
  }

  return dayStr
 }

 getUpdate(){
  this.subscripcion=this.timeZone.getAllTimeZonesOfCompany(this.authService.getCompany()).subscribe({
    next:(data:Array<TimeZone>)=>{
      this.timezonesList=data
      console.log(this.timezonesList)

    },
    error:(err)=>{
      
    }
  })
 }
}
