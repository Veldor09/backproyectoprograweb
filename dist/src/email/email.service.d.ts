export declare class EmailService {
    private readonly logger;
    private readonly transporter;
    private readonly from;
    constructor();
    private send;
    sendPasswordReset(to: string, name: string, resetUrl: string): Promise<void>;
    sendClassReminder(to: string, name: string, className: string, day: string, time: string, instructor: string): Promise<void>;
    sendWaitlistAvailable(to: string, name: string, className: string, bookingUrl: string): Promise<void>;
    private layout;
    private btn;
    private buildResetEmail;
    private buildReminderEmail;
    private buildWaitlistEmail;
}
