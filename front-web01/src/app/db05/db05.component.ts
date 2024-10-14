import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { projName } from '../environments/proj.env';

@Component({
  selector: 'app-db05',
  standalone: true,
  imports: [],
  templateUrl: './db05.component.html',
  styleUrl: './db05.component.scss'
})
export class Db05Component {
  oneValue: number = 0;
  tenValue: number = 0;

  constructor(private http: HttpClient) {
    this.startValueUpdate();
  }

  startValueUpdate() {
    // 1초마다 DB에서 값 가져오기
    setInterval(() => {
      this.http.get(`http://localhost:3000/api/v1/${projName}/dbStorage/myNumbers`).subscribe({
        next: (data: any) => {
          this.oneValue = data.value.oneValue;
          this.tenValue = data.value.twoValue;
        },
        error: (err) => {
          console.error(`Error fetching values: ${JSON.stringify(err)}`);
        }
      });
    }, 1000);
  }

  resetValues() {
    // Reset 버튼 클릭 시 DB의 값을 0으로 설정
    this.http.put(`http://localhost:3000/api/v1/${projName}/dbStorage/myNumbers`, 
      { oneValue: 0, twoValue: 0 }
    ).subscribe({
      next: (response) => {
        console.log(`Reset successful: ${JSON.stringify(response)}`);
        this.oneValue = 0;
        this.tenValue = 0;
      },
      error: (err) => {
        console.error(`Error resetting values: ${JSON.stringify(err)}`);
      }
    });
  }
}