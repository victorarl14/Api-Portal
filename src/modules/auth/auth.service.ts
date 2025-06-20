import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import { RegisterUserDto, LoginUserDto } from '../../dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterUserDto): Promise<{ message: string; user: Partial<User> }> {
    const { username, email, password, first_name, last_name } = registerDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('El usuario ya existe con ese email o username');
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Crear el usuario
    const user = this.userRepository.create({
      username,
      email,
      password_hash,
      first_name,
      last_name,
    });

    const savedUser = await this.userRepository.save(user);

    // Retornar usuario sin contraseña
    const { password_hash: _, ...userWithoutPassword } = savedUser;
    return {
      message: 'Usuario registrado exitosamente',
      user: userWithoutPassword,
    };
  }

  async login(loginDto: LoginUserDto): Promise<{ message: string; user: Partial<User> }> {
    const { email, password } = loginDto;

    // Buscar usuario por email
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si el usuario está activo
    if (!user.is_active) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Retornar usuario sin contraseña
    const { password_hash: _, ...userWithoutPassword } = user;
    return {
      message: 'Login exitoso',
      user: userWithoutPassword,
    };
  }
} 