import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActionChange, DataTableActions, DataTableConfig } from '../../../shared/models/data-table.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogFactoryService } from '../../../core/services/dialog-factory.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

const _config: DataTableConfig = {
  checkbox: true,
  pageSize: 1,
  pageSizeOptions: [1],
  searchBox: true,
  totalCount: 1
};

const _actions : DataTableActions= {
  actions:[{name:'',icon:''}],
  bulkActions: [{name:'',icon:'',color:"primary"}]
};



@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,MatPaginatorModule,MatIconModule,
    MatFormFieldModule,MatCheckboxModule,
    MatTableModule,MatButtonModule 
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input() data: any[]=[];
  @Input() config: DataTableConfig=_config;
  @Input() actions: DataTableActions=_actions;
  @Output() actionClick = new EventEmitter<ActionChange>();
  @Output() bulkActionClick = new EventEmitter<ActionChange>();
  @Output() filterChange = new EventEmitter<any[]>();
  @Output() page = new EventEmitter<PageEvent>();
  checkBox = ['checkbox'];
  actionKey = ['options'];
  @Input() actionsHeaderName = ' View Device Data';
  @Input() keys: string[] = ['id', 'type', 'name', 'createdDate',];
  @Input() columnNames = ['ID', 'Type', 'Name(User Defined)', ' Created Date',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  selection = new SelectionModel<any>(true, []);
  @Input() addButtonName = 'Add Devices';

  constructor(
    private snack: MatSnackBar,
    private dialogFactoryService: DialogFactoryService
  ) {

  }

  ngOnInit(): void {
    if (this.config && !this.config.checkbox) {
      this.checkBox = [];
    }
    if (!this.actions) {
      this.actionKey = [];
    }
    // console.log(this.columnNames, this.checkBox.concat(this.keys))
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('On Changes Called');
    // console.log('Data', this.data);
    if (this.data) {
      this.dataSource = new MatTableDataSource<any>(this.data);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort ?? null;
      this.selection.clear();
      // console.log(this.sort)
      // console.log(this.dataSource)
    }
  }

  bulkActionHandler(type: 'action' | 'bulk-action', name: string): void {
    this.bulkActionClick.emit({
      type,
      name,
      selected: this.selection.selected
    });
  }

  assertType(row: any): any {
    return row;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    let numRows=0;
    if(this.dataSource){
      numRows = this.dataSource.data.length;
    }
    return numSelected === numRows;
  }

  masterToggle(): void {
    if(this.dataSource){
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  filter(event: KeyboardEvent): void {
    if(this.dataSource){
    this.dataSource.filter = (event.target as HTMLInputElement).value;
    this.filterChange.emit(this.dataSource.filteredData);
    }
  }

  rowAction(row: any, action: 'action' | 'bulk-action', name: string): void {
    this.actionClick.emit({
      selected: row,
      type: action,
      name
    });
  }

  pageEvent($event: PageEvent) {
    console.log($event);
    this.page.emit($event);
  }
}
