import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { UsersService } from '../users/users.service.js';
import { PrismaService } from '../prisma.service.js';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';
import { Role } from '../generated/prisma/client.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async login(loginDto: LoginDto) {
    const existsUser = await this.usersService.findByEmail(loginDto.email);
    if (!existsUser) {
      throw new UnauthorizedException('Invalid email or password')
    }
    // check if password provided is correct
    const isPasswordMatch = await this.verifyPassword(
      loginDto.password,
      existsUser.passwordHash,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!existsUser.isActive) {
      throw new ForbiddenException('Account is disabled');
    }
    if (!existsUser.emailVerified) {
      throw new UnauthorizedException(
        'Please verify your email before signing in.'
      );
    }

    // user and password correct, issue tokens;
    const roles = existsUser.roles.map(({ role }) => role)
    const tokens = await this.generateTokens(
      existsUser.id,
      existsUser.email,
      roles,
    );

    // hash and store refreshToken;
    const refreshHash = await this.hashRefreshToken(tokens.refreshToken);

    await this.usersService.updateUser({
      where: { id: existsUser.id },
      data: {
        refreshTokenHash: refreshHash,
        lastLoginAt: new Date(),
      },
    });

    return {
      message: 'Logged in successfully',
      accessToken: tokens.accessToken,
      data: {
        id: existsUser.id,
        email: existsUser.email,
        firstName: existsUser.firstName,
        lastName: existsUser.lastName,
        roles,
        avatar: existsUser.avatar,
        phone: existsUser.phone,
        isActive: existsUser.isActive,
        lastLoginAt: existsUser.lastLoginAt,
      },
    };
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
        roles: {
          create: {
            role: Role.CANDIDATE,
          },
        },
      },
    });

    const { passwordHash: _passwordHash, ...results } = newRegisteredUser;

    return {
      message: 'Account created successfully',
      data: results,
    };
  }

  private async generateTokens(id: string, email: string, roles: Role[]) {
    const accessToken = await this.generateAcessToken(id, email, roles);
    const refreshToken = await this.generateRefreshToken(id);
    return { accessToken, refreshToken };
  }

  private async generateAcessToken(id: string, email: string, roles: Role[]) {
    const payload = {
      sub: id,
      email,
      roles,
    };
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
    });
  }

  private async generateRefreshToken(id: string) {
    const payload = { sub: id };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  private async verifyPassword(inputPassword: string, dbPassword: string) {
    return await bcrypt.compare(inputPassword, dbPassword);
  }
  private async hashRefreshToken(token: string) {
    return await bcrypt.hash(token, 12);
  }
}
