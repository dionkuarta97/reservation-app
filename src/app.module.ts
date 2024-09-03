import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { DatabaseModule } from './database/database.module';
import { TableModule } from './table/table.module';
import { ReservationModule } from './reservation/reservation.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [CustomerModule, DatabaseModule, TableModule, ReservationModule, MailerModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
