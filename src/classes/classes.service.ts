import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  createClass(dto: CreateClassDto) {
    return this.prisma.classSchedule.create({ data: dto });
  }

  findAllClasses(activeOnly = true) {
    return this.prisma.classSchedule.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
      include: {
        _count: {
          select: { bookings: { where: { status: { not: 'CANCELADO' } } } },
        },
      },
    });
  }

  findOneClass(id: number) {
    return this.prisma.classSchedule.findUniqueOrThrow({ where: { id } });
  }

  updateClass(id: number, dto: Partial<CreateClassDto>) {
    return this.prisma.classSchedule.update({ where: { id }, data: dto });
  }

  async createBooking(dto: CreateBookingDto, userId?: number) {
    const schedule = await this.prisma.classSchedule.findUniqueOrThrow({
      where: { id: dto.classScheduleId },
      include: {
        _count: {
          select: { bookings: { where: { status: { not: 'CANCELADO' } } } },
        },
      },
    });

    if (schedule._count.bookings >= schedule.capacity) {
      throw new BadRequestException('La clase está llena');
    }

    try {
      return await this.prisma.booking.create({
        data: { ...dto, ...(userId ? { userId } : {}) },
      });
    } catch {
      throw new ConflictException('Ya tienes una reserva para esta clase');
    }
  }

  findBookings(classScheduleId?: number) {
    return this.prisma.booking.findMany({
      where: classScheduleId ? { classScheduleId } : undefined,
      include: { classSchedule: { select: { name: true, startTime: true, endTime: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  cancelBooking(id: number) {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELADO' },
    });
  }

  confirmBooking(id: number) {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CONFIRMADO' },
    });
  }

  deleteClass(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.booking.deleteMany({ where: { classScheduleId: id } });
      return tx.classSchedule.delete({ where: { id } });
    });
  }
}
