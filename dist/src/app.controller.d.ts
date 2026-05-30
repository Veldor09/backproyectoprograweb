import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
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
