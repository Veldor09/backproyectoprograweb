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
exports.MembershipsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MembershipsService = class MembershipsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.membership.findMany({
            include: { user: { select: { id: true, name: true, email: true, phone: true } } },
            orderBy: { endDate: 'asc' },
        });
    }
    findByUser(userId) {
        return this.prisma.membership.findUnique({
            where: { userId },
        });
    }
    async upsert(dto) {
        const isActive = new Date(dto.endDate) >= new Date();
        return this.prisma.membership.upsert({
            where: { userId: dto.userId },
            create: {
                userId: dto.userId,
                plan: dto.plan,
                startDate: new Date(dto.startDate),
                endDate: new Date(dto.endDate),
                notes: dto.notes,
                isActive,
            },
            update: {
                plan: dto.plan,
                startDate: new Date(dto.startDate),
                endDate: new Date(dto.endDate),
                notes: dto.notes,
                isActive,
            },
            include: { user: { select: { id: true, name: true, email: true } } },
        });
    }
    async remove(userId) {
        return this.prisma.membership.delete({ where: { userId } });
    }
    async deactivateExpired() {
        const result = await this.prisma.membership.updateMany({
            where: { endDate: { lt: new Date() }, isActive: true },
            data: { isActive: false },
        });
        return result.count;
    }
};
exports.MembershipsService = MembershipsService;
exports.MembershipsService = MembershipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembershipsService);
//# sourceMappingURL=memberships.service.js.map