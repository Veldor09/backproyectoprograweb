import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: { $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]) },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API info', () => {
      expect(appController.getInfo()).toMatchObject({
        name: 'Force Extreme API',
        status: 'ok',
      });
    });
  });

  describe('health', () => {
    it('should report database up', async () => {
      const health = await appController.getHealth();
      expect(health).toMatchObject({ status: 'ok', database: 'up' });
    });
  });
});
