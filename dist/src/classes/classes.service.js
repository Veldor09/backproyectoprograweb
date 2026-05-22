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
let ClassesService = class ClassesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
        if (schedule._count.bookings >= schedule.capacity) {
            throw new common_1.BadRequestException('La clase está llena');
        }
        try {
            return await this.prisma.booking.create({
                data: { ...dto, ...(userId ? { userId } : {}) },
            });
        }
        catch {
            throw new common_1.ConflictException('Ya tienes una reserva para esta clase');
        }
    }
    findBookings(classScheduleId) {
        return this.prisma.booking.findMany({
            where: classScheduleId ? { classScheduleId } : undefined,
            include: { classSchedule: { select: { name: true, startTime: true, endTime: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    cancelBooking(id) {
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELADO' },
        });
    }
    confirmBooking(id) {
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'CONFIRMADO' },
        });
    }
    deleteClass(id) {
        return this.prisma.$transaction(async (tx) => {
            await tx.booking.deleteMany({ where: { classScheduleId: id } });
            return tx.classSchedule.delete({ where: { id } });
        });
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map