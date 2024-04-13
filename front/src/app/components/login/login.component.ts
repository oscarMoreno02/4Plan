import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,ButtonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public router:Router,public servicioAuth:AuthService){
    this.loginData.email=''
    this.loginData.password=''
    this.error=''

}
loginData={
  email:'',
  password:''
  }
  error=''
  login(){
    // this.router.navigate(['/home'])
    this.servicioAuth.login(this.loginData.email,this.loginData.password).subscribe({
      next:(data:any)=>{
     
        sessionStorage.setItem('token',data.token)
        this.servicioAuth.loginOn()
       this.router.navigate(['/home'])
      },
      error:(err)=>{
        this.error=err.error.msg
      }
    })
  }
}
