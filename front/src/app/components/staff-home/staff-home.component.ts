import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkDayService } from '../../services/work-day.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { WorkDay } from '../../interfaces/work-day';
import { Assignment } from '../../interfaces/assignment';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [ToastModule,TableModule,ButtonModule],
  providers:[MessageService],
  templateUrl: './staff-home.component.html',
  styleUrl: './staff-home.component.css',
  encapsulation:ViewEncapsulation.None
})
export class StaffHomeComponent implements OnInit{
constructor(private workdayService:WorkDayService,private authService:AuthService){}
subscription=new Subscription
workDayList:Array<WorkDay>=[]
nextDays:Array<any>=[]
ngOnInit(){
  this.subscription=this.workdayService.getNextDaysOfUser(this.authService.getUid()).subscribe({

    next:(workdays)=>{
      
      this.workDayList=workdays
      let today=new Date()
      for (let i =0 ; i<5;i++){
        let day=new Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()))
        day.setDate(day.getDate() + i);
        console.log(day)
        let msg=['Sin Asignaciones']
        let date=day.getFullYear()+'-'+(day.getMonth()+1)+'-'+(day.getDate())
        let exist=false
        for (const workDay of this.workDayList){
          
          let auxDate:any=new Date(workDay.date)
         let  auxDateStr=auxDate.getFullYear()+'-'+(auxDate.getMonth()+1)+'-'+(auxDate.getDate())

          if(auxDateStr==date){
            exist=true
            this.nextDays.push(
              {
                day:day.getDate(),
                month:this.getMonth(auxDateStr),
                dayOfWeek:this.getDayName(auxDateStr),
                msg:this.getMsg(workDay.dayAssignments!),
                type:workDay.dayAssignments![0].type
              })
            break
          }
        }
        if(!exist){
         
          this.nextDays.push(
            {
              day:day.getDate(),
              month:this.getMonth(date),
              dayOfWeek:this.getDayName(date),
              msg:msg,
              type:-1
            })
         
        }
      }
      console.log(this.nextDays)
    }
  }
  )
}
 getDayName(dateString:string) {
  const date = new Date(dateString);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return days[date.getDay()];
};

getMonth(dateString:string){
  const date = new Date(dateString);
  const months = [
    'Enero',
    'Febrero',
    'Marzo', 
    'Abril', 
    'Mayo', 
    'Junio', 
    'Julio',
    'Agosto',
    'Septiembre',
    'Obtubre',
    'Noviembre',
    'Diciembre'
  
  ];

  return months[date.getMonth()];
}
getMsg(assignments:Array<Assignment>):Array<string>{
  let msg=[]
  for (const assignment of assignments){
      if(assignment.type==1){
        return ['Dia Libre']
      }
      if(assignment.type==2){
        return ['Vacaciones']
      }
      msg.push(assignment.start+' - '+assignment.end)
  }
  return msg
}
}
