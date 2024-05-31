import { Injectable } from '@angular/core';
import { StaffRequest } from '../interfaces/staff-request';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaffRequestService {

  baseUrl=environment.baseUrl+environment.urlRequest
  constructor(private http:HttpClient) { }


  getAllStaffRequests(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllStaffRequestsOfCompany(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/company/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllStaffRequestsByUser(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/user/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertStaffRequest(staffRequest:StaffRequest): Observable <any | undefined> {
    let body={staffRequest:staffRequest}
  
     return this.http.post<any>(this.baseUrl,staffRequest,{params: {auth: true}})
   }
   getStaffRequest(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteStaffRequest(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateStaffRequest(StaffRequest:StaffRequest): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+StaffRequest.id,StaffRequest,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
   acceptStaffRequest(StaffRequest:StaffRequest): Observable<any | undefined> {
    return this.http.put<any>(this.baseUrl+'/accept/'+StaffRequest.id,StaffRequest,{params: {auth: true}}).pipe(
     catchError((error) =>{
       return of(undefined)
     })
    )
  }
}
