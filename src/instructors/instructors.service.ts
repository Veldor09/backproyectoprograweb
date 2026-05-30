import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';

@Injectable()
export class InstructorsService {
  constructor(private prisma: PrismaService) {}

  findAll(activeOnly = true) {
    return this.prisma.instructor.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  findOne(id: number) {
    return this.prisma.instructor.findUniqueOrThrow({ where: { id } });
  }

  create(dto: CreateInstructorDto) {
    return this.prisma.instructor.create({ data: dto });
  }

  async update(id: number, dto: Partial<CreateInstructorDto>) {
    await this.prisma.instructor.findUniqueOrThrow({ where: { id } });
    return this.prisma.instructor.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.prisma.instructor.findUniqueOrThrow({ where: { id } });
    return this.prisma.instructor.delete({ where: { id } });
  }
}
