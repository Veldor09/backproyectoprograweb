import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
export declare class ClassesService {
    private prisma;
    private email;
    constructor(prisma: PrismaService, email: EmailService);
    createClass(dto: CreateClassDto): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        instructor: string;
        description: string | null;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAllClasses(activeOnly?: boolean): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            bookings: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        instructor: string;
        description: string | null;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
    })[]>;
    findOneClass(id: number): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        instructor: string;
        description: string | null;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateClass(id: number, dto: Partial<CreateClassDto>): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        instructor: string;
        description: string | null;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createBooking(dto: CreateBookingDto, userId?: number): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        classScheduleId: number;
        userId: number | null;
        attended: boolean | null;
    }>;
    findBookings(classScheduleId?: number): import("@prisma/client").Prisma.PrismaPromise<({
        classSchedule: {
            name: string;
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
    cancelBooking(id: number): Promise<{
        classSchedule: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            instructor: string;
            description: string | null;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            capacity: number;
            isActive: boolean;
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
    }>;
    markAttendance(id: number, attended: boolean): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        classScheduleId: number;
        userId: number | null;
        attended: boolean | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    joinWaitlist(dto: CreateWaitlistDto): Promise<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string;
        status: import("@prisma/client").$Enums.WaitlistStatus;
        classScheduleId: number;
        notifiedAt: Date | null;
    }>;
    findWaitlist(classScheduleId?: number): import("@prisma/client").Prisma.PrismaPromise<({
        classSchedule: {
            name: string;
            dayOfWeek: number;
            startTime: string;
        };
    } & {
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string;
        status: import("@prisma/client").$Enums.WaitlistStatus;
        classScheduleId: number;
        notifiedAt: Date | null;
    })[]>;
    transferBooking(bookingId: number, newClassScheduleId: number): Promise<{
        classSchedule: {
            name: string;
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
    }>;
    removeFromWaitlist(id: number): import("@prisma/client").Prisma.Prisma__WaitlistEntryClient<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string;
        status: import("@prisma/client").$Enums.WaitlistStatus;
        classScheduleId: number;
        notifiedAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    private notifyNextWaiting;
    confirmBooking(id: number): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: number;
        email: string | null;
        name: string;
        createdAt: Date;
        phone: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        classScheduleId: number;
        userId: number | null;
        attended: boolean | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteClass(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        instructor: string;
        description: string | null;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        capacity: number;
        isActive: boolean;
    }>;
}
