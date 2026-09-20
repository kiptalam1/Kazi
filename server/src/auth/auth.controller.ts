import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  UserRegisteredResponse,
  UserLoginResponse,
} from '../users/dto/user-response.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // login user.
  @Public()
  @ApiOkResponse({
    description: 'Logged in successfully',
    type: UserLoginResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(res, loginDto);
  }

  // register user.
  @Public()
  @ApiCreatedResponse({
    description: 'Account created successfully',
    type: UserRegisteredResponse,
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // logout user.
  @Post('logout')
  @ApiOkResponse({
    description: 'Logged out successfully',
  })
  @ApiCookieAuth()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  logout(
    @CurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(userId, res);
  }

  // refresh and rotate tokens
  @Public() // to skip jwtauthguard and user refresh_token authentication instead
  @Post('refresh-tokens')
  @ApiOkResponse({
    description: 'Tokens refreshed successfully',
  })
  @ApiCookieAuth('refresh_token')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.refreshTokens(req, res);
  }
}
