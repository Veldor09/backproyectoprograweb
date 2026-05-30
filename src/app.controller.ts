import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AppService } from './app.service';

@ApiTags('system')
@SkipThrottle()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** Información básica de la API. */
  @Get()
  getInfo() {
    return this.appService.getInfo();
  }

  /** Health check para Render / monitoreo. Verifica también la base de datos. */
  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }
}
