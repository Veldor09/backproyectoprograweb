import { Injectable } from '@nestjs/common';
import { MembershipPlan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertMembershipDto } from './dto/upsert-membership.dto';

@Injectable()
export class MembershipsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.membership.findMany({
      include: { user: { select: { id: true, name: true, email: true, phone: true } } },
      orderBy: { endDate: 'asc' },
    });
  }

  findByUser(userId: number) {
    return this.prisma.membership.findUnique({
      where: { userId },
    });
  }

  async upsert(dto: UpsertMembershipDto) {
    const isActive = new Date(dto.endDate) >= new Date();
    return this.prisma.membership.upsert({
      where: { userId: dto.userId },
      create: {
        userId: dto.userId,
        plan: dto.plan as MembershipPlan,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        notes: dto.notes,
        isActive,
      },
      update: {
        plan: dto.plan as MembershipPlan,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        notes: dto.notes,
        isActive,
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  async remove(userId: number) {
    return this.prisma.membership.delete({ where: { userId } });
  }

  /** Marca como inactivas las membresías vencidas. Llamado por el cron. */
  async deactivateExpired(): Promise<number> {
    const result = await this.prisma.membership.updateMany({
      where: { endDate: { lt: new Date() }, isActive: true },
      data: { isActive: false },
    });
    return result.count;
  }
}
