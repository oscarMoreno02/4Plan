import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { NewWorkPameterComponent } from '../new-work-pameter/new-work-pameter.component';
import { EditWorkPameterComponent } from '../edit-work-pameter/edit-work-pameter.component';
import { ButtonModule } from 'primeng/button';
import { DirectivesListComponent } from '../directives-list/directives-list.component';
import { TimeZoneListComponent } from '../time-zone-list/time-zone-list.component';
import { WorkDayService } from '../../services/work-day.service';
import { WorkDay } from '../../interfaces/work-day';
import { AuthService } from '../../services/auth.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogModule } from 'primeng/dialog'
import { Router } from '@angular/router';

@Component({
  selector: 'app-shift-workdays-list',
  standalone: true,
  imports: [CabeceraComponent,
    TableModule,
    NewWorkPameterComponent,
    EditWorkPameterComponent,
    ButtonModule,
    DirectivesListComponent,
    TimeZoneListComponent,
    CalendarModule,
    FormsModule,
    ConfirmComponent,
    DialogModule],
  templateUrl: './shift-workdays-list.component.html',
  styleUrl: './shift-workdays-list.component.css'
})
export class ShiftWorkdaysListComponent {
  date: Date = new Date();
  constructor(public authService: AuthService, private workDayService: WorkDayService,public router: Router) {

  }
  visible = false
  workDaysList: Array<WorkDay> = []
  subscripcion = new Subscription()

  ngOnInit(): void {
    this.subscripcion = this.workDayService.getAllDaysOfCompany(this.authService.getCompany()).subscribe({
      next: (data: Array<WorkDay>) => {
        this.workDaysList = data
        console.log(this.workDaysList)

      },
      error: (err) => {

      }
    })
  }

  async checkDay() {
    let day = await this.getWorkDay({ date: this.date, visible: this.visible })
    console.log(day)
    if (day != null) {
      
      this.router.navigate(['/shifts/'+this.formatDate(this.date)])
    }else{

      this.visible = true
    }
  }
  async getWorkDay(params: any) {
    return new Promise<WorkDay>((resolve, reject) => {

      this.workDayService.getDayOfCompanyByDate(this.authService.getCompany(), this.formatDate(this.date)).subscribe({
        next: (day: WorkDay) => {
          resolve(day);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

  }

  crear() {
    this.workDayService.insertDay({ date: this.date, idCompany: this.authService.getCompany(), expectVolume: 0, published: false, reachedVolume: null }).subscribe({
      next:(data)=>{
         this.router.navigate(['/shifts/'+this.formatDate(this.date)])
      },
      error(error){

      }
    })
  }
  cancelar() {
    this.visible = false
    this.date = new Date()
  }
  formatDate(date:Date):string{
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    let formated = year + '-' + month + '-' + day;
    return formated
  }

}
