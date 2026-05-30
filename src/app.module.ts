import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { ClassesModule } from './classes/classes.module';
import { UsersModule } from './users/users.module';
import { InstructorsModule } from './instructors/instructors.module';
import { MembershipsModule } from './memberships/memberships.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RemindersModule } from './reminders/reminders.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 30 }]),
    PrismaModule,
    AuthModule,
    LeadsModule,
    ClassesModule,
    UsersModule,
    InstructorsModule,
    MembershipsModule,
    ReviewsModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
