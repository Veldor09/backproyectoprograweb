import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { MembershipsService } from '../memberships/memberships.service';

const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(
    private prisma: PrismaService,
    private email: EmailService,
    private memberships: MembershipsService,
  ) {}

  /**
   * Se ejecuta cada día a las 8:00 AM.
   * Busca clases que ocurren mañana y envía recordatorios a los reservantes con email.
   */
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async sendClassReminders() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDay = tomorrow.getDay(); // 0=Dom … 6=Sáb

    this.logger.log(`Buscando clases del ${DAY_NAMES[tomorrowDay]} para recordatorios...`);

    const classes = await this.prisma.classSchedule.findMany({
      where: { dayOfWeek: tomorrowDay, isActive: true },
      include: {
        bookings: {
          where: {
            status: { not: 'CANCELADO' },
            email: { not: null },
          },
        },
      },
    });

    let sent = 0;
    for (const cls of classes) {
      for (const booking of cls.bookings) {
        if (!booking.email) continue;
        try {
          await this.email.sendClassReminder(
            booking.email,
            booking.name,
            cls.name,
            DAY_NAMES[cls.dayOfWeek],
            cls.startTime,
            cls.instructor,
          );
          sent++;
        } catch (err) {
          this.logger.error(`Error enviando recordatorio a ${booking.email}:`, err);
        }
      }
    }

    this.logger.log(`Recordatorios enviados: ${sent}`);
  }

  /**
   * Se ejecuta cada día a medianoche.
   * Marca como inactivas las membresías vencidas.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deactivateExpiredMemberships() {
    const count = await this.memberships.deactivateExpired();
    if (count > 0) {
      this.logger.log(`${count} membresía(s) vencidas desactivadas`);
    }
  }
}
