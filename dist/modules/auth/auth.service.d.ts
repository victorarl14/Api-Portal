import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities';
import { RegisterUserDto, LoginUserDto } from '../../dto/auth.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterUserDto): Promise<Partial<User>>;
    login(loginDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
}
