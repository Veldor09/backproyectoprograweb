import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    seedAdmin(email: string, password: string, name: string): Promise<{
        id: number;
        email: string;
        name: string;
    }>;
    getMe(adminId: number): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }>;
}
