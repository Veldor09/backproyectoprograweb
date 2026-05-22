import { Injectable } from '@nestjs/common';
import { LeadStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLeadDto) {
    return this.prisma.lead.create({ data: dto });
  }

  findAll(status?: string) {
    return this.prisma.lead.findMany({
      where: status ? { status: status as LeadStatus } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.lead.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, dto: UpdateLeadDto) {
    return this.prisma.lead.update({
      where: { id },
      data: {
        ...(dto.status && { status: dto.status as LeadStatus }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
      },
    });
  }

  remove(id: number) {
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
}
