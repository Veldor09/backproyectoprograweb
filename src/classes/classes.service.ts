import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';

@Injectable()
export class ClassesService {
  constructor(
    private prisma: PrismaService,
    private email: EmailService,
  ) {}

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

    if (!schedule.isActive) {
      throw new BadRequestException('Esta clase ya no está disponible');
    }

    if (schedule._count.bookings >= schedule.capacity) {
      throw new BadRequestException('La clase está llena');
    }

    // ¿Ya existe una reserva con este teléfono para esta clase?
    const existing = await this.prisma.booking.findUnique({
      where: {
        phone_classScheduleId: {
          phone: dto.phone,
          classScheduleId: dto.classScheduleId,
        },
      },
    });

    if (existing) {
      // Si está cancelada, la reactivamos (en vez de fallar por el unique).
      if (existing.status === 'CANCELADO') {
        return this.prisma.booking.update({
          where: { id: existing.id },
          data: {
            status: 'PENDIENTE',
            name: dto.name,
            email: dto.email,
            ...(userId ? { userId } : {}),
          },
        });
      }
      throw new ConflictException('Ya tienes una reserva para esta clase');
    }

    return this.prisma.booking.create({
      data: { ...dto, ...(userId ? { userId } : {}) },
    });
  }

  findBookings(classScheduleId?: number) {
    return this.prisma.booking.findMany({
      where: classScheduleId ? { classScheduleId } : undefined,
      include: {
        classSchedule: {
          select: {
            name: true,
            startTime: true,
            endTime: true,
            dayOfWeek: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async cancelBooking(id: number) {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELADO' },
      include: { classSchedule: true },
    });

    // Notificar al primero en lista de espera si hay cupo ahora.
    void this.notifyNextWaiting(booking.classScheduleId);

    return booking;
  }

  // ── Check-in de asistencia ─────────────────────────────────────────────────
  markAttendance(id: number, attended: boolean) {
    return this.prisma.booking.update({
      where: { id },
      data: { attended },
    });
  }

  // ── Lista de espera ────────────────────────────────────────────────────────
  async joinWaitlist(dto: CreateWaitlistDto) {
    const schedule = await this.prisma.classSchedule.findUniqueOrThrow({
      where: { id: dto.classScheduleId },
    });

    if (!schedule.isActive) {
      throw new BadRequestException('Esta clase no está disponible.');
    }

    // Si hay cupo, mejor que reserve directamente.
    const activeBookings = await this.prisma.booking.count({
      where: {
        classScheduleId: dto.classScheduleId,
        status: { not: 'CANCELADO' },
      },
    });
    if (activeBookings < schedule.capacity) {
      throw new BadRequestException(
        'Aún hay cupos disponibles. Puedes hacer una reserva directamente.',
      );
    }

    try {
      return await this.prisma.waitlistEntry.create({ data: dto });
    } catch {
      throw new ConflictException('Ya estás en la lista de espera para esta clase.');
    }
  }

  findWaitlist(classScheduleId?: number) {
    return this.prisma.waitlistEntry.findMany({
      where: {
        ...(classScheduleId ? { classScheduleId } : {}),
        status: 'ESPERANDO',
      },
      include: {
        classSchedule: { select: { name: true, dayOfWeek: true, startTime: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // ── Cambio de clase ────────────────────────────────────────────────────────
  async transferBooking(bookingId: number, newClassScheduleId: number) {
    const booking = await this.prisma.booking.findUniqueOrThrow({
      where: { id: bookingId },
    });

    if (booking.status === 'CANCELADO') {
      throw new BadRequestException('No puedes cambiar una reserva cancelada.');
    }

    if (booking.classScheduleId === newClassScheduleId) {
      throw new BadRequestException('Ya estás inscrito en esa clase.');
    }

    const newClass = await this.prisma.classSchedule.findUniqueOrThrow({
      where: { id: newClassScheduleId },
      include: {
        _count: {
          select: { bookings: { where: { status: { not: 'CANCELADO' } } } },
        },
      },
    });

    if (!newClass.isActive) {
      throw new BadRequestException('La clase de destino no está disponible.');
    }

    if (newClass._count.bookings >= newClass.capacity) {
      throw new BadRequestException('La clase de destino está llena.');
    }

    // Verificar que no tenga ya una reserva activa en la clase destino
    const duplicate = await this.prisma.booking.findUnique({
      where: {
        phone_classScheduleId: {
          phone: booking.phone,
          classScheduleId: newClassScheduleId,
        },
      },
    });

    if (duplicate && duplicate.status !== 'CANCELADO') {
      throw new ConflictException('Ya tienes una reserva activa en esa clase.');
    }

    // Si hay un duplicado cancelado, lo eliminamos para evitar conflicto de unique
    if (duplicate) {
      await this.prisma.booking.delete({ where: { id: duplicate.id } });
    }

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        classScheduleId: newClassScheduleId,
        status: 'PENDIENTE',    // vuelve a pendiente al cambiar
        attended: null,
      },
      include: {
        classSchedule: {
          select: { name: true, dayOfWeek: true, startTime: true, endTime: true },
        },
      },
    });
  }

  removeFromWaitlist(id: number) {
    return this.prisma.waitlistEntry.update({
      where: { id },
      data: { status: 'EXPIRADO' },
    });
  }

  // Notifica por email al siguiente en espera cuando se libera un cupo.
  private async notifyNextWaiting(classScheduleId: number) {
    const next = await this.prisma.waitlistEntry.findFirst({
      where: { classScheduleId, status: 'ESPERANDO' },
      orderBy: { createdAt: 'asc' },
      include: { classSchedule: true },
    });

    if (!next) return;

    await this.prisma.waitlistEntry.update({
      where: { id: next.id },
      data: { status: 'NOTIFICADO', notifiedAt: new Date() },
    });

    const frontendUrl =
      process.env.FRONTEND_URL?.split(',')[0]?.trim() ?? 'http://localhost:3000';

    if (next.email) {
      const bookingUrl = `${frontendUrl}/#horarios`;
      await this.email.sendWaitlistAvailable(
        next.email,
        next.name,
        next.classSchedule.name,
        bookingUrl,
      );
    }
  }

  confirmBooking(id: number) {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CONFIRMADO' },
    });
  }

  deleteClass(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.waitlistEntry.deleteMany({ where: { classScheduleId: id } });
      await tx.booking.deleteMany({ where: { classScheduleId: id } });
      return tx.classSchedule.delete({ where: { id } });
    });
  }
}
