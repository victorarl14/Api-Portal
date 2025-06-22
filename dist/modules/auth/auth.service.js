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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const entities_1 = require("../../entities");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { email, password, first_name, last_name, username } = registerDto;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Ya existe un usuario con este correo electrónico.');
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
        const { password_hash: _, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password_hash')
            .where('user.email = :email', { email })
            .getOne();
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new common_1.UnauthorizedException('Correo o contraseña incorrectos.');
        }
        if (!user.is_active) {
            throw new common_1.UnauthorizedException('La cuenta de usuario está inactiva.');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map