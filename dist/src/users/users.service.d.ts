import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProgressDto } from './dto/create-progress.dto';
export declare class UsersService {
    private prisma;
    private jwt;
    private email;
    constructor(prisma: PrismaService, jwt: JwtService, email: EmailService);
    register(dto: RegisterUserDto): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
        };
    }>;
    login(dto: LoginUserDto): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
        };
    }>;
    getMyBookings(userId: number): import("@prisma/client").Prisma.PrismaPromise<({
        classSchedule: {
            name: string;
            instructor: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
        };
    } & {
        name: string;
        createdAt: Date;
        id: number;
        phone: string;
        email: string | null;
        classScheduleId: number;
        userId: number | null;
        status: import("@prisma/client").$Enums.BookingStatus;
        attended: boolean | null;
    })[]>;
    updateProfile(userId: number, dto: UpdateUserDto): Promise<{
        name: string;
        id: number;
        phone: string;
        email: string;
    }>;
    getProgress(userId: number): import("@prisma/client").Prisma.PrismaPromise<{
        date: Date;
        createdAt: Date;
        id: number;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
        notes: string | null;
    }[]>;
    addProgress(userId: number, dto: CreateProgressDto): import("@prisma/client").Prisma.Prisma__UserProgressClient<{
        date: Date;
        createdAt: Date;
        id: number;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
        notes: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteProgress(userId: number, entryId: number): Promise<{
        date: Date;
        createdAt: Date;
        id: number;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
        notes: string | null;
    }>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    private signToken;
}
