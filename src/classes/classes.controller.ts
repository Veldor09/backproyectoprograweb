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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteClass(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.deleteClass(id);
  }
}
