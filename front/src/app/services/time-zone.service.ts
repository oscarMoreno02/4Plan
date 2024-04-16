import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { TimeZone } from '../interfaces/time-zone';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {

  baseUrl=environment.baseUrl+environment.urlTimeZones
  constructor(private http:HttpClient) { }


  getAllTimeZones(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllTimeZonesOfCompany(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/company/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertTimeZone(TimeZone:TimeZone): Observable<any | undefined> {
    let body={TimeZone:TimeZone}
  
     return this.http.post<any>(this.baseUrl,TimeZone,{params: {auth: true}})
   }
   getTimeZone(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteTimeZone(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateTimeZone(TimeZone:TimeZone): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+TimeZone.id,TimeZone,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
