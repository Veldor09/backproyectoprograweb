import { Controller, Post, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
}
