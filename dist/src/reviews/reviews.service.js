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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        const booking = await this.prisma.booking.findUniqueOrThrow({
            where: { id: dto.bookingId },
            include: { review: true },
        });
        if (booking.review) {
            throw new common_1.BadRequestException('Esta reserva ya tiene una evaluación.');
        }
        if (booking.status === 'CANCELADO') {
            throw new common_1.ForbiddenException('No puedes evaluar una reserva cancelada.');
        }
        if (userId && booking.userId && booking.userId !== userId) {
            throw new common_1.ForbiddenException('No autorizado.');
        }
        return this.prisma.classReview.create({
            data: {
                bookingId: dto.bookingId,
                classScheduleId: booking.classScheduleId,
                userId: userId ?? null,
                rating: dto.rating,
                comment: dto.comment,
            },
        });
    }
    findByClass(classScheduleId) {
        return this.prisma.classReview.findMany({
            where: { classScheduleId },
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true } } },
        });
    }
    async summary() {
        const reviews = await this.prisma.classReview.findMany({
            include: { classSchedule: { select: { name: true } } },
        });
        const map = new Map();
        for (const r of reviews) {
            const key = r.classSchedule.name;
            const cur = map.get(key) ?? { total: 0, sum: 0 };
            map.set(key, { total: cur.total + 1, sum: cur.sum + r.rating });
        }
        return Array.from(map.entries()).map(([name, { total, sum }]) => ({
            name,
            total,
            average: Math.round((sum / total) * 10) / 10,
        }));
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map