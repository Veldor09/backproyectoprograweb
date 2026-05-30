import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AdminRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (!admin || !(await bcrypt.compare(dto.password, admin.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
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

  async seedAdmin(email: string, password: string, name: string) {
    const existing = await this.prisma.admin.findUnique({ where: { email } });
    if (existing) throw new ConflictException('El admin ya existe');

    const hashed = await bcrypt.hash(password, 10);
    const admin = await this.prisma.admin.create({
      data: { email, password: hashed, name },
    });

    return { id: admin.id, email: admin.email, name: admin.name };
  }

  async getMe(adminId: number) {
    return this.prisma.admin.findUniqueOrThrow({
      where: { id: adminId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  }

  // ── Gestión de admins ─────────────────────────────────────────────────────
  listAdmins() {
    return this.prisma.admin.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createAdmin(dto: CreateAdminDto, requesterId: number) {
    // Solo SUPER_ADMIN puede crear admins
    const requester = await this.prisma.admin.findUniqueOrThrow({ where: { id: requesterId } });
    if (requester.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('Solo el super-admin puede crear nuevos administradores.');
    }

    const exists = await this.prisma.admin.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Ya existe un admin con ese email.');

    const hashed = await bcrypt.hash(dto.password, 10);
    const admin = await this.prisma.admin.create({
      data: { name: dto.name, email: dto.email, password: hashed, role: dto.role ?? AdminRole.ADMIN },
    });
    return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
  }

  async removeAdmin(targetId: number, requesterId: number) {
    if (targetId === requesterId) {
      throw new ForbiddenException('No puedes eliminarte a ti mismo.');
    }
    const requester = await this.prisma.admin.findUniqueOrThrow({ where: { id: requesterId } });
    if (requester.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('Solo el super-admin puede eliminar administradores.');
    }
    const target = await this.prisma.admin.findUnique({ where: { id: targetId } });
    if (!target) throw new NotFoundException('Admin no encontrado.');
    await this.prisma.admin.delete({ where: { id: targetId } });
    return { message: 'Admin eliminado.' };
  }

  async updateAdminRole(targetId: number, role: AdminRole, requesterId: number) {
    const requester = await this.prisma.admin.findUniqueOrThrow({ where: { id: requesterId } });
    if (requester.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('Solo el super-admin puede cambiar roles.');
    }
    return this.prisma.admin.update({
      where: { id: targetId },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });
  }
}
