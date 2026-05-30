import { AdminRole } from '@prisma/client';
export declare class CreateAdminDto {
    name: string;
    email: string;
    password: string;
    role?: AdminRole;
}
