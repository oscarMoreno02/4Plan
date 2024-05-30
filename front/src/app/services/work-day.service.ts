import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { WorkDay } from '../interfaces/work-day';

@Injectable({
  providedIn: 'root'
})
export class WorkDayService {
  baseUrl=environment.baseUrl+environment.urlWorkDays
  constructor(private http:HttpClient) { }

  getDayOfCompanyByDate(idCompany:number,date:string): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/company/'+idCompany+'/date/'+date).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getDayOfCompanyOfMonth(idCompany:number,date:string): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/company/'+idCompany+'/month/'+date).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getDayOfUserOfMonth(idUser:number,date:string): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/user/'+idUser+'/month/'+date).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getDayOfUserOfWeek(idUser:number,date:string): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/user/'+idUser+'/week/'+date).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getNextDays(idCompany:number): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/company/'+idCompany+'/next/').pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getNextDaysOfUser(idUser:number): Observable<any>{
    return this.http.get<any>(this.baseUrl+'/user/'+idUser+'/next/').pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllDays(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllDaysOfCompany(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/company/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertDay(Day:WorkDay): Observable<any | undefined> {
    let body={Day:Day}
  
     return this.http.post<any>(this.baseUrl,Day,{params: {auth: true}})
   }
   getDay(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteDay(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateDay(day:WorkDay): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+day.id,day,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }

   publishWorkDays(workdays:Array<WorkDay>): Observable<any | undefined> {
    return this.http.put<any>(this.baseUrl+'/publish',workdays,{params: {auth: true}}).pipe(
     catchError((error) =>{
       return of(undefined)
     })
    )
  }
}
