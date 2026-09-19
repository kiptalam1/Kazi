import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response, Request } from 'express';
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
  // refresh accesstoken.
  async refreshTokens(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token as string;
    if (!refreshToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    let payload: {
      sub: string;
      email: string;
      roles: Role[];
    };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Unauthorized');
    }
    // compare refresh tokens;
    const isRefreshMatch = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );
    if (!isRefreshMatch) {
      throw new UnauthorizedException('Unauthorized');
    }
    // generate new tokens;
    const roles = user.roles.map((r) => r.role);
    const tokens = await this.generateTokens(user.id, user.email, roles);
    // hash refresh token and update db;
    const refreshHash = await this.hashRefreshToken(tokens.refreshToken);
    await this.usersService.updateUser({
      where: { id: user.id },
      data: {
        refreshTokenHash: refreshHash,
      },
    });
    // attach new tokens to cookies
    this.setTokensCookie(res, tokens.refreshToken, tokens.accessToken);

    return {
      message: 'Tokens refreshed successfully',
    };
  }

  // logout user.
  async logout(id: string) {
    await this.usersService.updateUser({
      where: { id },
      data: {
        refreshTokenHash: null,
      },
    });
    return {
      message: 'Logged out successfully',
    };
  }

  // login user;
  async login(res: Response, loginDto: LoginDto) {
    const existsUser = await this.usersService.findByEmail(loginDto.email);
    if (!existsUser) {
      throw new UnauthorizedException('Invalid email or password');
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
    // if (!existsUser.emailVerified) {
    //   throw new UnauthorizedException(
    //     'Please verify your email before signing in.',
    //   );
    // }
    //
    // user and password correct, issue tokens;
    const roles = existsUser.roles.map(({ role }) => role);
    const { accessToken, refreshToken } = await this.generateTokens(
      existsUser.id,
      existsUser.email,
      roles,
    );

    // hash and store refreshToken;
    const refreshHash = await this.hashRefreshToken(refreshToken);

    await this.usersService.updateUser({
      where: { id: existsUser.id },
      data: {
        refreshTokenHash: refreshHash,
        lastLoginAt: new Date(),
      },
    });

    // add refresh to cookie;
    this.setTokensCookie(res, refreshToken, accessToken);

    return {
      message: 'Logged in successfully',
      // accessToken: accessToken,
      data: {
        id: existsUser.id,
        email: existsUser.email,
        firstName: existsUser.firstName,
        lastName: existsUser.lastName,
        roles,
        avatarId: existsUser.avatarId,
        avatar: existsUser.avatar?.url ?? null,
        phone: existsUser.phone,
        isActive: existsUser.isActive,
        lastLoginAt: existsUser.lastLoginAt,
        candidate: existsUser.candidate,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existsUser = await this.usersService.findByEmail(registerDto.email);
    if (existsUser) {
      throw new BadRequestException('A user with this email already exists');
    }

    // hash user's password
    const passwordHashed = await this.hashPassword(registerDto.password);

    const newRegisteredUser = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: registerDto.email,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          passwordHash: passwordHashed,
          phone: registerDto.phone || null,
          roles: {
            create: {
              role: Role.CANDIDATE,
            },
          },
        },
      });

      await tx.candidate.create({
        data: {
          userId: user.id,
        },
      });

      return user;
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
  // add refresh token to cookie.
  private setTokensCookie(
    res: Response,
    refreshToken: string,
    accessToken: string,
  ) {
    const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;
    const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
    const commonOptions = {
      secure: process.env.NODE_ENV == 'production',
      sameSite: 'none' as const,
      httpOnly: true,
      // partitioned: true,
      path: '/',
    };
    res.cookie('refresh_token', refreshToken, {
      ...commonOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
    res.cookie('access_token', accessToken, {
      ...commonOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
  }
}
