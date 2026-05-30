import { ProgressCategory } from '@prisma/client';
export declare class CreateProgressDto {
    category?: ProgressCategory;
    date?: string;
    weight?: number;
    reps?: number;
    notes?: string;
}
