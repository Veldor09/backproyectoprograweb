import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class LeadsController {
    private leadsService;
    constructor(leadsService: LeadsService);
    create(dto: CreateLeadDto): import("@prisma/client").Prisma.Prisma__LeadClient<{
        name: string;
        phone: string;
        goal: string;
        message: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(status?: string): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        phone: string;
        goal: string;
        message: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    stats(): Promise<{
        total: number;
        byStatus: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.LeadGroupByOutputType, "status"[]> & {
            _count: {
                id: number;
            };
        })[];
        byGoal: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.LeadGroupByOutputType, "goal"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__LeadClient<{
        name: string;
        phone: string;
        goal: string;
        message: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateLeadDto): import("@prisma/client").Prisma.Prisma__LeadClient<{
        name: string;
        phone: string;
        goal: string;
        message: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__LeadClient<{
        name: string;
        phone: string;
        goal: string;
        message: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
