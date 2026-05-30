import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProgressDto } from './dto/create-progress.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private email: EmailService,
  ) {}

  async register(dto: RegisterUserDto) {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });
    if (existing) throw new ConflictException('Email o teléfono ya registrado');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, phone: dto.phone, passwordHash },
    });
    return this.signToken(user);
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.signToken(user);
  }

  getMyBookings(userId: number) {
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

  async updateProfile(userId: number, dto: UpdateUserDto) {
    const data: Record<string, unknown> = {};
    if (dto.name)  data.name  = dto.name;
    if (dto.phone) data.phone = dto.phone;
    if (dto.email) data.email = dto.email;
    if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 10);

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, name: true, email: true, phone: true },
    });
    return updated;
  }

  // ── Progreso personal ─────────────────────────────────────────────────────
  getProgress(userId: number) {
    return this.prisma.userProgress.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  addProgress(userId: number, dto: CreateProgressDto) {
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

  async deleteProgress(userId: number, entryId: number) {
    const entry = await this.prisma.userProgress.findUniqueOrThrow({
      where: { id: entryId },
    });
    if (entry.userId !== userId) {
      throw new Error('No autorizado');
    }
    return this.prisma.userProgress.delete({ where: { id: entryId } });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Siempre respondemos igual para no revelar si el email existe.
    if (!user) return;

    // Invalidar tokens previos no usados del mismo usuario.
    await this.prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, usedAt: null },
    });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await this.prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt },
    });

    const frontendUrl =
      process.env.FRONTEND_URL?.split(',')[0]?.trim() ??
      'http://localhost:3000';
    const resetUrl = `${frontendUrl}/portal/nueva-contrasena?token=${token}`;

    await this.email.sendPasswordReset(user.email, user.name, resetUrl);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const record = await this.prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!record) {
      throw new BadRequestException('El enlace no es válido.');
    }
    if (record.usedAt) {
      throw new BadRequestException('Este enlace ya fue utilizado.');
    }
    if (record.expiresAt < new Date()) {
      throw new BadRequestException('El enlace ha expirado. Solicita uno nuevo.');
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

  private signToken(user: { id: number; email: string; name: string; phone: string }) {
    return {
      access_token: this.jwt.sign({ sub: user.id, email: user.email, role: 'user' }),
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    };
  }
}
