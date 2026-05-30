import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { EmailModule } from '../email/email.module';
import { MembershipsModule } from '../memberships/memberships.module';

@Module({
  imports: [EmailModule, MembershipsModule],
  providers: [RemindersService],
})
export class RemindersModule {}
