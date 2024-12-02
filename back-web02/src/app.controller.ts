import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { projName } from './proj.env';
import { Observable } from 'rxjs';

@Controller(`api/v1/${projName}`)
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get('dbStorage/:item')
  getItem(
    @Param('item') item: string,
  ) {
    return this.appService.getItem(item)
  } //getItem

  @Delete('dbStorage/:item/:id')
  delCompo(
    @Param('item') item: string,
    @Param('id') id: string,
  ) {
    console.log(`delCompo`)
    return this.appService.delCompo(item, id)
  } //delCompo

  @Delete('dbStorage/:item')
  delCompos(
    @Param('item') item: string,
    @Body() payload: any
  ) {
    console.log(`delCompos, payload:${JSON.stringify(payload)}`)
    return this.appService.delCompos(item, payload.ids)
  } //delCompo

  @Patch('dbStorage/:item/:id')
  modifyCompo(
    @Param('item') item: string,
    @Param('id') id: string,
    @Body() payload: any
  ) {
    return this.appService.modifyCompo(item, id, payload);
  } //modifyCompo

  @Patch('dbStorage/:item')
  modifyCompos(
    @Param('item') item: string,
    @Body() payload: any
  ) {
    console.log(`cont disable`)
    console.log(`contr-payload:${JSON.stringify(payload)}`)
    return this.appService.modifyCompos(item, payload);
  } //modifyCompo

  @Post('dbStorage/:item/')
  addCompo(
    @Param('item') item: string,
    @Body() payload: any
  ) {
    return this.appService.addCompo(item, payload);
  } //modifyCompo
}
