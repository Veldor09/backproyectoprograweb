import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { OptionalUserJwtGuard } from '../users/guards/optional-user-jwt.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private service: ReviewsService) {}

  /** Público: ver evaluaciones de una clase */
  @Get('class/:classId')
  findByClass(@Param('classId', ParseIntPipe) classId: number) {
    return this.service.findByClass(classId);
  }

  /** Admin: resumen de ratings por clase */
  @UseGuards(JwtAuthGuard)
  @Get('summary')
  summary() {
    return this.service.summary();
  }

  /** Usuario (o anónimo): dejar evaluación */
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @UseGuards(OptionalUserJwtGuard)
  @Post()
  create(
    @Body() dto: CreateReviewDto,
    @Request() req: { user?: { id: number } },
  ) {
    return this.service.create(dto, req.user?.id);
  }
}
