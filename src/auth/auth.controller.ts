import {
  Controller, Post, Get, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards, Request,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AdminRole } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req: { user: { id: number } }) {
    return this.authService.getMe(req.user.id);
  }

  // ── Gestión de admins (solo SUPER_ADMIN) ──────────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Get('admins')
  listAdmins() {
    return this.authService.listAdmins();
  }

  @UseGuards(JwtAuthGuard)
  @Post('admins')
  createAdmin(
    @Body() dto: CreateAdminDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.authService.createAdmin(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admins/:id/role')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: AdminRole,
    @Request() req: { user: { id: number } },
  ) {
    return this.authService.updateAdminRole(id, role, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admins/:id')
  removeAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.authService.removeAdmin(id, req.user.id);
  }
}
