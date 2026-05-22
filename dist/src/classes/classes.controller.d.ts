import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class ClassesController {
    private classesService;
    constructor(classesService: ClassesService);
    findAll(all?: string): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            bookings: number;
        };
    } & {
        id: number;
        name: string;
        description: string | null;
        instructor: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
        id: number;
        name: string;
        description: string | null;
        instructor: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createBooking(dto: CreateBookingDto, req: {
        user?: {
            id: number;
        };
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        phone: string;
        email: string | null;
        status: import("@prisma/client").$Enums.BookingStatus;
        classScheduleId: number;
        userId: number | null;
    }>;
    createClass(dto: CreateClassDto): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
        id: number;
        name: string;
        description: string | null;
        instructor: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateClass(id: number, dto: Partial<CreateClassDto>): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
        id: number;
        name: string;
        description: string | null;
        instructor: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findBookings(classId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        classSchedule: {
            name: string;
            startTime: string;
            endTime: string;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        phone: string;
        email: string | null;
        status: import("@prisma/client").$Enums.BookingStatus;
        classScheduleId: number;
        userId: number | null;
    })[]>;
    cancelBooking(id: number): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: number;
        name: string;
        createdAt: Date;
        phone: string;
        email: string | null;
        status: import("@prisma/client").$Enums.BookingStatus;
        classScheduleId: number;
        userId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    confirmBooking(id: number): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: number;
        name: string;
        createdAt: Date;
        phone: string;
        email: string | null;
        status: import("@prisma/client").$Enums.BookingStatus;
        classScheduleId: number;
        userId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteClass(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        instructor: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
