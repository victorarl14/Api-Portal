import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities';
import { RegisterUserDto, LoginUserDto } from '../../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto): Promise<Partial<User>> {
    const { email, password, first_name, last_name, username } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con este correo electrónico.');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password_hash,
      first_name,
      last_name,
      username: username || email.split('@')[0],
      is_active: true,
    });

    const savedUser = await this.userRepository.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async login(loginDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password_hash')
      .where('user.email = :email', { email })
      .getOne();

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('La cuenta de usuario está inactiva.');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    };
    
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
} 