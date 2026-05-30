"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RemindersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemindersService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const memberships_service_1 = require("../memberships/memberships.service");
const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let RemindersService = RemindersService_1 = class RemindersService {
    prisma;
    email;
    memberships;
    logger = new common_1.Logger(RemindersService_1.name);
    constructor(prisma, email, memberships) {
        this.prisma = prisma;
        this.email = email;
        this.memberships = memberships;
    }
    async sendClassReminders() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.getDay();
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
                if (!booking.email)
                    continue;
                try {
                    await this.email.sendClassReminder(booking.email, booking.name, cls.name, DAY_NAMES[cls.dayOfWeek], cls.startTime, cls.instructor);
                    sent++;
                }
                catch (err) {
                    this.logger.error(`Error enviando recordatorio a ${booking.email}:`, err);
                }
            }
        }
        this.logger.log(`Recordatorios enviados: ${sent}`);
    }
    async deactivateExpiredMemberships() {
        const count = await this.memberships.deactivateExpired();
        if (count > 0) {
            this.logger.log(`${count} membresía(s) vencidas desactivadas`);
        }
    }
};
exports.RemindersService = RemindersService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemindersService.prototype, "sendClassReminders", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemindersService.prototype, "deactivateExpiredMemberships", null);
exports.RemindersService = RemindersService = RemindersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService,
        memberships_service_1.MembershipsService])
], RemindersService);
//# sourceMappingURL=reminders.service.js.map