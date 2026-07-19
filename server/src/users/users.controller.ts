import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ApiCookieAuth, ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserLoginResponse } from './dto/user-response.dto.js';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // get authenticated user;
  @Get('me')
  @ApiOkResponse({
    type: UserLoginResponse,
  })
  @ApiCookieAuth('refresh_token')
  @HttpCode(HttpStatus.OK)
  async me(
    @CurrentUser('id')
    id: string,
  ) {
    return await this.usersService.me(id);
  }

}
