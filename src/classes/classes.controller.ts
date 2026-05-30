import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { TransferBookingDto } from './dto/transfer-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalUserJwtGuard } from '../users/guards/optional-user-jwt.guard';

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  // Público: ver horarios de clases
  @Get()
  findAll(@Query('all') all?: string) {
    return this.classesService.findAllClasses(all !== 'true');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.findOneClass(id);
  }

  // Público: reservar una clase (vincula al usuario si hay JWT de usuario)
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @UseGuards(OptionalUserJwtGuard)
  @Post('bookings')
  createBooking(
    @Body() dto: CreateBookingDto,
    @Request() req: { user?: { id: number } },
  ) {
    return this.classesService.createBooking(dto, req.user?.id);
  }

  // Privado: gestión por admins
  @UseGuards(JwtAuthGuard)
  @Post()
  createClass(@Body() dto: CreateClassDto) {
    return this.classesService.createClass(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateClass(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateClassDto>,
  ) {
    return this.classesService.updateClass(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('bookings/all')
  findBookings(@Query('classId') classId?: string) {
    return this.classesService.findBookings(classId ? Number(classId) : undefined);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('bookings/:id/cancel')
  cancelBooking(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.cancelBooking(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('bookings/:id/confirm')
  confirmBooking(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.confirmBooking(id);
  }

  // ── Cambio de clase ───────────────────────────────────────────────────────
  // Accesible por el usuario dueño de la reserva o por un admin
  @UseGuards(OptionalUserJwtGuard)
  @Patch('bookings/:id/transfer')
  transferBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TransferBookingDto,
  ) {
    return this.classesService.transferBooking(id, dto.newClassScheduleId);
  }

  // ── Check-in ──────────────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Patch('bookings/:id/attendance')
  markAttendance(
    @Param('id', ParseIntPipe) id: number,
    @Body('attended') attended: boolean,
  ) {
    return this.classesService.markAttendance(id, attended);
  }

  // ── Lista de espera ────────────────────────────────────────────────────────
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @UseGuards(OptionalUserJwtGuard)
  @Post('waitlist')
  joinWaitlist(@Body() dto: CreateWaitlistDto) {
    return this.classesService.joinWaitlist(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('waitlist/all')
  findWaitlist(@Query('classId') classId?: string) {
    return this.classesService.findWaitlist(classId ? Number(classId) : undefined);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('waitlist/:id/remove')
  removeFromWaitlist(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.removeFromWaitlist(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteClass(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.deleteClass(id);
  }
}
