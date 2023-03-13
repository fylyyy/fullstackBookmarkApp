import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { User } from '@prisma/client';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<User>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: number): Promise<void>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
    }>;
}
