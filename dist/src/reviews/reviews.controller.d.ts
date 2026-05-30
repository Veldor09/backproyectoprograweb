import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private service;
    constructor(service: ReviewsService);
    findByClass(classId: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    create(dto: CreateReviewDto, req: {
        user?: {
            id: number;
        };
    }): Promise<{
        id: number;
        createdAt: Date;
        classScheduleId: number;
        userId: number | null;
        bookingId: number;
        rating: number;
        comment: string | null;
    }>;
}
