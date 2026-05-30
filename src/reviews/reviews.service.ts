import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto, userId?: number) {
    const booking = await this.prisma.booking.findUniqueOrThrow({
      where: { id: dto.bookingId },
      include: { review: true },
    });

    if (booking.review) {
      throw new BadRequestException('Esta reserva ya tiene una evaluación.');
    }

    // Solo se puede evaluar si la reserva está confirmada o asistió.
    if (booking.status === 'CANCELADO') {
      throw new ForbiddenException('No puedes evaluar una reserva cancelada.');
    }

    // Verificar que el usuario que evalúa es el dueño de la reserva (si está logueado).
    if (userId && booking.userId && booking.userId !== userId) {
      throw new ForbiddenException('No autorizado.');
    }

    return this.prisma.classReview.create({
      data: {
        bookingId: dto.bookingId,
        classScheduleId: booking.classScheduleId,
        userId: userId ?? null,
        rating: dto.rating,
        comment: dto.comment,
      },
    });
  }

  findByClass(classScheduleId: number) {
    return this.prisma.classReview.findMany({
      where: { classScheduleId },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } },
    });
  }

  /** Resumen de ratings por clase para el admin. */
  async summary() {
    const reviews = await this.prisma.classReview.findMany({
      include: { classSchedule: { select: { name: true } } },
    });
    const map = new Map<string, { total: number; sum: number }>();
    for (const r of reviews) {
      const key = r.classSchedule.name;
      const cur = map.get(key) ?? { total: 0, sum: 0 };
      map.set(key, { total: cur.total + 1, sum: cur.sum + r.rating });
    }
    return Array.from(map.entries()).map(([name, { total, sum }]) => ({
      name,
      total,
      average: Math.round((sum / total) * 10) / 10,
    }));
  }
}
