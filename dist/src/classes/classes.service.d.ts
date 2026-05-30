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
    findAllClasses(activeOnly?: boolean): import("@prisma/client").Prisma.PrismaPromise<({
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
    findOneClass(id: number): import("@prisma/client").Prisma.Prisma__ClassScheduleClient<{
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
    createBooking(dto: CreateBookingDto, userId?: number): Promise<{
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
    findBookings(classScheduleId?: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    findWaitlist(classScheduleId?: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    transferBooking(bookingId: number, newClassScheduleId: number): Promise<{
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
    private notifyNextWaiting;
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
