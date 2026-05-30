import { AdminRole } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: number;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.AdminRole;
        };
    }>;
    getMe(req: {
        user: {
            id: number;
        };
    }): Promise<{
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
    createAdmin(dto: CreateAdminDto, req: {
        user: {
            id: number;
        };
    }): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.AdminRole;
    }>;
    updateRole(id: number, role: AdminRole, req: {
        user: {
            id: number;
        };
    }): Promise<{
        id: number;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.AdminRole;
    }>;
    removeAdmin(id: number, req: {
        user: {
            id: number;
        };
    }): Promise<{
        message: string;
    }>;
}
