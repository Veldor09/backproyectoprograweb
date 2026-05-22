import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
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

  private signToken(user: { id: number; email: string; name: string; phone: string }) {
    return {
      access_token: this.jwt.sign({ sub: user.id, email: user.email, role: 'user' }),
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    };
  }
}
