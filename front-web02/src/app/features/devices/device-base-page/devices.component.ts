import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ViewDetailsPopup } from '../../../common/dialog/models/data.model';
import { Card, Setting } from '../../../common/cards/models/card.model';
import { DataTableService } from '../../../core/services/data-table.service';
import { DialogFactoryService } from '../../../core/services/dialog-factory.service';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { ActionChange, DataTableActions, DataTableConfig, Device, DeviceResponse } from '../../../shared/models/data-table.model';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { PageEvent } from '@angular/material/paginator';
import { DataTableComponent } from "../../../common/datatable/data-table/data-table.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatListModule} from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MyCardComponent } from '../../../common/cards/my-card/my-card.component';
import { MatButtonModule } from '@angular/material/button';
import { DbService } from '../../../core/services/db.service';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { RouterModule } from '@angular/router';


const  _dataTableConfig = {
  checkbox: true,
  pageSize: 5,
  pageSizeOptions: [5, 10, 15, 20, 50],
  searchBox: true,
  totalCount: 20
};

const _dataTableActions : DataTableActions= {
  actions: [
    { name: 'analytics', icon: 'analytics', color: 'primary' },
    { name: 'disable', icon: 'visibility', iconOpp: 'visibility_off', color: 'accent', showOnDisabled: true, showOnHover: true },
    { name: 'delete', icon: 'delete', color: 'warn', showOnHover: true }
  ],
  bulkActions: [
    { icon: 'delete', name: 'delete', color: 'warn' },
    { icon: 'visibility', name: 'disable' }
  ],
};

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    DataTableComponent,MatToolbarModule,MatTabsModule,
    MatFormFieldModule,MatListModule,CommonModule,
    MatSlideToggleModule,MyCardComponent,MatButtonModule, FontAwesomeModule, MatDialogClose, RouterModule
  ],
  providers:[DatePipe],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent {
  title = 'Devices';
  @ViewChild(TemplateRef) tpl!: TemplateRef<any> ;
  @ViewChild('userDialogTemplate')
  userDialogTemplate!: TemplateRef<any> ;
  popUpData!: ViewDetailsPopup;
  show = false;
  cardData!: Card[] ;
  tempData!: Card[] ;
  setting!: Setting[];
  // setting: Setting[] = [
  //   {
  //     Elements_Number: 6,
  //     color: 'yellow',
  //     icon: 'build',
  //     design: 'design3',
  //     apipaginator: false
  //   },
  // ];
  index!: number;
  startIndex = 0;
  endIndex!: number;

  data!: DeviceResponse[];
  dataTableConfig: DataTableConfig = _dataTableConfig;
  dataTableActions: DataTableActions=_dataTableActions;

  constructor(
    public deviceService: DataTableService,
    public dialogService: DialogFactoryService,
    public matDialog: MatDialog,
    private datePipe: DatePipe,
    private db:DbService,
    private faLib: FaIconLibrary
  ) {
    this.faLib.addIconPacks(fas,far);
    this.db.getItem('dataTableConfig').subscribe((rslt:any) => {
      this.dataTableConfig = rslt; //JSON.parse(JSON.stringify(rslt))
    });
    this.db.getItem('dataTableActions').subscribe(rslt => {
      this.dataTableActions =  rslt; //JSON.parse(JSON.stringify(rslt))
    });

    this.db.getItem('setting').subscribe(rslt => {
      this.setting =  rslt; //JSON.parse(JSON.stringify(rslt))
      this.endIndex = this.setting[0].Elements_Number;

      this.db.getItem('popUpData').subscribe(rslt => {
        this.popUpData =  rslt; //JSON.parse(JSON.stringify(rslt));
        this.tempData = this.popUpData.tabs.attributes;
        this.cardData = this.setting[0].apipaginator === false ? this.tempData.slice(this.startIndex, this.endIndex) : this.tempData;
      });

    });

    this.getDevices();
  }

  async ngOnInit(): Promise<any> {  }

  async getDevices() {
    this.db.getItem('deviceResponse').subscribe((a: any) => { //DeviceResponse
      this.data = a.data.devices.map((device: any) => {
        return {
          ...device,
          type: device.type.deviceType,
          createdAt: this.datePipe.transform(device.createdAt, 'medium')
        };
      });
    })
  }

  async actionChange($event: ActionChange): Promise<any> {
    let selected = $event.selected;
    switch ($event.type) {
      case 'action':
        selected = $event.selected as Device;
        if ($event.name === 'delete') {
          try {
            this.matDialog.open(DeleteConfirmationComponent, {
              data: {
                single: true
              }
            }).afterClosed().subscribe(yes => {
              console.log(`popup response : ${yes}`) ////to do
              if (yes) {
                this.deviceService.deleteDevice(selected._id).subscribe((a)=>{this.getDevices();});
              }
            });
          } catch (e) {
            console.log('Cannot Do Data manipulation ', e);
          }
        } else if ($event.name === 'disable') {
          try {
            this.deviceService.disableDevice(selected, selected.operations.deviceStatus)
            .subscribe((a)=>{
              console.log(`disableCompo result : ${a}`);
              this.getDevices();});
          } catch (e) {
            console.log('Cannot Do Data manipulation ', e);
          }
        } else if ($event.name === 'analytics') {
          this.dialogService.open(
            {
              template: this.userDialogTemplate,
            },
            { width: 500, height: 600, disableClose: true }
          );
        }
        break;
      case 'bulk-action':
        selected = $event.selected as Device[];
        if ($event.name === 'delete') {
          this.matDialog.open(DeleteConfirmationComponent, {
            data: {
              multiple: true
            }
          }).afterClosed().subscribe(yes => {
            if (yes) {
              try{
              this.deviceService.deleteDevices(selected)
              .subscribe((a)=>{
                console.log(`deleteCompos result : ${a}`);
                this.getDevices();});
            } catch (e) {
              console.log('Cannot Do Data manipulation ', e);
            }

            }
          });
        } else if ($event.name === 'disable') {
          try {
            // await this.deviceService
            //   .disableDevices(selected, selected.length / 2 > selected
            //     .filter(i => i.operations.deviceStatus).length).toPromise()
            this.deviceService.disableDevices(selected, selected.length / 2 < selected
              .filter((i: any) => i.operations.deviceStatus).length)
              .subscribe((a)=>{
                console.log(`disableCompos result : ${a}`);
                this.getDevices();});
              ;
          } catch (e) {
            console.log('Cannot Do Data manipulation ', e);
          }
        }
        break;
    }
  }

  filterChange($event: Device[]): void {
    console.log($event);
  }

  slideToggleFunction(id: number): void {
    this.popUpData.tabs.actions[id].toggle = !this.popUpData.tabs.actions[id].toggle;
  }

  accessKeyShow(): void {
    this.show = !this.show;
  }

  moveBackward(): void {
    if (this.startIndex !== 0) {
      this.startIndex = this.startIndex - this.setting[0].Elements_Number;
      this.endIndex = this.endIndex - this.setting[0].Elements_Number;
      this.cardData = this.setting[0].apipaginator === false ? this.tempData.slice(this.startIndex, this.endIndex) : this.tempData;
      this.tempData = this.popUpData.tabs.attributes;
    }
  }

  moveForward(): void {
    length = this.tempData.length;
    if (this.endIndex < length) {
      this.startIndex = this.startIndex + this.setting[0].Elements_Number;
      this.endIndex = this.endIndex + this.setting[0].Elements_Number;
      this.cardData = this.setting[0].apipaginator === false ? this.tempData.slice(this.startIndex, this.endIndex) : this.tempData;
      this.tempData = this.popUpData.tabs.attributes;
    }
  }

  pageChange($event: PageEvent) {
    this.getDevices();
  }
}
