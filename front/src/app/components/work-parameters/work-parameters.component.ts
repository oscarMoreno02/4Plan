import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { WorkParameter } from '../../interfaces/work-parameter';
import { WorkParametersService } from '../../services/work-parameters.service';
import { Subscription } from 'rxjs';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { TableModule } from 'primeng/table';
import { NewWorkPameterComponent } from '../new-work-pameter/new-work-pameter.component';
import { EditWorkPameterComponent } from '../edit-work-pameter/edit-work-pameter.component';
import { Button, ButtonModule } from 'primeng/button';
import { DirectivesListComponent } from '../directives-list/directives-list.component';
import { TimeZoneListComponent } from '../time-zone-list/time-zone-list.component';
import { Day } from '../../interfaces/time-zone';

@Component({
  selector: 'app-work-parameters',
  standalone: true,
  imports: [CabeceraComponent,TableModule,NewWorkPameterComponent,EditWorkPameterComponent,ButtonModule,DirectivesListComponent,TimeZoneListComponent],
  templateUrl: './work-parameters.component.html',
  styleUrl: './work-parameters.component.css'
})
export class WorkParametersComponent implements OnInit {
constructor(public authService:AuthService,private workParameterService:WorkParametersService){

}

workParametersList:Array<WorkParameter>=[]
subscripcion=new Subscription()

ngOnInit(): void {
  this.subscripcion=this.workParameterService.getAllWorkParametersWithTimeZoneOfCompany(this.authService.getCompany()).subscribe({
    next:(data:Array<WorkParameter>)=>{
      this.workParametersList=data
      console.log(this.workParametersList)

    },
    error:(err)=>{
      
    }
  })
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
}
