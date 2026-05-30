import { Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, Request, HttpCode } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UserJwtAuthGuard } from './guards/user-jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Throttle({ default: { ttl: 60_000, limit: 3 } })
  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.usersService.register(dto);
  }

  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  // 3 solicitudes por hora — previene abuso del servicio de email.
  @Throttle({ default: { ttl: 3_600_000, limit: 3 } })
  @Post('forgot-password')
  @HttpCode(200)
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    // Responde siempre igual (200 vacío) para no revelar si el email existe.
    return this.usersService.forgotPassword(dto.email).then(() => ({
      message: 'Si ese email está registrado recibirás un enlace en tu bandeja.',
    }));
  }

  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @Post('reset-password')
  @HttpCode(200)
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.usersService
      .resetPassword(dto.token, dto.password)
      .then(() => ({ message: 'Contraseña actualizada correctamente.' }));
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('me')
  me(@Request() req: { user: { id: number; email: string } }) {
    return req.user;
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('mis-reservas')
  myBookings(@Request() req: { user: { id: number } }) {
    return this.usersService.getMyBookings(req.user.id);
  }

  @UseGuards(UserJwtAuthGuard)
  @Patch('me')
  updateProfile(
    @Request() req: { user: { id: number } },
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  // ── Progreso personal ─────────────────────────────────────────────────────
  @UseGuards(UserJwtAuthGuard)
  @Get('progress')
  getProgress(@Request() req: { user: { id: number } }) {
    return this.usersService.getProgress(req.user.id);
  }

  @UseGuards(UserJwtAuthGuard)
  @Post('progress')
  addProgress(
    @Request() req: { user: { id: number } },
    @Body() dto: CreateProgressDto,
  ) {
    return this.usersService.addProgress(req.user.id, dto);
  }

  @UseGuards(UserJwtAuthGuard)
  @Delete('progress/:id')
  deleteProgress(
    @Request() req: { user: { id: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.deleteProgress(req.user.id, id);
  }
}
