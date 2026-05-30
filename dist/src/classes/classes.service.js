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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
let ClassesService = class ClassesService {
    prisma;
    email;
    constructor(prisma, email) {
        this.prisma = prisma;
        this.email = email;
    }
    createClass(dto) {
        return this.prisma.classSchedule.create({ data: dto });
    }
    findAllClasses(activeOnly = true) {
        return this.prisma.classSchedule.findMany({
            where: activeOnly ? { isActive: true } : undefined,
            orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
            include: {
                _count: {
                    select: { bookings: { where: { status: { not: 'CANCELADO' } } } },
                },
            },
        });
    }
    findOneClass(id) {
        return this.prisma.classSchedule.findUniqueOrThrow({ where: { id } });
    }
    updateClass(id, dto) {
        return this.prisma.classSchedule.update({ where: { id }, data: dto });
    }
    async createBooking(dto, userId) {
        const schedule = await this.prisma.classSchedule.findUniqueOrThrow({
            where: { id: dto.classScheduleId },
            include: {
                _count: {
                    select: { bookings: { where: { status: { not: 'CANCELADO' } } } },
                },
            },
        });
        if (!schedule.isActive) {
            throw new common_1.BadRequestException('Esta clase ya no está disponible');
        }
        if (schedule._count.bookings >= schedule.capacity) {
            throw new common_1.BadRequestException('La clase está llena');
        }
        const existing = await this.prisma.booking.findUnique({
            where: {
                phone_classScheduleId: {
                    phone: dto.phone,
                    classScheduleId: dto.classScheduleId,
                },
            },
        });
        if (existing) {
            if (existing.status === 'CANCELADO') {
                return this.prisma.booking.update({
                    where: { id: existing.id },
                    data: {
                        status: 'PENDIENTE',
                        name: dto.name,
                        email: dto.email,
                        ...(userId ? { userId } : {}),
                    },
                });
            }
            throw new common_1.ConflictException('Ya tienes una reserva para esta clase');
        }
        return this.prisma.booking.create({
            data: { ...dto, ...(userId ? { userId } : {}) },
        });
    }
    findBookings(classScheduleId) {
        return this.prisma.booking.findMany({
            where: classScheduleId ? { classScheduleId } : undefined,
            include: {
                classSchedule: {
                    select: {
                        name: true,
                        startTime: true,
                        endTime: true,
                        dayOfWeek: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async cancelBooking(id) {
        const booking = await this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELADO' },
            include: { classSchedule: true },
        });
        void this.notifyNextWaiting(booking.classScheduleId);
        return booking;
    }
    markAttendance(id, attended) {
        return this.prisma.booking.update({
            where: { id },
            data: { attended },
        });
    }
    async joinWaitlist(dto) {
        const schedule = await this.prisma.classSchedule.findUniqueOrThrow({
            where: { id: dto.classScheduleId },
        });
        if (!schedule.isActive) {
            throw new common_1.BadRequestException('Esta clase no está disponible.');
        }
        const activeBookings = await this.prisma.booking.count({
            where: {
                classScheduleId: dto.classScheduleId,
                status: { not: 'CANCELADO' },
            },
        });
        if (activeBookings < schedule.capacity) {
            throw new common_1.BadRequestException('Aún hay cupos disponibles. Puedes hacer una reserva directamente.');
        }
        try {
            return await this.prisma.waitlistEntry.create({ data: dto });
        }
        catch {
            throw new common_1.ConflictException('Ya estás en la lista de espera para esta clase.');
        }
    }
    findWaitlist(classScheduleId) {
        return this.prisma.waitlistEntry.findMany({
            where: {
                ...(classScheduleId ? { classScheduleId } : {}),
                status: 'ESPERANDO',
            },
            include: {
                classSchedule: { select: { name: true, dayOfWeek: true, startTime: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async transferBooking(bookingId, newClassScheduleId) {
        const booking = await this.prisma.booking.findUniqueOrThrow({
            where: { id: bookingId },
        });
        if (booking.status === 'CANCELADO') {
            throw new common_1.BadRequestException('No puedes cambiar una reserva cancelada.');
        }
        if (booking.classScheduleId === newClassScheduleId) {
            throw new common_1.BadRequestException('Ya estás inscrito en esa clase.');
        }
        const newClass = await this.prisma.classSchedule.findUniqueOrThrow({
            where: { id: newClassScheduleId },
            include: {
                _count: {
                    select: { bookings: { where: { status: { not: 'CANCELADO' } } } },
                },
            },
        });
        if (!newClass.isActive) {
            throw new common_1.BadRequestException('La clase de destino no está disponible.');
        }
        if (newClass._count.bookings >= newClass.capacity) {
            throw new common_1.BadRequestException('La clase de destino está llena.');
        }
        const duplicate = await this.prisma.booking.findUnique({
            where: {
                phone_classScheduleId: {
                    phone: booking.phone,
                    classScheduleId: newClassScheduleId,
                },
            },
        });
        if (duplicate && duplicate.status !== 'CANCELADO') {
            throw new common_1.ConflictException('Ya tienes una reserva activa en esa clase.');
        }
        if (duplicate) {
            await this.prisma.booking.delete({ where: { id: duplicate.id } });
        }
        return this.prisma.booking.update({
            where: { id: bookingId },
            data: {
                classScheduleId: newClassScheduleId,
                status: 'PENDIENTE',
                attended: null,
            },
            include: {
                classSchedule: {
                    select: { name: true, dayOfWeek: true, startTime: true, endTime: true },
                },
            },
        });
    }
    removeFromWaitlist(id) {
        return this.prisma.waitlistEntry.update({
            where: { id },
            data: { status: 'EXPIRADO' },
        });
    }
    async notifyNextWaiting(classScheduleId) {
        const next = await this.prisma.waitlistEntry.findFirst({
            where: { classScheduleId, status: 'ESPERANDO' },
            orderBy: { createdAt: 'asc' },
            include: { classSchedule: true },
        });
        if (!next)
            return;
        await this.prisma.waitlistEntry.update({
            where: { id: next.id },
            data: { status: 'NOTIFICADO', notifiedAt: new Date() },
        });
        const frontendUrl = process.env.FRONTEND_URL?.split(',')[0]?.trim() ?? 'http://localhost:3000';
        if (next.email) {
            const bookingUrl = `${frontendUrl}/#horarios`;
            await this.email.sendWaitlistAvailable(next.email, next.name, next.classSchedule.name, bookingUrl);
        }
    }
    confirmBooking(id) {
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'CONFIRMADO' },
        });
    }
    deleteClass(id) {
        return this.prisma.$transaction(async (tx) => {
            await tx.waitlistEntry.deleteMany({ where: { classScheduleId: id } });
            await tx.booking.deleteMany({ where: { classScheduleId: id } });
            return tx.classSchedule.delete({ where: { id } });
        });
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map