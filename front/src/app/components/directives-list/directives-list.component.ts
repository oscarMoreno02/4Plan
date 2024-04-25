import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkDirective } from '../../interfaces/directives';
import { AuthService } from '../../services/auth.service';
import { DirectivesService } from '../../services/directives.service';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { NewDirectiveComponent } from '../new-directive/new-directive.component';
import { EditDirectiveComponent } from '../edit-directive/edit-directive.component';
@Component({
  selector: 'app-directives-list',
  standalone: true,
  imports: [DialogModule,ButtonModule,DataViewModule,TableModule,NewDirectiveComponent,EditDirectiveComponent],
  templateUrl: './directives-list.component.html',
  styleUrl: './directives-list.component.css'
})
export class DirectivesListComponent {

  constructor(public authService:AuthService,private directiveService:DirectivesService){
    
  }
  @Input() idParameter=0
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  directivesList:Array<WorkDirective>=[]
  subscripcion=new Subscription()
  newModalVisible={value:false}
  editModalVisible={value:false}
  editDirectiveId=0
  ngOnInit(): void {
    if(this.idParameter!=0){

      console.log(this.idParameter)
      this.subscripcion=this.directiveService.getAllDirectivesWithDataOfParameter(this.idParameter).subscribe({
      next:(data:Array<WorkDirective>)=>{
        this.directivesList=data
        console.log(this.directivesList)
  
      },
      error:(err)=>{
        
      }
    })
  }
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

}
