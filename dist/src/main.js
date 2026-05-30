"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
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
    return (origin, cb) => {
        if (!origin)
            return cb(null, true);
        if (staticOrigins.has(origin) || vercelPreview.test(origin)) {
            return cb(null, true);
        }
        return cb(null, false);
    };
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    const isProd = process.env.NODE_ENV === 'production';
    const expressInstance = app.getHttpAdapter().getInstance();
    expressInstance.set('trust proxy', 1);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: buildCorsOrigin(),
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.use((_req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Referrer-Policy', 'no-referrer');
        res.removeHeader('X-Powered-By');
        next();
    });
    const swaggerEnabled = process.env.SWAGGER_ENABLED !== 'false';
    if (swaggerEnabled) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Force Extreme API')
            .setDescription('Backend del gimnasio Force Extreme')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document);
    }
    const port = Number(process.env.PORT ?? 4000);
    await app.listen(port, '0.0.0.0');
    if (!isProd) {
        logger.log(`Backend:  http://localhost:${port}/api`);
        logger.log(`Health:   http://localhost:${port}/api/health`);
        if (swaggerEnabled) {
            logger.log(`Swagger:  http://localhost:${port}/api/docs`);
        }
    }
    else {
        logger.log(`Force Extreme API escuchando en el puerto ${port}`);
    }
}
void bootstrap();
//# sourceMappingURL=main.js.map