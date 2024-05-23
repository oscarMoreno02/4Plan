import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UnregisterRequest } from '../interfaces/unregister-request';


@Injectable({
  providedIn: 'root'
})
export class UnregisterRequestService {


  baseUrl=environment.baseUrl+environment.urlUnregister
  constructor(private http:HttpClient) { }


  getAllUnregisterRequests(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllUnregisterRequestsOfCompany(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/company/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllUnregisterRequestsActiveByUser(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/active/user/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertUnregisterRequest(unregisterRequest:UnregisterRequest): Observable<any | undefined> {
    let body={unregisterRequest:unregisterRequest}
  
     return this.http.post<any>(this.baseUrl,unregisterRequest,{params: {auth: true}})
   }
   getUnregisterRequest(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteUnregisterRequest(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateUnregisterRequest(UnregisterRequest:UnregisterRequest): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+UnregisterRequest.id,UnregisterRequest,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
