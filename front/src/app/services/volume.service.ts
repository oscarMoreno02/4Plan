import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Volume } from '../interfaces/volume';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {


  baseUrl=environment.baseUrl+environment.urlVolume
  constructor(private http:HttpClient) { }

  updateVolume(Volume:Volume): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+Volume.id,Volume,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
   getAllVolumeByWorkDay(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/workday/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
}
