import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
        name: string;
        email: string | null;
        phone: string;
        createdAt: Date;
        id: number;
        classScheduleId: number;
        userId: number | null;
        status: import("@prisma/client").$Enums.BookingStatus;
    })[]>;
    updateProfile(req: {
        user: {
            id: number;
        };
    }, dto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        phone: string;
        id: number;
    }>;
}
