import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Card, Setting } from '../models/card.model';

@Component({
  selector: 'app-my-card',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatIconModule],
  templateUrl: './my-card.component.html',
  styleUrl: './my-card.component.scss'
})
export class MyCardComponent {
  // Getting cardData from app component
  @Input() cardData!: Card[];
  cardDataClone: Card[] = [];
  cloneNum = 0;
  firstRender = false;
  // this is a setting which contain=> No. of elements, Design , Icon , Card Color
  @Input() setting!: Setting[];
  startIndex = 0;
  endIndex!: number;
  // Event Emitters to trigger the function present in app component
  @Output() MoveForward = new EventEmitter();
  @Output() MoveBackward = new EventEmitter();

  // Boolean value to show Default data or else it will show Custom data
  @Input() showDefaultContent!: boolean;
  percentage = 0;
  constructor() {
  }

  ngOnInit(): void {
    this.endIndex = this.setting[0].Elements_Number;
    this.percentage = this.setting[0].column? 100/this.setting[0].column : 100;
    // this.percentage = 100/this.setting[0].column;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.setting[0].apipaginator && this.cardData !== undefined) {

      if (this.cloneNum <= 1) {
        for (let i = 0; i < this.cardData.length; i++) {
          this.cardDataClone[i] = this.cardData[i];
        }
        this.cloneNum++;
      }
      if (this.firstRender === false) {
        this.endIndex = this.setting[0].Elements_Number;
        this.cardData = this.cardDataClone.slice(
          this.startIndex,
          this.endIndex
        );
        this.firstRender = true;
      } else {
        this.cardData = this.cardDataClone.slice(
          this.startIndex, this.endIndex
          // changes.startIndex.currentValue,
          // changes.endIndex.currentValue
        );
      }
    }
  }

  moveBackward(): void {
    if (!this.setting[0].apipaginator) {
      this.MoveBackward.emit();
    } else {
      if (this.startIndex > 0) {
        const changesObj: SimpleChanges = {
          startIndex: new SimpleChange(
            this.startIndex,
            this.startIndex - this.setting[0].Elements_Number,
            true
          ),
          endIndex: new SimpleChange(
            this.endIndex,
            this.endIndex - this.setting[0].Elements_Number,
            true
          ),
        };
        this.startIndex = this.startIndex - this.setting[0].Elements_Number;
        this.endIndex = this.endIndex - this.setting[0].Elements_Number;
        this.ngOnChanges(changesObj);
      }
    }
  }

  moveForward(): void {
    if (!this.setting[0].apipaginator) {
      this.MoveForward.emit();
    } else {
      const changesObj: SimpleChanges = {
        startIndex: new SimpleChange(this.startIndex, this.endIndex, true),
        endIndex: new SimpleChange(
          this.endIndex,
          this.endIndex + this.setting[0].Elements_Number,
          true
        ),
      };
      if (this.endIndex < this.cardDataClone.length) {
        this.startIndex = this.endIndex;
        this.endIndex = this.endIndex + this.setting[0].Elements_Number;
        this.ngOnChanges(changesObj);
      }
    }
  }
}
