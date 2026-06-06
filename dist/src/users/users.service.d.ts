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
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        classScheduleId: number;
        userId: number | null;
        attended: boolean | null;
    })[]>;
    updateProfile(userId: number, dto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
    }>;
    getProgress(userId: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        notes: string | null;
        date: Date;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
    }[]>;
    addProgress(userId: number, dto: CreateProgressDto): import("@prisma/client").Prisma.Prisma__UserProgressClient<{
        id: number;
        createdAt: Date;
        notes: string | null;
        date: Date;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteProgress(userId: number, entryId: number): Promise<{
        id: number;
        createdAt: Date;
        notes: string | null;
        date: Date;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
    }>;
    listAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        name: string;
        phone: string;
    }[]>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    private signToken;
}
