import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Device, DeviceResponse } from '../../shared/models/data-table.model';
import { devicesGenerator } from '../../shared/datagenerator/datagenerator.dev';
import { DbService } from './db.service';
import { ApiConfig } from '../../environments/network-env';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  constructor(
    public http: HttpClient,
    private db:DbService
    // private datePipe: DatePipe
  ) {
  }


  getDeviceResponse(length: number): Observable<DeviceResponse> { //DeviceResponse
    // return this.db.getItem('devices')
    // this.db.getItem('devices').subscribe((rslt)=>{
    //   return rslt
    // })
    return of(devicesGenerator(length)).pipe(delay(700));
  }


  deleteDevice(id: string): Observable<any> {
   return this.db.delCompo('deviceResponse',id)
  }


  addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(`${BASE_URL}/devices/`, {
      name: device.name,
      type: device.type
    });
  }

  deleteDevices(selected: Device[]) {
    console.log('Delete Devices', selected)
    let ids= selected.map(i => i._id);
    console.log(ids)
    return this.db.delCompos('deviceResponse',ids)
  }

  disableDevice(selected: Device, status: boolean) {
    return this.db.disableCompo('deviceResponse', selected, status)
  }

  disableDevices(selected: Device[], status: boolean) {
    console.log('Diable Multiple Devices', selected);
    let ids= selected.map(i => i._id);
    console.log('ids:', ids);
    console.log('status:', status);
    return this.db.disableCompos('deviceResponse', ids, status)
  }
}
