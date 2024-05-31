import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { AssignmentService } from '../../services/assignment.service';
import { AuthService } from '../../services/auth.service';
import { TableModule } from 'primeng/table';
import { WorkDay } from '../../interfaces/work-day';
import { Subscription } from 'rxjs';
import { WorkDayService } from '../../services/work-day.service';
import { Assignment } from '../../interfaces/assignment';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-staff-week-assignments',
  standalone: true,
  imports: [
    CabeceraComponent,
    TableModule,
    ButtonModule
  ],
  encapsulation:ViewEncapsulation.None,
  templateUrl: './staff-week-assignments.component.html',
  styleUrl: './staff-week-assignments.component.css'
})
export class StaffWeekAssignmentsComponent implements OnInit {
  constructor(
    private router: Router,
    private workDayService: WorkDayService,
    private authService: AuthService
  ) { }
  subscription = new Subscription
  workDayList: Array<WorkDay> = []
  nextDays: Array<any> = []
  label=''
  accessList = ['manager', 'staff']
  ngOnInit() {
    const state = history.state;
    if (state == null) {
      this.router.navigate(['/shifts'])
    }
    if (!this.accessList.includes(this.authService.getAccess())) {
      this.router.navigate(['/home'])
    }

    let parsedDate=state.data.getFullYear()+'-'+(state.data.getMonth()+1)+'-'+state.data.getDate()
    this.subscription=this.workDayService.getDayOfUserOfWeek(this.authService.getUid(),parsedDate).subscribe({

      next:(workdays)=>{
        
        this.workDayList=workdays
        let today=new Date(state.data)
        const dayOfWeek = today.getDay();
        const diffDaysMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(today);
        monday.setDate(today.getDate() + diffDaysMonday);
        
        for (let i =0 ; i<7;i++){
          let day=new Date(monday.getFullYear()+'-'+(monday.getMonth()+1)+'-'+(monday.getDate()))
          day.setDate(day.getDate() + i);
          
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
       this.label=this.nextDays[0].day+' '+this.nextDays[0].month+' - '+this.nextDays[this.nextDays.length-1].day+' '+this.nextDays[this.nextDays.length-1].month
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
  goBack(){
    this.router.navigate(['/shifts'])
  }
}
