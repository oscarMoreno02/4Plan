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
@Component({
  selector: 'app-shifts-date',
  standalone: true,
  imports: [CabeceraComponent,ToastModule,TableModule,ConfirmComponent,ButtonModule,NewAssignmentComponent,UserAssignmentsComponent],
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
  subscripion=new Subscription
  date=""
  workDay!:WorkDay
  employees:Array<User>=[]
  ngOnInit(): void {
    this.date = this.activatedRoute.snapshot.params['date']

    this.subscripion=this.workDayService.getDayOfCompanyByDate(this.authService.getCompany(),this.date).subscribe({
      next:(day)=>{
          if(day==null){
              this.router.navigate(['/shifts'])
          }
          this.workDay=day
          console.log(day)
          this.userService.getUsersWithAssignmens(this.workDay.id!).subscribe({
            next:(users)=>{
              this.employees=users
              console.log(this.employees)
            },
            error:(error)=>{

            }
          })
      },
      error:(error)=>{
      
      }
    })
  }
  showMessage(message:Messsage){
    this.messageService.add(message)
  }
}
