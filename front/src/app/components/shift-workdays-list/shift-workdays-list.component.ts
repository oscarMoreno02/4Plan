import { ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
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
    
    DialogModule],
    encapsulation:ViewEncapsulation.None,
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
     private cdr: ChangeDetectorRef
     ) {}
  visible = false
  visibleAlertPublishFalse = false
  workDaysList: Array<WorkDay> = []
  subscripcion = new Subscription()
  createdDays:Array<number>=[]
  publishedDays:Array<number>=[]
  selectedButton=1
  month!:number
  lastDate=''
  multipleDates: Date[] =[];
  @ViewChildren('span') spans!: QueryList<ElementRef>;
  buttonPublish=false
  ngOnInit(): void {
    let date =new Date()
    this.month=date.getMonth()+1
    let parsedDate:string=date.getFullYear()+'-'+this.month
    this.lastDate=parsedDate
    this.updateMonthData(parsedDate)
    this.changeColor()
  }
  
  async checkDay(event:any) {
    console.log(event)
    this.buttonPublish=false
    this.date= this.multipleDates instanceof Array ? this.multipleDates[this.multipleDates.length-1] : this.multipleDates
    let day = await this.getWorkDay({ date: this.date, visible: this.visible })
    if(day==null){
      this.visible=true

    }else{
      if(this.selectedButton==1){
          this.router.navigate(['/shifts/'+this.formatDate(this.date)])
      }
      if (this.selectedButton == 2 && day.published) {
        this.buttonPublish=false
          this.updateMonthData(day.date.toString())
          this.multipleDates=[]    
      }else{
        if(this.multipleDates instanceof Array && this.multipleDates.length>0){

          this.buttonPublish=true
        }
          
    
      }
    }
      
    
  }
  mostrar(e:any){
    console.log('llega')
    console.log(e)
  }
  async getWorkDay(params: any) {
    return new Promise<WorkDay>((resolve, reject) => {
      console.log(this.date)
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
    this.updateMonthData(this.formatDate(this.date))
    this.multipleDates=[]
    this.buttonPublish=false
    this.visible = false
    this.date = new Date()
  }
  formatDate(date:Date):string{
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formated = year + '-' + month + '-' + day;
    return formated
  }
  monthChange(event:any){
    console.log(event)
    this.month=event.month
    let date=event.year+'-'+this.month
    this.lastDate=date
    this.buttonPublish=false
    this.updateMonthData(date)
  }
  updateMonthData(date:string){
    this.subscripcion = this.workDayService.getDayOfCompanyOfMonth(this.authService.getCompany(),date).subscribe({
      next: (data: Array<WorkDay>) => {
        this.workDaysList = data;
        console.log(this.workDaysList);
        this.updateCreatedDays();
        this.cdr.detectChanges();  
        this.changeColor();
      },
      error: (err) => {
 
      }
    });
  }
  updateCreatedDays(){
    let list =[]
    if(this.workDaysList.length>0){
      for (const day of this.workDaysList){
        list.push(new Date (day.date).getDate())
        if(day.published){
          this.publishedDays.push(new Date (day.date).getDate())
        }
      }
    }
    this.createdDays=list
  }

  changeButtonSelected(button: number) {
    this.multipleDates=[]
    this.date=new Date()
    if (button !== this.selectedButton) {
      this.buttonPublish=false
        if (button === 2) {
            if (this.date) {
                this.multipleDates = [];
            } else {
                this.multipleDates = [];
            }
        }
        this.selectedButton = button;
        this.updateMonthData(this.lastDate);
    }
}
  changeColor(){

    const Spans = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span');
    Spans.forEach((span:any) => {
    const parent = span.parentElement;
    this.renderer.setAttribute(parent,'class', '');
  });
    const bgGreenSpans = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.bg-personal-green');
      bgGreenSpans.forEach((span:any) => {
      const parent = span.parentElement;
      this.renderer.setAttribute(parent,'class', 'bg-green');
    });
    const orange = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.bg-personal-orange');
    orange.forEach((span:any) => {
    const parent = span.parentElement;
    this.renderer.setAttribute(parent,'class', 'bg-orange');
  });
    const disabled = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.bg-personal-disabled');
    disabled.forEach((span:any) => {
    const parent = span.parentElement;
    this.renderer.setAttribute(parent,'class', 'disabled');
  });
  const pointer = this.elementRef.nativeElement.querySelectorAll('.p-datepicker table td > span > span.personal-pointer-none');
  pointer.forEach((span:any) => {
  const parent = span.parentElement;
  this.renderer.setAttribute(parent,'class', 'date-published');
});
  }
 
  checkDate(date:any){
    console.log(date)
    let date1=new Date(date.year+'-'+date.month+'-'+date.day)
    let date2=new Date()
  }

  publishDaysSelected(confirm:boolean){
    if(confirm){
      let publishList:Array<WorkDay>=[]
      
      for(let i= 0; i<this.multipleDates.length;i++){

          for (const day of this.workDaysList ){

          let fecha1=new Date(day.date)
          let fecha2=new Date(this.multipleDates[i])
          let fechaFormateada1=fecha1.getFullYear()+'-'+fecha1.getMonth()+'-'+fecha1.getDate()
          let fechaFormateada2=fecha2.getFullYear()+'-'+fecha2.getMonth()+'-'+fecha2.getDate()
          if(fechaFormateada1==fechaFormateada2){
            publishList.push(day)
          }
        }


      }
      console.log(publishList)
      this.workDayService.publishWorkDays(publishList).subscribe({
        next:(data)=>{
          window.location.reload()
        },
        error:()=>{
        }
      })

    }
  }



checkMultipleSelectedDays(confirm:any){
  if(this.multipleDates instanceof Array && this.multipleDates.length>0){
    confirm.confirm()
  }else{
    this.visibleAlertPublishFalse=true
  }

}
  }



