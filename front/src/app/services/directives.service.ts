import { Directive, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { WorkDirective } from '../interfaces/directives';

@Injectable({
  providedIn: 'root'
})
export class DirectivesService {

  baseUrl=environment.baseUrl+environment.urlDirectives
  constructor(private http:HttpClient) { }


  getAllDirectives(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllDirectivesWithDataOfParameter(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/parameter/data/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertDirective(Directive:WorkDirective): Observable<any | undefined> {
    let body={Directive:Directive}
  
     return this.http.post<any>(this.baseUrl,Directive,{params: {auth: true}})
   }
   getDirective(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteDirective(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateDirective(directive:WorkDirective): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+directive.id,directive,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
