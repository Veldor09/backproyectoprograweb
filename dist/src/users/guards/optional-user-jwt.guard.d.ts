declare const OptionalUserJwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class OptionalUserJwtGuard extends OptionalUserJwtGuard_base {
    handleRequest(_err: any, user: any): any;
}
export {};
