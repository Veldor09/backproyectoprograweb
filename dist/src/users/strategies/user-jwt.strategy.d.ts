import { Strategy } from 'passport-jwt';
declare const UserJwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class UserJwtStrategy extends UserJwtStrategy_base {
    constructor();
    validate(payload: {
        sub: number;
        email: string;
        role: string;
    }): {
        id: number;
        email: string;
    };
}
export {};
