import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { firstValueFrom, Subject } from 'rxjs';

import { Db05Component } from './db05/db05.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Db05Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  httpResult: number = 0;
  myNumber: number = 0;
  mySubj = new Subject<number>();

  constructor(private http: HttpClient) {
    this.mySubj.subscribe((num: number) => {
      this.myNumber += num;
    })
  }
  // onClick() {
  //   firstValueFrom(this.http.get('http://localhost:3000/one'))
  //     .then((rslt: any) => {
  //       this.httpResult = rslt;
  //       this.mySubj.next(rslt);
  //       return firstValueFrom(this.http.get('http://localhost:3000/two'))
  //     }).then((rslt: any) => {
  //       this.httpResult = rslt;
  //       this.mySubj.next(rslt);
  //       return firstValueFrom(this.http.get('http://localhost:3000/three'))
  //     }).then((rslt: any) => {
  //       this.httpResult = rslt;
  //       this.mySubj.next(rslt);
  //       return firstValueFrom(this.http.get('http://localhost:3000'))
  //     })
  // }
}
