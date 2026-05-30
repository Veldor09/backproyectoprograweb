import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { MembershipsService } from '../memberships/memberships.service';
export declare class RemindersService {
    private prisma;
    private email;
    private memberships;
    private readonly logger;
    constructor(prisma: PrismaService, email: EmailService, memberships: MembershipsService);
    sendClassReminders(): Promise<void>;
    deactivateExpiredMemberships(): Promise<void>;
}
