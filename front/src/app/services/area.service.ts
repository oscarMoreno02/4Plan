import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { WorkArea } from '../interfaces/work-area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  baseUrl=environment.baseUrl+environment.urlWorkAreas
  constructor(private http:HttpClient) { }


  getAllWorkAreas(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllWorkAreasOfCompany(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/company/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertWorkArea(workArea:WorkArea): Observable<any | undefined> {
    let body={workArea:workArea}
  
     return this.http.post<any>(this.baseUrl,workArea,{params: {auth: true}})
   }
   getWorkArea(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteWorkArea(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateWorkArea(WorkArea:WorkArea): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+WorkArea.id,WorkArea,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
