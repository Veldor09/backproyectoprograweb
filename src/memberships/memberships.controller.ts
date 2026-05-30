import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MembershipsService } from './memberships.service';
import { UpsertMembershipDto } from './dto/upsert-membership.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserJwtAuthGuard } from '../users/guards/user-jwt.guard';

@ApiTags('memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(private service: MembershipsService) {}

  /** El usuario ve su propia membresía */
  @UseGuards(UserJwtAuthGuard)
  @Get('me')
  getMyMembership(@Request() req: { user: { id: number } }) {
    return this.service.findByUser(req.user.id);
  }

  /** Admin: ver todas las membresías */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /** Admin: crear o actualizar membresía de un usuario */
  @UseGuards(JwtAuthGuard)
  @Post()
  upsert(@Body() dto: UpsertMembershipDto) {
    return this.service.upsert(dto);
  }

  /** Admin: eliminar membresía */
  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.remove(userId);
  }
}
