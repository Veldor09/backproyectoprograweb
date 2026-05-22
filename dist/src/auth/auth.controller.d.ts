import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    getMe(req: {
        user: {
            id: number;
        };
    }): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }>;
}
