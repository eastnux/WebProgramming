import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './services/db.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,DbService],
})
export class AppModule {}
