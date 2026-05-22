export declare const LeadStatus: {
    readonly NUEVO: "NUEVO";
    readonly CONTACTADO: "CONTACTADO";
    readonly EN_PROCESO: "EN_PROCESO";
    readonly CONVERTIDO: "CONVERTIDO";
    readonly PERDIDO: "PERDIDO";
};
export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];
export declare const BookingStatus: {
    readonly PENDIENTE: "PENDIENTE";
    readonly CONFIRMADO: "CONFIRMADO";
    readonly CANCELADO: "CANCELADO";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
