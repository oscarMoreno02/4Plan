import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { WorkDayService } from '../../services/work-day.service';
import { Subscription } from 'rxjs';
import { WorkDay } from '../../interfaces/work-day';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NewAssignmentComponent } from '../new-assignment/new-assignment.component';
import { UserAssignmentsComponent } from '../user-assignments/user-assignments.component';
import { Messsage } from '../../interfaces/messsage';
import { Assignment } from '../../interfaces/assignment';
import { ListExpectedVolumeComponent } from '../list-expected-volume/list-expected-volume.component';
@Component({
  selector: 'app-shifts-date',
  standalone: true,
  imports: [
    CabeceraComponent,
    ToastModule,
    TableModule,
    ConfirmComponent,
    ButtonModule,
    NewAssignmentComponent,
    UserAssignmentsComponent,
    ListExpectedVolumeComponent
  ],
  providers:[MessageService],
  templateUrl: './shifts-date.component.html',
  styleUrl: './shifts-date.component.css'
})
export class ShiftsDateComponent  implements OnInit{
  constructor(
    public activatedRoute:ActivatedRoute,
    public authService:AuthService,
    public workDayService:WorkDayService,
    public router:Router,
    public userService:UserService,
    public messageService:MessageService
    ) {
  }
  workAssignment=0
  freeDays=0
  holidays=0
  hours=0

  subscripion=new Subscription
  date=""
  workDay!:WorkDay
  employees:Array<User>=[]
  ngOnInit(): void {
   this.getUpdate()
  }
  showMessage(message:Messsage){
    this.messageService.add(message)
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
   truncateNumber() {
    return Math.trunc(this.hours * 100) / 100;
  }
  getUpdate(){
    this.date = this.activatedRoute.snapshot.params['date']

    this.subscripion=this.workDayService.getDayOfCompanyByDate(this.authService.getCompany(),this.date).subscribe({
      next:(day)=>{
        
          if(day==null){
              this.router.navigate(['/shifts'])
          }
          this.workDay=day
          
          this.userService.getUsersWithAssignmens(this.workDay.id!).subscribe({
            next:(users)=>{
              this.employees=users

              for (const employee of this.employees){
                if(employee.assignments){
                  this.hours+=this.totalHoursWorked(employee.assignments)

                  for (const assignment of employee.assignments){
                    if(assignment.type==0){
                      this.workAssignment++
                    }
                    if(assignment.type==1){
                      this.freeDays++
                    }
                    if(assignment.type==2){
                      this.holidays++
                    }
                  }
                }
              }
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
