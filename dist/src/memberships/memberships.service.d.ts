import { PrismaService } from '../prisma/prisma.service';
import { UpsertMembershipDto } from './dto/upsert-membership.dto';
export declare class MembershipsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: number;
            email: string;
            name: string;
            phone: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        isActive: boolean;
        userId: number;
        plan: import("@prisma/client").$Enums.MembershipPlan;
        startDate: Date;
        endDate: Date;
    })[]>;
    findByUser(userId: number): import("@prisma/client").Prisma.Prisma__MembershipClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        isActive: boolean;
        userId: number;
        plan: import("@prisma/client").$Enums.MembershipPlan;
        startDate: Date;
        endDate: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    upsert(dto: UpsertMembershipDto): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        isActive: boolean;
        userId: number;
        plan: import("@prisma/client").$Enums.MembershipPlan;
        startDate: Date;
        endDate: Date;
    }>;
    remove(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        isActive: boolean;
        userId: number;
        plan: import("@prisma/client").$Enums.MembershipPlan;
        startDate: Date;
        endDate: Date;
    }>;
    deactivateExpired(): Promise<number>;
}
