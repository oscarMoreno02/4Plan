import { ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, ViewChildren, ViewEncapsulation, assertInInjectionContext } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ListWorkDayRatesComponent } from '../list-work-day-rates/list-work-day-rates.component';
import { User } from '../../interfaces/user';
import { VolumeService } from '../../services/volume.service';
import { ListExpectedVolumeComponent } from '../list-expected-volume/list-expected-volume.component';
import { Volume } from '../../interfaces/volume';

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
    CommonModule,
    ListWorkDayRatesComponent,
    DialogModule,
    ListExpectedVolumeComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './shift-workdays-list.component.html',
  styleUrl: './shift-workdays-list.component.css'
})
export class ShiftWorkdaysListComponent {
  date: Date = new Date();
  constructor(
    public authService: AuthService,
    private workDayService: WorkDayService,
    public router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private volumeService:VolumeService
  ) { }
  visible = false
  visibleAlertPublishFalse = false
  workDaysList: Array<WorkDay> = []
  subscripcion = new Subscription()
  createdDays: Array<number> = []
  publishedDays: Array<number> = []
  selectedButton = 1
  month!: number
  lastDate = ''
  multipleDates: Date[] = [];
  @ViewChildren('span') spans!: QueryList<ElementRef>;
  buttonPublish = false
  daysAllRatesInserted: Array<number> = []
  daysBeforeToday: Array<number> = []
  modalListRatesVisible = false
  modalListVolumeVisible = false
  userListWithAssignments: Array<User> = []
  daysHighRate: Array<number> = []
  daysAllVolumeInserted: Array<number> = []
  daysCumplimentVolume:Array<number>=[]

  ngOnInit(): void {
    let date = new Date()
    this.month = date.getMonth() + 1
    let parsedDate: string = date.getFullYear() + '-' + this.month
    this.lastDate = parsedDate
    this.updateMonthData(parsedDate)
    this.changeColor()
  }

  async checkDay(event: any, ratesModal: any,volumesModal:any) {
    this.buttonPublish = false
    this.date = this.multipleDates instanceof Array ? this.multipleDates[this.multipleDates.length - 1] : this.multipleDates
    let day = await this.getWorkDay({ date: this.date, visible: this.visible })
   
    if (day == null) {
      if (this.selectedButton == 1 || this.selectedButton == 2) {
        this.visible = true
      }

    } else {
      if (this.selectedButton == 1) {
        this.router.navigate(['/shifts/' + this.formatDate(this.date)])
      }

      if (this.selectedButton == 2) {
        if (day.published) {
          this.buttonPublish = false
          this.updateMonthData(day.date.toString())
          this.multipleDates = []
        } else {
          if (this.multipleDates instanceof Array && this.multipleDates.length > 0) {
            this.buttonPublish = true
          }
        }
      }

      if (this.selectedButton == 3 && this.checkDateBefore(day.date)) {
        this.userService.getUsersWithAssignmentsRequired(day.id!).subscribe({
          next: (users) => {
            ratesModal.userList = users;
            ratesModal.showDialog()
          },
          error: () => {

          }
        })
      }
      if (this.selectedButton == 4 && this.checkDateBefore(day.date)) {
        volumesModal.volumeList=day.volumes
        volumesModal.showDialog()
        this.volumeService.getAllVolumeByWorkDay(day.id!).subscribe({
          next: (volumes) => {
            volumesModal.volumeList = volumes;
            volumesModal.showDialog()
          },
          error: () => {

          }
        })
      }
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
      next: (data) => {
        this.router.navigate(['/shifts/' + this.formatDate(this.date)])
      },
      error(error) {

      }
    })
  }
  cancelar() {
    this.changeButtonSelected(this.selectedButton)
    this.visible = false
   
  }
  formatDate(date: Date): string {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formated = year + '-' + month + '-' + day;
    return formated
  }
  monthChange(event: any) {
    this.month = event.month
    let date = event.year + '-' + this.month
    this.lastDate = date
    this.buttonPublish = false
    this.updateMonthData(date)
  }
  updateMonthData(date: string) {
    this.subscripcion = this.workDayService.getDayOfCompanyOfMonth(this.authService.getCompany(), date).subscribe({
      next: (data: Array<WorkDay>) => {
        console.log(data)
        this.workDaysList = data;
        this.updateCreatedDays();
        this.cdr.detectChanges();
        this.changeColor();
      },
      error: (err) => {

      }
    });
  }
  updateCreatedDays() {
    let listCreated = []
    let listPublished = []
    let listBefore = []
    let listAllRatesInserted = []
    let listHighRate=[]
    let listAllVolumeInserted=[]
    let listCumplimentVolume=[]
    if (this.workDaysList.length > 0) {
      for (const day of this.workDaysList) {
        let numberOfDay = new Date(day.date).getDate()
        listCreated.push(numberOfDay)
        if (day.published) {
          listPublished.push(numberOfDay)
        }
        if (this.checkDateBefore(day.date)) {
          listBefore.push(numberOfDay)
        }
        if (this.checkAllRatesInserted(day)) {
          listAllRatesInserted.push(numberOfDay)
          if (this.hasHighRate(day)) {
            listHighRate.push(numberOfDay)
          }
        }
    if (this.checkAllVolumeInserted(day)) {
          listAllVolumeInserted.push(numberOfDay)
          if (this.hasCumplimentVolume(day)) {
            listCumplimentVolume.push(numberOfDay)
          }
        }
      }
    }
    this.daysAllRatesInserted = listAllRatesInserted
    this.publishedDays = listPublished
    this.createdDays = listCreated
    this.daysBeforeToday = listBefore
    this.daysHighRate=listHighRate
    this.daysAllVolumeInserted=listAllVolumeInserted
    this.daysCumplimentVolume=listCumplimentVolume
  }


  changeButtonSelected(button: number) {
 

    this.buttonPublish = false
    if (button === 2 && this.multipleDates instanceof Date) {
      let auxiliar=this.multipleDates
     this.multipleDates= new Array
      this.multipleDates.push(auxiliar)
    }
    setTimeout(()=>{
      this.selectedButton = button;
      this.updateMonthData(this.lastDate);
    },1)
   

  }
  changeColor() {

    const Spans = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span');
    Spans.forEach((span: any) => {
      const parent = span.parentElement;
      this.renderer.setAttribute(parent, 'class', '');
    });
    const bgGreenSpans = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.bg-personal-green');
    bgGreenSpans.forEach((span: any) => {
      const parent = span.parentElement;
      this.renderer.setAttribute(parent, 'class', 'bg-green');
    });
    const orange = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.bg-personal-orange');
    orange.forEach((span: any) => {
      const parent = span.parentElement;
      this.renderer.setAttribute(parent, 'class', 'bg-orange');
    });
    const disabled = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.bg-personal-disabled');
    disabled.forEach((span: any) => {
      const parent = span.parentElement;
      this.renderer.setAttribute(parent, 'class', 'disabled');
    });
    const pointer = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.personal-pointer-none');
    pointer.forEach((span: any) => {
      const parent = span.parentElement;
      this.renderer.setAttribute(parent, 'class', 'date-published');
    });
    const line = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.personal-line');
    line.forEach((span: any) => {
      const parent = span.parentElement;
      this.renderer.setAttribute(parent, 'class', 'disabled');
    });
    const red = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.bg-personal-red');
    red.forEach((span: any) => {
      const parent = span.parentElement;
      this.renderer.setAttribute(parent, 'class', 'bg-red');
    });
  }





  checkDateBefore(date: Date): boolean {
    let date1 = new Date(date)
    let date2 = new Date()
    if (date1 > date2) {

      return false
    }
    let parsed1 = date1.getFullYear() + '-' + date1.getMonth() + '-' + date1.getDate()
    let parsed2 = date2.getFullYear() + '-' + date2.getMonth() + '-' + date2.getDate()
    if (parsed1 == parsed2) {
      return false
    }
    return true
  }

  publishDaysSelected(confirm: boolean) {
    if (confirm) {
      let publishList: Array<WorkDay> = []

      for (let i = 0; i < this.multipleDates.length; i++) {

        for (const day of this.workDaysList) {

          let fecha1 = new Date(day.date)
          let fecha2 = new Date(this.multipleDates[i])
          let fechaFormateada1 = fecha1.getFullYear() + '-' + fecha1.getMonth() + '-' + fecha1.getDate()
          let fechaFormateada2 = fecha2.getFullYear() + '-' + fecha2.getMonth() + '-' + fecha2.getDate()
          if (fechaFormateada1 == fechaFormateada2) {
            publishList.push(day)
          }
        }


      }
      this.workDayService.publishWorkDays(publishList).subscribe({
        next: (data) => {
          window.location.reload()
        },
        error: () => {
        }
      })

    }
  }



  checkMultipleSelectedDays(confirm: any) {
    if (this.multipleDates instanceof Array && this.multipleDates.length > 0) {
      confirm.confirm()
    } else {
      this.visibleAlertPublishFalse = true
    }
  }

  checkAllRatesInserted(day: WorkDay): boolean {
    if (day.dayAssignments) {
      for (const assignment of day.dayAssignments) {
        if(assignment.type==0){
          if (assignment.valuation== null || assignment.valuation==0) {
            return false
          }
        }
      }
    }
    return true
  }
  checkAllVolumeInserted(day: WorkDay): boolean {
    if (day.volumes) {
      for (const volume of day.volumes) {
          if (volume.reachedVolume== null ||volume.reachedVolume==0) {
            return false
          }
      }
    }
    return true
  }
  hasHighRate(day: WorkDay): boolean {
    if (day.dayAssignments) {
      let sum = 0
      let validAssignments=0
      for (const assignment of day.dayAssignments) {
        if(assignment.type==0){
          validAssignments++
          if (assignment.valuation != null && assignment.valuation>0 ) {
            sum += assignment.valuation
          }
        }
      }
      if (sum / validAssignments <50 ) {
        return false
      }
    }
    return true
  }
  hasCumplimentVolume(day: WorkDay): boolean {
    console.log('llega')
    console.log(day)
    if (day.volumes) {
    
      console.log('llega2')

      let cumplimentVolume=0
      let notCumplimentVolume=0
      for (const volume of day.volumes) {
      
        if(volume.reachedVolume>=volume.volumeExpect){
          cumplimentVolume++
          console.log('cumple el volumen')
        }else{
          notCumplimentVolume++
          console.log('no cumple el volumen')

        }
      }
      if (notCumplimentVolume>cumplimentVolume ) {
        return false
      }
    }
    return true
  }
}



