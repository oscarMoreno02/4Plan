import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl=environment.baseUrl+environment.urlUsers
  constructor(private http:HttpClient) { }


  getAllUsers(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  getAllUsersOfCompany(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/company/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getUsersWithAssignmens(day:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/assignments/'+day).pipe(
      catchError((error) =>{
        return of(undefined)
      })
      )
    }
    getUserWithAssignments(id:number,day:number): Observable<any | undefined> {
      return this.http.get<any>(this.baseUrl+'/assignments/'+day+'/'+id).pipe(
        catchError((error) =>{
          return of(undefined)
        })
        )
      }
  insertUser(User:User): Observable<any | undefined> {
    let body={User:User}
  
     return this.http.post<any>(this.baseUrl,User,{params: {auth: true}})
   }
   getUser(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteUser(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateUser(User:User): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+User.id,User,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}


