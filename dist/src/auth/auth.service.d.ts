import { JwtService } from '@nestjs/jwt';
import { AdminRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
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
            role: import("@prisma/client").$Enums.AdminRole;
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
        role: import("@prisma/client").$Enums.AdminRole;
        createdAt: Date;
    }>;
    listAdmins(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.AdminRole;
        createdAt: Date;
    }[]>;
    createAdmin(dto: CreateAdminDto, requesterId: number): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.AdminRole;
    }>;
    removeAdmin(targetId: number, requesterId: number): Promise<{
        message: string;
    }>;
    updateAdminRole(targetId: number, role: AdminRole, requesterId: number): Promise<{
        id: number;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.AdminRole;
    }>;
}
