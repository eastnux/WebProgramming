import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projName } from '../../environments/proj.env';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private http: HttpClient) { }
  setItem(itemName: string, theObj: any) {
    this.http.put(`http://localhost:3000/api/v1/${projName}/dbStorage/${itemName}`, theObj)
      .subscribe((rsl) => {
        console.log(`put(set) result=${JSON.stringify(rsl)}`);
      })
  } // setItem()
  getItem(itemName: string) {
    return this.http.get(`http://localhost:3000/api/v1/${projName}/dbStorage/${itemName}`)
  } // getItem()
}