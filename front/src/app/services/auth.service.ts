import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private baseUrl = environment.baseUrl+environment.urlAuth

  constructor(
    private http:HttpClient
  ) { 
    try{
      this.t=this.getToken()
      if(this.t.length>1){
        this.payload=jwtDecode<any>(this.t)

      }
    }catch(e){
      sessionStorage.clear()
      window.location.href=''
    }
    }
  private _isLoggedIn: boolean = false;
 t?
 payload?

 login(email:string,password:string): Observable<any | undefined> {
  let body={email:email,password:password}
  return this.http.put<any>(this.baseUrl+environment.urlLogin,body)
}

  hasRol(rol:Array<string>):boolean{
  
    let pasa=false
    this.refresh()
    for (let i =0;i<rol.length;i++){
      if(this.payload.access==rol[i]){      
        pasa=true
      }
    }
   
    return pasa
  }

  getToken(): string   {
    const serializedObj = sessionStorage.getItem('token');
    if (serializedObj) {
      return serializedObj
    }else{
      return ''
    }
  }
  getAccess(){
    this.refresh()
      return this.payload.access
  }
  getUid(){
    this.refresh()
    return this.payload.uid
  }
  getName(){
    this.refresh()
    return this.payload.uname
  }
  loginOn() {
    this._isLoggedIn = true;
    this.refresh()
  }
  refresh(){
    try{

      this.t=this.getToken()
      this.payload=jwtDecode<any>(this.t)
    }catch(e){
      this.logout()
    }
  }


  logout() {
    sessionStorage.removeItem('token');
    window.location.href=''
  }
  get isLoggedIn(): boolean {
   if(this.getToken().length>1){
    return true
   }else{
    return false
   }
  }
}
