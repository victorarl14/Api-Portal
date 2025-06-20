import { Repository } from 'typeorm';
import { User } from '../../entities';
import { RegisterUserDto, LoginUserDto } from '../../dto/auth.dto';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    register(registerDto: RegisterUserDto): Promise<{
        message: string;
        user: Partial<User>;
    }>;
    login(loginDto: LoginUserDto): Promise<{
        message: string;
        user: Partial<User>;
    }>;
}
