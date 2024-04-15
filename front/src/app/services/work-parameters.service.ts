import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { WorkParameter } from '../interfaces/work-parameter';

@Injectable({
  providedIn: 'root'
})
export class WorkParametersService {
  baseUrl=environment.baseUrl+environment.urlWorkParameters
  constructor(private http:HttpClient) { }


  getAllWorkParameters(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertWorkParameter(WorkParameter:WorkParameter): Observable<any | undefined> {
    let body={WorkParameter:WorkParameter}
  
     return this.http.post<any>(this.baseUrl,WorkParameter,{params: {auth: true}})
   }
   getWorkParameter(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteWorkParameter(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateWorkParameter(WorkParameter:WorkParameter): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+WorkParameter.id,WorkParameter,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
