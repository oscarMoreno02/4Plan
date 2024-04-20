import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { WorkPosition } from '../interfaces/work-position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  baseUrl=environment.baseUrl+environment.urlWorkPositions
  constructor(private http:HttpClient) { }


  getAllWorkPositions(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllWorkPositionsOfCompany(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/company/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertWorkPosition(workPosition:WorkPosition): Observable<any | undefined> {
    let body={workPosition:workPosition}
  
     return this.http.post<any>(this.baseUrl,workPosition,{params: {auth: true}})
   }
   getWorkPosition(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteWorkPosition(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateWorkPosition(WorkPosition:WorkPosition): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+WorkPosition.id,WorkPosition,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
