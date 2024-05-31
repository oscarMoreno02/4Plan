import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { WorkDayService } from '../../services/work-day.service';
import { Subscription, filter } from 'rxjs';
import { WorkDay } from '../../interfaces/work-day';
import { Time } from '@angular/common';
import { Assignment } from '../../interfaces/assignment';

@Component({
  selector: 'app-management-home',
  standalone: true,
  imports: [ButtonModule,TableModule],
  templateUrl: './management-home.component.html',
  styleUrl: './management-home.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ManagementHomeComponent implements OnInit {
constructor(private authService:AuthService,private workdayServie:WorkDayService){

}
today=new Date()
subscription=new Subscription
workday!:WorkDay
eventList!:Array<{time:string,type:number,user:string,position:string,area:string}>
ngOnInit(): void {
  let parsedDate=this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate()
  this.subscription=this.workdayServie.getDayOfCompanyByDate(this.authService.getCompany(),parsedDate).subscribe({
    next:(workday)=>{
    
        this.workday=workday
        console.log(workday)
        if(this.workday  &&this.workday.dayAssignments){
          console.log('llega')
          this.eventList=this.orderEvents(this.workday.dayAssignments)
  
      }
    

    },
    error:()=>{
      this.authService.logout()
    }
  })
}


orderEvents(assignments:Array<Assignment>){
  let list:Array<{time:string,type:number,user:string,position:string,area:string}>=[]
  let filterAssignments=assignments.filter((assignment)=>assignment.idUser!=null &&assignment.type==0)
  if(filterAssignments.length>0){
    console.log(filterAssignments)
    for(const assignment of filterAssignments){
      list.push({time:assignment.start,type:0,user:assignment.user!.firstName+' '+assignment.user!.lastName,position:assignment.position!.description,area:assignment.area!.description})
      list.push({time:assignment.end,type:1,user:assignment.user!.firstName,position:assignment.position!.description,area:assignment.area!.description})
      
    }
  }
  list.sort((a, b) => {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
});
  return list
}
}
