import { Injectable } from '@nestjs/common';
import { DbService } from './services/db.service';

@Injectable()
export class AppService {
  constructor(
    private db: DbService
  ) { }

  getItem(item: string): any {
    console.log(`item:${item}`)
    return this.db.getItem(item).then(
      a => {
        console.log(`getItem:${JSON.stringify(a)}`);
        return a.obj})
  } // getItem()

  setItem(item: string, obj: any): any {
    return this.db.setItem(item, obj);
  } // setItem()

  async delCompo(item: string, id: string) {
    let rslt1 = await this.getItem(item);
    let rslt2 = rslt1.data.devices;
    let rslt3 = rslt2.filter(res => res._id != id);
    rslt1.data.devices = rslt3;
    rslt1.data.count = rslt1.data.count - 1;
    return this.setItem(item, rslt1);
  } // delCompo()

  async delCompos(item: string, ids: any) {
    console.log(`ids:${JSON.stringify(ids)}`);
    let rslt1 = await this.getItem(item);
    let rslt2 = rslt1.data.devices;
    ids.forEach((id:any)=>{
      rslt2 = rslt2.filter((res:any) => res._id != id);
    })
    rslt1.data.devices = rslt2;
    rslt1.data.count = rslt1.data.count - 1;
    return this.setItem(item, rslt1);
  } // delCompo()


  async modifyCompo(item: string, id: string, payload: any) {
    if ('action' in payload) {
      if ('disable' in payload.action) {
        let rslt1 = await this.getItem(item);
        let rslt2 = rslt1.data.devices;
        rslt2.forEach(dev => {
          if (dev._id == id) {
            dev.operations.deviceStatus = !payload.action.disable;
          }
        })
        return this.setItem(item, rslt1);
      }
    }
  } //modifyCompo()

  async modifyCompos(item: string, payload: any) {
    console.log(`serv-payload:${JSON.stringify(payload)}`)
    if ('action' in payload.body) {
      console.log(`action`)
      if ('disable' in payload.body.action) {
        console.log(`disable`)
        let rslt1 = await this.getItem(item);
        let rslt2 = rslt1.data.devices;
        console.log(`payload.body.ids: ${JSON.stringify(payload.body.ids)}`)
        console.log(`payload.body.action.disable: ${payload.body.action.disable}`)
        rslt2.forEach(dev => {
          if (payload.body.ids.includes(dev._id)) {
            dev.operations.deviceStatus = !payload.body.action.disable;
          }
        })
        return this.setItem(item, rslt1);
      }
    }
  } //modifyCompos()

  async addCompo(item: string, payload: any) {
    console.log(`addCompo-item:${item}`)
        let rslt1 = await this.getItem(item);
        console.log(`addCompo-rst1:${JSON.stringify(rslt1)}`)
        let rslt2 = rslt1.data.devices;
        rslt2.push(payload);
        console.log(`db-addCompo-rst1:${JSON.stringify(rslt1)}`)
        return this.setItem(item, rslt1);
  } //addCompo()

} //AppService