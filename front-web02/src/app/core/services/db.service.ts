import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../../environments/network-env';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Device } from '../../shared/models/data-table.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  getItem(item: string): Observable<any> {
    return this.http.get(`${ApiConfig.url}/dbStorage/${item}`); // obj 값
  }
  addCompo(item:string,compoInfo:any){
    return this.http.post(`${ApiConfig.url}/dbStorage/${item}`,compoInfo);
  }
  delCompo(item: string,id:string): Observable<any> {
    return this.http.delete(`${ApiConfig.url}/dbStorage/${item}/${id}`);
  }
  delCompos(item: string,ids:any): Observable<any> {
    console.log(`db-delCompos`)
    return this.http.delete(`${ApiConfig.url}/dbStorage/${item}`,{body:{ids:ids}});
    // return this.http.delete(`${ApiConfig.url}/dbStorage/${item}`);
  }
  disableCompo(item: string,dev:Device, status:boolean):Observable<any>{
    return this.http.patch(`${ApiConfig.url}/dbStorage/${item}/${dev._id}`,{action:{disable:status}});
  }
  disableCompos(item: string,ids:any, status:boolean):Observable<any>{
    console.log(`db-ids:${ids}`)
    return this.http.patch(`${ApiConfig.url}/dbStorage/${item}`,{body:{action:{disable:status},ids:ids}});
  }
}