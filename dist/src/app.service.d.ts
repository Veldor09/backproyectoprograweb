import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getInfo(): {
        name: string;
        version: string;
        status: string;
        docs: string;
    };
    getHealth(): Promise<{
        status: string;
        database: string;
        uptime: number;
        timestamp: string;
    }>;
}
