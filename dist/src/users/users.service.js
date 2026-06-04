"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
let UsersService = class UsersService {
    prisma;
    jwt;
    email;
    constructor(prisma, jwt, email) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.email = email;
    }
    async register(dto) {
        const existing = await this.prisma.user.findFirst({
            where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
        });
        if (existing)
            throw new common_1.ConflictException('Email o teléfono ya registrado');
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: { name: dto.name, email: dto.email, phone: dto.phone, passwordHash },
        });
        return this.signToken(user);
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return this.signToken(user);
    }
    getMyBookings(userId) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                classSchedule: {
                    select: { name: true, instructor: true, dayOfWeek: true, startTime: true, endTime: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateProfile(userId, dto) {
        const data = {};
        if (dto.name)
            data.name = dto.name;
        if (dto.phone)
            data.phone = dto.phone;
        if (dto.email)
            data.email = dto.email;
        if (dto.password)
            data.passwordHash = await bcrypt.hash(dto.password, 10);
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data,
            select: { id: true, name: true, email: true, phone: true },
        });
        return updated;
    }
    getProgress(userId) {
        return this.prisma.userProgress.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
    }
    addProgress(userId, dto) {
        return this.prisma.userProgress.create({
            data: {
                userId,
                category: dto.category ?? 'GENERAL',
                date: dto.date ? new Date(dto.date) : new Date(),
                weight: dto.weight,
                reps: dto.reps,
                notes: dto.notes,
            },
        });
    }
    async deleteProgress(userId, entryId) {
        const entry = await this.prisma.userProgress.findUniqueOrThrow({
            where: { id: entryId },
        });
        if (entry.userId !== userId) {
            throw new Error('No autorizado');
        }
        return this.prisma.userProgress.delete({ where: { id: entryId } });
    }
    listAll() {
        return this.prisma.user.findMany({
            select: { id: true, name: true, email: true, phone: true },
            orderBy: { name: 'asc' },
        });
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return;
        await this.prisma.passwordResetToken.deleteMany({
            where: { userId: user.id, usedAt: null },
        });
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await this.prisma.passwordResetToken.create({
            data: { token, userId: user.id, expiresAt },
        });
        const frontendUrl = process.env.FRONTEND_URL?.split(',')[0]?.trim() ??
            'http://localhost:3000';
        const resetUrl = `${frontendUrl}/portal/nueva-contrasena?token=${token}`;
        await this.email.sendPasswordReset(user.email, user.name, resetUrl);
    }
    async resetPassword(token, newPassword) {
        const record = await this.prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true },
        });
        if (!record) {
            throw new common_1.BadRequestException('El enlace no es válido.');
        }
        if (record.usedAt) {
            throw new common_1.BadRequestException('Este enlace ya fue utilizado.');
        }
        if (record.expiresAt < new Date()) {
            throw new common_1.BadRequestException('El enlace ha expirado. Solicita uno nuevo.');
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: record.userId },
                data: { passwordHash },
            }),
            this.prisma.passwordResetToken.update({
                where: { id: record.id },
                data: { usedAt: new Date() },
            }),
        ]);
    }
    signToken(user) {
        return {
            access_token: this.jwt.sign({ sub: user.id, email: user.email, role: 'user' }),
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=users.service.js.map