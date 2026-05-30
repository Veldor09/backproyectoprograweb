"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const users_service_1 = require("./users.service");
const register_user_dto_1 = require("./dto/register-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const create_progress_dto_1 = require("./dto/create-progress.dto");
const user_jwt_guard_1 = require("./guards/user-jwt.guard");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    register(dto) {
        return this.usersService.register(dto);
    }
    login(dto) {
        return this.usersService.login(dto);
    }
    forgotPassword(dto) {
        return this.usersService.forgotPassword(dto.email).then(() => ({
            message: 'Si ese email está registrado recibirás un enlace en tu bandeja.',
        }));
    }
    resetPassword(dto) {
        return this.usersService
            .resetPassword(dto.token, dto.password)
            .then(() => ({ message: 'Contraseña actualizada correctamente.' }));
    }
    me(req) {
        return req.user;
    }
    myBookings(req) {
        return this.usersService.getMyBookings(req.user.id);
    }
    updateProfile(req, dto) {
        return this.usersService.updateProfile(req.user.id, dto);
    }
    getProgress(req) {
        return this.usersService.getProgress(req.user.id);
    }
    addProgress(req, dto) {
        return this.usersService.addProgress(req.user.id, dto);
    }
    deleteProgress(req, id) {
        return this.usersService.deleteProgress(req.user.id, id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, throttler_1.Throttle)({ default: { ttl: 60_000, limit: 3 } }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "register", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { ttl: 60_000, limit: 5 } }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { ttl: 3_600_000, limit: 3 } }),
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "forgotPassword", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { ttl: 60_000, limit: 5 } }),
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    (0, common_1.Get)('mis-reservas'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "myBookings", null);
__decorate([
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    (0, common_1.Get)('progress'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProgress", null);
__decorate([
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    (0, common_1.Post)('progress'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_progress_dto_1.CreateProgressDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addProgress", null);
__decorate([
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    (0, common_1.Delete)('progress/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteProgress", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map