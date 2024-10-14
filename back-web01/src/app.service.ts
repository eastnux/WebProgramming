import { Injectable } from '@nestjs/common';
import { DbService } from './services/db.service';
@Injectable()
export class AppService {
  constructor(private db: DbService) { }
  async setItem(collectionName: string, item: string, obj: { oneValue: number; twoValue: number }): Promise<any> {
    let rslt = await this.db.setItem(collectionName, item, obj);
    console.log(`setItem:db.setItem: result: \n${JSON.stringify(rslt)}`, this);
    let res: any = rslt;
    console.log(`setItem: return value:\n${JSON.stringify(res)}`, this)
    return res
  } //setItem()
  async getItem(collectionName: string, item: string): Promise<any> {
    let result = await this.db.getItem(collectionName, item);
    console.log(`getItem: db-result: ${JSON.stringify(result)}`, this);
    let res: any = {key: item, value: {oneValue: result.value.oneValue, twoValue: result.value.twoValue},};
    console.log(`getItem: return value:\n${JSON.stringify(res)}`, this)
    return res
  } //getItem()
  getHello(num: number = 1): number {
    return num;
  }
}