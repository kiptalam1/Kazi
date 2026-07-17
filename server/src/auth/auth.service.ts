import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { UsersService } from '../users/users.service.js';
import { PrismaService } from '../prisma.service.js';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const existsUser = await this.usersService.findByEmail(loginDto.email);
    // check if password provided is correct
    const isPasswordMatch = await this.verifyPassword(
      loginDto.password,
      existsUser.passwordHash,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // user and password correct, issue tokens;
  }

  async register(registerDto: RegisterDto) {
    const existsUser = await this.usersService.findByEmail(registerDto.email);
    if (existsUser) {
      throw new BadRequestException(
        'A user with this email already exists. Try another one',
      );
    }

    // hash user's password
    const passwordHashed = await this.hashPassword(registerDto.password);

    const newRegisteredUser = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        passwordHash: passwordHashed,
        avatar: registerDto.avatar || null,
        phone: registerDto.phone || null,
      },
    });

    const { passwordHash: _passwordHash, ...results } = newRegisteredUser;

    return {
      message: 'Account created successfully',
      data: results,
    };
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  private async verifyPassword(inputPassword: string, dbPassword: string) {
    return await bcrypt.compare(inputPassword, dbPassword);
  }
}
