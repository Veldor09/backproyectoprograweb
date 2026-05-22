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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LeadsService = class LeadsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.lead.create({ data: dto });
    }
    findAll(status) {
        return this.prisma.lead.findMany({
            where: status ? { status: status } : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }
    findOne(id) {
        return this.prisma.lead.findUniqueOrThrow({ where: { id } });
    }
    update(id, dto) {
        return this.prisma.lead.update({
            where: { id },
            data: {
                ...(dto.status && { status: dto.status }),
                ...(dto.notes !== undefined && { notes: dto.notes }),
            },
        });
    }
    remove(id) {
        return this.prisma.lead.delete({ where: { id } });
    }
    async stats() {
        const total = await this.prisma.lead.count();
        const byStatus = await this.prisma.lead.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const byGoal = await this.prisma.lead.groupBy({
            by: ['goal'],
            _count: { id: true },
        });
        return { total, byStatus, byGoal };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map