import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkDirective } from '../../interfaces/directives';
import { AuthService } from '../../services/auth.service';
import { DirectivesService } from '../../services/directives.service';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-directives-list',
  standalone: true,
  imports: [DialogModule,ButtonModule,DataViewModule,TableModule],
  templateUrl: './directives-list.component.html',
  styleUrl: './directives-list.component.css'
})
export class DirectivesListComponent {
  constructor(public authService:AuthService,private directiveService:DirectivesService){
    
  }
  @Input() idParameter=5
  @Input() visible: boolean = false;

  @Output() cerrarModal = new EventEmitter<void>();
  directivesList:Array<WorkDirective>=[]
  subscripcion=new Subscription()
  
  ngOnInit(): void {
    this.subscripcion=this.directiveService.getAllDirectivesWithDataOfParameter(this.idParameter).subscribe({
      next:(data:Array<WorkDirective>)=>{
        this.directivesList=data
        console.log(this.directivesList)
  
      },
      error:(err)=>{
        
      }
    })
  }
  cerrar(): void {
    this.cerrarModal.emit();
   }
   showDialog() {
       this.visible = true;
   }
}
