import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateProgressDto } from './dto/create-progress.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    listAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        name: string;
        phone: string;
    }[]>;
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
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    me(req: {
        user: {
            id: number;
            email: string;
        };
    }): {
        id: number;
        email: string;
    };
    myBookings(req: {
        user: {
            id: number;
        };
    }): import("@prisma/client").Prisma.PrismaPromise<({
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
    updateProfile(req: {
        user: {
            id: number;
        };
    }, dto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        phone: string;
    }>;
    getProgress(req: {
        user: {
            id: number;
        };
    }): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        notes: string | null;
        date: Date;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
    }[]>;
    addProgress(req: {
        user: {
            id: number;
        };
    }, dto: CreateProgressDto): import("@prisma/client").Prisma.Prisma__UserProgressClient<{
        id: number;
        createdAt: Date;
        notes: string | null;
        date: Date;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteProgress(req: {
        user: {
            id: number;
        };
    }, id: number): Promise<{
        id: number;
        createdAt: Date;
        notes: string | null;
        date: Date;
        userId: number;
        category: import("@prisma/client").$Enums.ProgressCategory;
        weight: number | null;
        reps: number | null;
    }>;
}
