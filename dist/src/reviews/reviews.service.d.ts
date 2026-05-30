import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateReviewDto, userId?: number): Promise<{
        id: number;
        createdAt: Date;
        classScheduleId: number;
        userId: number | null;
        bookingId: number;
        rating: number;
        comment: string | null;
    }>;
    findByClass(classScheduleId: number): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        classScheduleId: number;
        userId: number | null;
        bookingId: number;
        rating: number;
        comment: string | null;
    })[]>;
    summary(): Promise<{
        name: string;
        total: number;
        average: number;
    }[]>;
}
