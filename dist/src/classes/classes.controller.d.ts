import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { TransferBookingDto } from './dto/transfer-booking.dto';
export declare class ClassesController {
    private classesService;
    constructor(classesService: ClassesService);
    findAll(all?: string): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            bookings: number;
        };
    } & {
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
        id: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
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
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createBooking(dto: CreateBookingDto, req: {
        user?: {
            id: number;
        };
    }): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        phone: string;
        email: string | null;
        classScheduleId: number;
        userId: number | null;
        status: import("@prisma/client").$Enums.BookingStatus;
        attended: boolean | null;
    }>;
    createClass(dto: CreateClassDto): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
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
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateClass(id: number, dto: Partial<CreateClassDto>): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
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
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findBookings(classId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        classSchedule: {
            name: string;
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
    cancelBooking(id: number): Promise<{
        classSchedule: {
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
            id: number;
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
    }>;
    confirmBooking(id: number): import("@prisma/client").Prisma.Prisma__BookingClient<{
        name: string;
        createdAt: Date;
        id: number;
        phone: string;
        email: string | null;
        classScheduleId: number;
        userId: number | null;
        status: import("@prisma/client").$Enums.BookingStatus;
        attended: boolean | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    transferBooking(id: number, dto: TransferBookingDto): Promise<{
        classSchedule: {
            name: string;
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
    }>;
    markAttendance(id: number, attended: boolean): import("@prisma/client").Prisma.Prisma__BookingClient<{
        name: string;
        createdAt: Date;
        id: number;
        phone: string;
        email: string | null;
        classScheduleId: number;
        userId: number | null;
        status: import("@prisma/client").$Enums.BookingStatus;
        attended: boolean | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    joinWaitlist(dto: CreateWaitlistDto): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        phone: string;
        email: string | null;
        classScheduleId: number;
        status: import("@prisma/client").$Enums.WaitlistStatus;
        notifiedAt: Date | null;
    }>;
    findWaitlist(classId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        classSchedule: {
            name: string;
            dayOfWeek: number;
            startTime: string;
        };
    } & {
        name: string;
        createdAt: Date;
        id: number;
        phone: string;
        email: string | null;
        classScheduleId: number;
        status: import("@prisma/client").$Enums.WaitlistStatus;
        notifiedAt: Date | null;
    })[]>;
    removeFromWaitlist(id: number): import("@prisma/client").Prisma.Prisma__WaitlistEntryClient<{
        name: string;
        createdAt: Date;
        id: number;
        phone: string;
        email: string | null;
        classScheduleId: number;
        status: import("@prisma/client").$Enums.WaitlistStatus;
        notifiedAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteClass(id: number): Promise<{
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
        id: number;
    }>;
}
