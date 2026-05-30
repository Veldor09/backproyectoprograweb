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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const admin = await this.prisma.admin.findUnique({
            where: { email: dto.email },
        });
        if (!admin || !(await bcrypt.compare(dto.password, admin.password))) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const token = this.jwtService.sign({
            sub: admin.id,
            email: admin.email,
            role: admin.role,
        });
        return {
            access_token: token,
            admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
        };
    }
    async seedAdmin(email, password, name) {
        const existing = await this.prisma.admin.findUnique({ where: { email } });
        if (existing)
            throw new common_1.ConflictException('El admin ya existe');
        const hashed = await bcrypt.hash(password, 10);
        const admin = await this.prisma.admin.create({
            data: { email, password: hashed, name },
        });
        return { id: admin.id, email: admin.email, name: admin.name };
    }
    async getMe(adminId) {
        return this.prisma.admin.findUniqueOrThrow({
            where: { id: adminId },
            select: { id: true, email: true, name: true, role: true, createdAt: true },
        });
    }
    listAdmins() {
        return this.prisma.admin.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: 'asc' },
        });
    }
    async createAdmin(dto, requesterId) {
        const requester = await this.prisma.admin.findUniqueOrThrow({ where: { id: requesterId } });
        if (requester.role !== client_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Solo el super-admin puede crear nuevos administradores.');
        }
        const exists = await this.prisma.admin.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('Ya existe un admin con ese email.');
        const hashed = await bcrypt.hash(dto.password, 10);
        const admin = await this.prisma.admin.create({
            data: { name: dto.name, email: dto.email, password: hashed, role: dto.role ?? client_1.AdminRole.ADMIN },
        });
        return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
    }
    async removeAdmin(targetId, requesterId) {
        if (targetId === requesterId) {
            throw new common_1.ForbiddenException('No puedes eliminarte a ti mismo.');
        }
        const requester = await this.prisma.admin.findUniqueOrThrow({ where: { id: requesterId } });
        if (requester.role !== client_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Solo el super-admin puede eliminar administradores.');
        }
        const target = await this.prisma.admin.findUnique({ where: { id: targetId } });
        if (!target)
            throw new common_1.NotFoundException('Admin no encontrado.');
        await this.prisma.admin.delete({ where: { id: targetId } });
        return { message: 'Admin eliminado.' };
    }
    async updateAdminRole(targetId, role, requesterId) {
        const requester = await this.prisma.admin.findUniqueOrThrow({ where: { id: requesterId } });
        if (requester.role !== client_1.AdminRole.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Solo el super-admin puede cambiar roles.');
        }
        return this.prisma.admin.update({
            where: { id: targetId },
            data: { role },
            select: { id: true, name: true, email: true, role: true },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map