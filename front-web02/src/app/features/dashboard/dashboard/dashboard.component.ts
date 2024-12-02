import { Component, Input } from '@angular/core';
import { Dashboard, Widget } from '../dashboard-types.model';
import { CompactType, DisplayGrid, GridsterConfig, GridsterModule, GridType } from 'angular-gridster2';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIcon,GridsterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @Input() dashboard!: Dashboard;
  options: GridsterConfig = {
    gridType: GridType.ScrollVertical,
    compactType: CompactType.None,
    margin: 5,
    outerMargin: true,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    mobileBreakpoint: 640,
    minCols: 3,
    maxCols: 100,
    minRows: 2,
    maxRows: 100,
    maxItemCols: 100,
    minItemCols: 1,
    maxItemRows: 100,
    minItemRows: 1,
    maxItemArea: 2500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 50,
    fixedRowHeight: 50,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    enableOccupiedCellDrop: false,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    ignoreMarginInRow: false,
    draggable: {
      enabled: true,
      stop: (event, b, c) => {
        console.log({event, b});
      },
    },
    resizable: {
      enabled: true,
      stop: (event) => {
        console.log(event);
      },
    },
    swap: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: {north: true, east: true, south: true, west: true},
    pushResizeItems: false,
    displayGrid: DisplayGrid.OnDragAndResize,
    disableWindowResize: false,
    disableWarnings: false,
    disableAutoPositionOnConflict: false,
    scrollToNewItems: false,
  };


  constructor() {
  }

  updateDash() {
    localStorage.setItem('dashboard', JSON.stringify(this.dashboard));
  }

  ngOnInit(): void {
    this.dashboard.widgets.forEach(widget => {
      if (!widget.widgetConfig) {
        widget.widgetConfig = {cols: 4, rows: 2, y: 0, x: 0};
      }
    });

    // console.log(this.dashboard);
  }

  removeItem($event: MouseEvent | TouchEvent, item: Widget): void {
    // $event.preventDefault();
    // $event.stopPropagation();
  }

  async openSettings(item: Widget): Promise<any> {
  }

  contentChange($event: any) {

  }


  resized(event: UIEvent) {
    console.log(event);
  }

  mutated(event: any) {
    console.log('Mutated', event);
  }


}