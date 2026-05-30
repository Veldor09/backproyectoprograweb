import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
export declare class InstructorsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(activeOnly?: boolean): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        bio: string | null;
        specialty: string | null;
        photoUrl: string | null;
        order: number;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__InstructorClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        bio: string | null;
        specialty: string | null;
        photoUrl: string | null;
        order: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateInstructorDto): import("@prisma/client").Prisma.Prisma__InstructorClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        bio: string | null;
        specialty: string | null;
        photoUrl: string | null;
        order: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: Partial<CreateInstructorDto>): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        bio: string | null;
        specialty: string | null;
        photoUrl: string | null;
        order: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        bio: string | null;
        specialty: string | null;
        photoUrl: string | null;
        order: number;
    }>;
}
