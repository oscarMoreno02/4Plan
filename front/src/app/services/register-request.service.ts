import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RegisterRequest } from '../interfaces/register-request';


@Injectable({
  providedIn: 'root'
})
export class RegisterRequestService {


  baseUrl=environment.baseUrl+environment.urlRegister
  constructor(private http:HttpClient) { }


  getAllRegisterRequests(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllRegisterRequestsOfCompany(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/company/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertRegisterRequest(registerRequest:RegisterRequest): Observable<any | undefined> {
    let body={registerRequest:registerRequest}
  
     return this.http.post<any>(this.baseUrl,registerRequest,{params: {auth: true}})
   }
   getRegisterRequest(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteRegisterRequest(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateRegisterRequest(RegisterRequest:RegisterRequest): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+RegisterRequest.id,RegisterRequest,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
