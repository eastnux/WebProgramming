import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { projName } from './environments/proj.env';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): number {
    return this.appService.getHello();
  }
  @Get('one')
  getOne(): number {
    return this.appService.getHello(1);
  }
  @Get('two')
  getTwo(): number {
    return this.appService.getHello(2);
  }
  @Get('three')
  getThree(): number {
    return this.appService.getHello(3);
  }

  @Put(`api/v1/${projName}/:collectionName/:item`)
  setItem(
    @Param('collectionName') collectionName: string,
    @Param('item') item: string,
    @Body() payload: { oneValue: number; twoValue: number }
  ): Promise<any> {
    console.log(`SetItem-requested\n`, this);
    return this.appService.setItem(collectionName, item, payload)
  } // setItem
  @Get(`api/v1/${projName}/:collectionName/:item`)
  getItem(
    @Param('collectionName') collectionName: string,
    @Param('item') item: string,
  ): any {
    console.log(`GetItem-Requested\n`, this);
    return this.appService.getItem(collectionName, item)
  }

}
