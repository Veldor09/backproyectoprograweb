import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

/**
 * Construye la lista de orígenes permitidos para CORS.
 * - FRONTEND_URL puede contener varios orígenes separados por coma.
 * - Se permite cualquier *.vercel.app para que funcionen los preview deploys.
 */
function buildCorsOrigin() {
  const fromEnv = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  const staticOrigins = new Set([
    ...fromEnv,
    'http://localhost:3000',
    'http://localhost:3001',
  ]);

  const vercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

  return (
    origin: string | undefined,
    cb: (err: Error | null, allow?: boolean) => void,
  ) => {
    // Permite peticiones sin origen (curl, health checks, apps móviles)
    if (!origin) return cb(null, true);
    if (staticOrigins.has(origin) || vercelPreview.test(origin)) {
      return cb(null, true);
    }
    return cb(null, false);
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const isProd = process.env.NODE_ENV === 'production';

  // Detrás del proxy de Render/Vercel: necesario para que el rate-limiter
  // y los logs vean la IP real del cliente y no la del proxy.
  const expressInstance = app.getHttpAdapter().getInstance() as {
    set: (key: string, value: unknown) => void;
  };
  expressInstance.set('trust proxy', 1);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: buildCorsOrigin(),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Cabeceras de seguridad básicas (sin dependencias externas).
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.removeHeader('X-Powered-By');
    next();
  });

  // Swagger: habilitado por defecto, se puede desactivar en prod con
  // SWAGGER_ENABLED=false.
  const swaggerEnabled = process.env.SWAGGER_ENABLED !== 'false';
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Force Extreme API')
      .setDescription('Backend del gimnasio Force Extreme')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port, '0.0.0.0');

  if (!isProd) {
    logger.log(`Backend:  http://localhost:${port}/api`);
    logger.log(`Health:   http://localhost:${port}/api/health`);
    if (swaggerEnabled) {
      logger.log(`Swagger:  http://localhost:${port}/api/docs`);
    }
  } else {
    logger.log(`Force Extreme API escuchando en el puerto ${port}`);
  }
}

void bootstrap();
