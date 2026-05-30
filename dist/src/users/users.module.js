"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const user_jwt_strategy_1 = require("./strategies/user-jwt.strategy");
const email_module_1 = require("../email/email.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET ?? 'fallback-secret',
                signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') },
            }),
            email_module_1.EmailModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, user_jwt_strategy_1.UserJwtStrategy],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map