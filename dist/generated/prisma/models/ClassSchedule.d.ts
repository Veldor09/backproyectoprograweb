import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ClassScheduleModel = runtime.Types.Result.DefaultSelection<Prisma.$ClassSchedulePayload>;
export type AggregateClassSchedule = {
    _count: ClassScheduleCountAggregateOutputType | null;
    _avg: ClassScheduleAvgAggregateOutputType | null;
    _sum: ClassScheduleSumAggregateOutputType | null;
    _min: ClassScheduleMinAggregateOutputType | null;
    _max: ClassScheduleMaxAggregateOutputType | null;
};
export type ClassScheduleAvgAggregateOutputType = {
    id: number | null;
    dayOfWeek: number | null;
    capacity: number | null;
};
export type ClassScheduleSumAggregateOutputType = {
    id: number | null;
    dayOfWeek: number | null;
    capacity: number | null;
};
export type ClassScheduleMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    instructor: string | null;
    dayOfWeek: number | null;
    startTime: string | null;
    endTime: string | null;
    capacity: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ClassScheduleMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    instructor: string | null;
    dayOfWeek: number | null;
    startTime: string | null;
    endTime: string | null;
    capacity: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ClassScheduleCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    instructor: number;
    dayOfWeek: number;
    startTime: number;
    endTime: number;
    capacity: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ClassScheduleAvgAggregateInputType = {
    id?: true;
    dayOfWeek?: true;
    capacity?: true;
};
export type ClassScheduleSumAggregateInputType = {
    id?: true;
    dayOfWeek?: true;
    capacity?: true;
};
export type ClassScheduleMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    instructor?: true;
    dayOfWeek?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ClassScheduleMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    instructor?: true;
    dayOfWeek?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ClassScheduleCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    instructor?: true;
    dayOfWeek?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ClassScheduleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassScheduleWhereInput;
    orderBy?: Prisma.ClassScheduleOrderByWithRelationInput | Prisma.ClassScheduleOrderByWithRelationInput[];
    cursor?: Prisma.ClassScheduleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ClassScheduleCountAggregateInputType;
    _avg?: ClassScheduleAvgAggregateInputType;
    _sum?: ClassScheduleSumAggregateInputType;
    _min?: ClassScheduleMinAggregateInputType;
    _max?: ClassScheduleMaxAggregateInputType;
};
export type GetClassScheduleAggregateType<T extends ClassScheduleAggregateArgs> = {
    [P in keyof T & keyof AggregateClassSchedule]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateClassSchedule[P]> : Prisma.GetScalarType<T[P], AggregateClassSchedule[P]>;
};
export type ClassScheduleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassScheduleWhereInput;
    orderBy?: Prisma.ClassScheduleOrderByWithAggregationInput | Prisma.ClassScheduleOrderByWithAggregationInput[];
    by: Prisma.ClassScheduleScalarFieldEnum[] | Prisma.ClassScheduleScalarFieldEnum;
    having?: Prisma.ClassScheduleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClassScheduleCountAggregateInputType | true;
    _avg?: ClassScheduleAvgAggregateInputType;
    _sum?: ClassScheduleSumAggregateInputType;
    _min?: ClassScheduleMinAggregateInputType;
    _max?: ClassScheduleMaxAggregateInputType;
};
export type ClassScheduleGroupByOutputType = {
    id: number;
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
    _count: ClassScheduleCountAggregateOutputType | null;
    _avg: ClassScheduleAvgAggregateOutputType | null;
    _sum: ClassScheduleSumAggregateOutputType | null;
    _min: ClassScheduleMinAggregateOutputType | null;
    _max: ClassScheduleMaxAggregateOutputType | null;
};
export type GetClassScheduleGroupByPayload<T extends ClassScheduleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClassScheduleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClassScheduleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClassScheduleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClassScheduleGroupByOutputType[P]>;
}>>;
export type ClassScheduleWhereInput = {
    AND?: Prisma.ClassScheduleWhereInput | Prisma.ClassScheduleWhereInput[];
    OR?: Prisma.ClassScheduleWhereInput[];
    NOT?: Prisma.ClassScheduleWhereInput | Prisma.ClassScheduleWhereInput[];
    id?: Prisma.IntFilter<"ClassSchedule"> | number;
    name?: Prisma.StringFilter<"ClassSchedule"> | string;
    description?: Prisma.StringNullableFilter<"ClassSchedule"> | string | null;
    instructor?: Prisma.StringFilter<"ClassSchedule"> | string;
    dayOfWeek?: Prisma.IntFilter<"ClassSchedule"> | number;
    startTime?: Prisma.StringFilter<"ClassSchedule"> | string;
    endTime?: Prisma.StringFilter<"ClassSchedule"> | string;
    capacity?: Prisma.IntFilter<"ClassSchedule"> | number;
    isActive?: Prisma.BoolFilter<"ClassSchedule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ClassSchedule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ClassSchedule"> | Date | string;
    bookings?: Prisma.BookingListRelationFilter;
};
export type ClassScheduleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    instructor?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type ClassScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ClassScheduleWhereInput | Prisma.ClassScheduleWhereInput[];
    OR?: Prisma.ClassScheduleWhereInput[];
    NOT?: Prisma.ClassScheduleWhereInput | Prisma.ClassScheduleWhereInput[];
    name?: Prisma.StringFilter<"ClassSchedule"> | string;
    description?: Prisma.StringNullableFilter<"ClassSchedule"> | string | null;
    instructor?: Prisma.StringFilter<"ClassSchedule"> | string;
    dayOfWeek?: Prisma.IntFilter<"ClassSchedule"> | number;
    startTime?: Prisma.StringFilter<"ClassSchedule"> | string;
    endTime?: Prisma.StringFilter<"ClassSchedule"> | string;
    capacity?: Prisma.IntFilter<"ClassSchedule"> | number;
    isActive?: Prisma.BoolFilter<"ClassSchedule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ClassSchedule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ClassSchedule"> | Date | string;
    bookings?: Prisma.BookingListRelationFilter;
}, "id">;
export type ClassScheduleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    instructor?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ClassScheduleCountOrderByAggregateInput;
    _avg?: Prisma.ClassScheduleAvgOrderByAggregateInput;
    _max?: Prisma.ClassScheduleMaxOrderByAggregateInput;
    _min?: Prisma.ClassScheduleMinOrderByAggregateInput;
    _sum?: Prisma.ClassScheduleSumOrderByAggregateInput;
};
export type ClassScheduleScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClassScheduleScalarWhereWithAggregatesInput | Prisma.ClassScheduleScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClassScheduleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClassScheduleScalarWhereWithAggregatesInput | Prisma.ClassScheduleScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ClassSchedule"> | number;
    name?: Prisma.StringWithAggregatesFilter<"ClassSchedule"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"ClassSchedule"> | string | null;
    instructor?: Prisma.StringWithAggregatesFilter<"ClassSchedule"> | string;
    dayOfWeek?: Prisma.IntWithAggregatesFilter<"ClassSchedule"> | number;
    startTime?: Prisma.StringWithAggregatesFilter<"ClassSchedule"> | string;
    endTime?: Prisma.StringWithAggregatesFilter<"ClassSchedule"> | string;
    capacity?: Prisma.IntWithAggregatesFilter<"ClassSchedule"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"ClassSchedule"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ClassSchedule"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ClassSchedule"> | Date | string;
};
export type ClassScheduleCreateInput = {
    name: string;
    description?: string | null;
    instructor: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    capacity?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutClassScheduleInput;
};
export type ClassScheduleUncheckedCreateInput = {
    id?: number;
    name: string;
    description?: string | null;
    instructor: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    capacity?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutClassScheduleInput;
};
export type ClassScheduleUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instructor?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutClassScheduleNestedInput;
};
export type ClassScheduleUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instructor?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutClassScheduleNestedInput;
};
export type ClassScheduleCreateManyInput = {
    id?: number;
    name: string;
    description?: string | null;
    instructor: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    capacity?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ClassScheduleUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instructor?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassScheduleUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instructor?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassScheduleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    instructor?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ClassScheduleAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
};
export type ClassScheduleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    instructor?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ClassScheduleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    instructor?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ClassScheduleSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
};
export type ClassScheduleScalarRelationFilter = {
    is?: Prisma.ClassScheduleWhereInput;
    isNot?: Prisma.ClassScheduleWhereInput;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type ClassScheduleCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.ClassScheduleCreateWithoutBookingsInput, Prisma.ClassScheduleUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ClassScheduleCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.ClassScheduleWhereUniqueInput;
};
export type ClassScheduleUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassScheduleCreateWithoutBookingsInput, Prisma.ClassScheduleUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ClassScheduleCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.ClassScheduleUpsertWithoutBookingsInput;
    connect?: Prisma.ClassScheduleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassScheduleUpdateToOneWithWhereWithoutBookingsInput, Prisma.ClassScheduleUpdateWithoutBookingsInput>, Prisma.ClassScheduleUncheckedUpdateWithoutBookingsInput>;
};
export type ClassScheduleCreateWithoutBookingsInput = {
    name: string;
    description?: string | null;
    instructor: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    capacity?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ClassScheduleUncheckedCreateWithoutBookingsInput = {
    id?: number;
    name: string;
    description?: string | null;
    instructor: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    capacity?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ClassScheduleCreateOrConnectWithoutBookingsInput = {
    where: Prisma.ClassScheduleWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassScheduleCreateWithoutBookingsInput, Prisma.ClassScheduleUncheckedCreateWithoutBookingsInput>;
};
export type ClassScheduleUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.ClassScheduleUpdateWithoutBookingsInput, Prisma.ClassScheduleUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.ClassScheduleCreateWithoutBookingsInput, Prisma.ClassScheduleUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.ClassScheduleWhereInput;
};
export type ClassScheduleUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.ClassScheduleWhereInput;
    data: Prisma.XOR<Prisma.ClassScheduleUpdateWithoutBookingsInput, Prisma.ClassScheduleUncheckedUpdateWithoutBookingsInput>;
};
export type ClassScheduleUpdateWithoutBookingsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instructor?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassScheduleUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instructor?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassScheduleCountOutputType = {
    bookings: number;
};
export type ClassScheduleCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | ClassScheduleCountOutputTypeCountBookingsArgs;
};
export type ClassScheduleCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleCountOutputTypeSelect<ExtArgs> | null;
};
export type ClassScheduleCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type ClassScheduleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    instructor?: boolean;
    dayOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bookings?: boolean | Prisma.ClassSchedule$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClassScheduleCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["classSchedule"]>;
export type ClassScheduleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    instructor?: boolean;
    dayOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["classSchedule"]>;
export type ClassScheduleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    instructor?: boolean;
    dayOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["classSchedule"]>;
export type ClassScheduleSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    instructor?: boolean;
    dayOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ClassScheduleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "instructor" | "dayOfWeek" | "startTime" | "endTime" | "capacity" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["classSchedule"]>;
export type ClassScheduleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | Prisma.ClassSchedule$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClassScheduleCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ClassScheduleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ClassScheduleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ClassSchedulePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ClassSchedule";
    objects: {
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
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
    }, ExtArgs["result"]["classSchedule"]>;
    composites: {};
};
export type ClassScheduleGetPayload<S extends boolean | null | undefined | ClassScheduleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload, S>;
export type ClassScheduleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClassScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClassScheduleCountAggregateInputType | true;
};
export interface ClassScheduleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ClassSchedule'];
        meta: {
            name: 'ClassSchedule';
        };
    };
    findUnique<T extends ClassScheduleFindUniqueArgs>(args: Prisma.SelectSubset<T, ClassScheduleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClassScheduleClient<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ClassScheduleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClassScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassScheduleClient<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ClassScheduleFindFirstArgs>(args?: Prisma.SelectSubset<T, ClassScheduleFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClassScheduleClient<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ClassScheduleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClassScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassScheduleClient<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ClassScheduleFindManyArgs>(args?: Prisma.SelectSubset<T, ClassScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ClassScheduleCreateArgs>(args: Prisma.SelectSubset<T, ClassScheduleCreateArgs<ExtArgs>>): Prisma.Prisma__ClassScheduleClient<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ClassScheduleCreateManyArgs>(args?: Prisma.SelectSubset<T, ClassScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ClassScheduleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ClassScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ClassScheduleDeleteArgs>(args: Prisma.SelectSubset<T, ClassScheduleDeleteArgs<ExtArgs>>): Prisma.Prisma__ClassScheduleClient<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ClassScheduleUpdateArgs>(args: Prisma.SelectSubset<T, ClassScheduleUpdateArgs<ExtArgs>>): Prisma.Prisma__ClassScheduleClient<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ClassScheduleDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClassScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ClassScheduleUpdateManyArgs>(args: Prisma.SelectSubset<T, ClassScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ClassScheduleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ClassScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ClassScheduleUpsertArgs>(args: Prisma.SelectSubset<T, ClassScheduleUpsertArgs<ExtArgs>>): Prisma.Prisma__ClassScheduleClient<runtime.Types.Result.GetResult<Prisma.$ClassSchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ClassScheduleCountArgs>(args?: Prisma.Subset<T, ClassScheduleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClassScheduleCountAggregateOutputType> : number>;
    aggregate<T extends ClassScheduleAggregateArgs>(args: Prisma.Subset<T, ClassScheduleAggregateArgs>): Prisma.PrismaPromise<GetClassScheduleAggregateType<T>>;
    groupBy<T extends ClassScheduleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClassScheduleGroupByArgs['orderBy'];
    } : {
        orderBy?: ClassScheduleGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClassScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ClassScheduleFieldRefs;
}
export interface Prisma__ClassScheduleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bookings<T extends Prisma.ClassSchedule$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassSchedule$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ClassScheduleFieldRefs {
    readonly id: Prisma.FieldRef<"ClassSchedule", 'Int'>;
    readonly name: Prisma.FieldRef<"ClassSchedule", 'String'>;
    readonly description: Prisma.FieldRef<"ClassSchedule", 'String'>;
    readonly instructor: Prisma.FieldRef<"ClassSchedule", 'String'>;
    readonly dayOfWeek: Prisma.FieldRef<"ClassSchedule", 'Int'>;
    readonly startTime: Prisma.FieldRef<"ClassSchedule", 'String'>;
    readonly endTime: Prisma.FieldRef<"ClassSchedule", 'String'>;
    readonly capacity: Prisma.FieldRef<"ClassSchedule", 'Int'>;
    readonly isActive: Prisma.FieldRef<"ClassSchedule", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ClassSchedule", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ClassSchedule", 'DateTime'>;
}
export type ClassScheduleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    where: Prisma.ClassScheduleWhereUniqueInput;
};
export type ClassScheduleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    where: Prisma.ClassScheduleWhereUniqueInput;
};
export type ClassScheduleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    where?: Prisma.ClassScheduleWhereInput;
    orderBy?: Prisma.ClassScheduleOrderByWithRelationInput | Prisma.ClassScheduleOrderByWithRelationInput[];
    cursor?: Prisma.ClassScheduleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassScheduleScalarFieldEnum | Prisma.ClassScheduleScalarFieldEnum[];
};
export type ClassScheduleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    where?: Prisma.ClassScheduleWhereInput;
    orderBy?: Prisma.ClassScheduleOrderByWithRelationInput | Prisma.ClassScheduleOrderByWithRelationInput[];
    cursor?: Prisma.ClassScheduleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassScheduleScalarFieldEnum | Prisma.ClassScheduleScalarFieldEnum[];
};
export type ClassScheduleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    where?: Prisma.ClassScheduleWhereInput;
    orderBy?: Prisma.ClassScheduleOrderByWithRelationInput | Prisma.ClassScheduleOrderByWithRelationInput[];
    cursor?: Prisma.ClassScheduleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassScheduleScalarFieldEnum | Prisma.ClassScheduleScalarFieldEnum[];
};
export type ClassScheduleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassScheduleCreateInput, Prisma.ClassScheduleUncheckedCreateInput>;
};
export type ClassScheduleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ClassScheduleCreateManyInput | Prisma.ClassScheduleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClassScheduleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    data: Prisma.ClassScheduleCreateManyInput | Prisma.ClassScheduleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClassScheduleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassScheduleUpdateInput, Prisma.ClassScheduleUncheckedUpdateInput>;
    where: Prisma.ClassScheduleWhereUniqueInput;
};
export type ClassScheduleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ClassScheduleUpdateManyMutationInput, Prisma.ClassScheduleUncheckedUpdateManyInput>;
    where?: Prisma.ClassScheduleWhereInput;
    limit?: number;
};
export type ClassScheduleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassScheduleUpdateManyMutationInput, Prisma.ClassScheduleUncheckedUpdateManyInput>;
    where?: Prisma.ClassScheduleWhereInput;
    limit?: number;
};
export type ClassScheduleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    where: Prisma.ClassScheduleWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassScheduleCreateInput, Prisma.ClassScheduleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ClassScheduleUpdateInput, Prisma.ClassScheduleUncheckedUpdateInput>;
};
export type ClassScheduleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
    where: Prisma.ClassScheduleWhereUniqueInput;
};
export type ClassScheduleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassScheduleWhereInput;
    limit?: number;
};
export type ClassSchedule$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type ClassScheduleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassScheduleSelect<ExtArgs> | null;
    omit?: Prisma.ClassScheduleOmit<ExtArgs> | null;
    include?: Prisma.ClassScheduleInclude<ExtArgs> | null;
};
