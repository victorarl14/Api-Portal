import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from '../../dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterUserDto): Promise<Partial<import("../../entities").User>>;
    login(loginDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
}
