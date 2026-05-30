import { MembershipPlan } from '@prisma/client';
export declare class UpsertMembershipDto {
    userId: number;
    plan: MembershipPlan;
    startDate: string;
    endDate: string;
    notes?: string;
}
