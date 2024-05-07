import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../interfaces/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseUrl=environment.baseUrl+environment.urlAssignments
  constructor(private http:HttpClient) { }


  getAllAssignments(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllAssignmentsOfUser(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/user/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertAssignment(Assignment:Assignment): Observable<any | undefined> {
    let body={Assignment:Assignment}
  
     return this.http.post<any>(this.baseUrl,Assignment,{params: {auth: true}})
   }
   getAssignment(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteAssignment(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateAssignment(Assignment:Assignment): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+Assignment.id,Assignment,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
