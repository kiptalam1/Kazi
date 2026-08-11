import { Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserLoginResponse } from './dto/user-response.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAvatarApiResponse } from './dto/avatar-response.dto.js';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

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

  // upload user avatar; 
  @ApiCreatedResponse({
    summary: 'Profile uploaded successfully',
    type: UploadAvatarApiResponse,
  })
  @ApiOperation({
    summary: "User upload avatar",
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('me/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async upoadAvatar(
    @CurrentUser('id') userId: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 5 * 1024 * 1024,
          errorMessage: 'Image is larger than 5MB',
        }),
        new FileTypeValidator({
          fileType: 'image/*',
          errorMessage: 'Only image file is allowed.',
        }),
      ],
    })) file: Express.Multer.File,
  ): Promise<UploadAvatarApiResponse> {
    return await this.usersService.uploadAvatar(
      userId,
      file
    );
  }

  // delete user avatar; 
  @ApiOkResponse({
    summary: 'Avatar deleted successfully',
  })
  @ApiOperation({
    summary: "User delete avatar",
  })
  @HttpCode(HttpStatus.OK)
  @Delete('me/avatar')
  async deleteAvatar(
    @CurrentUser('id') userId: string,
  ) {
    return await this.usersService.deleteAvatar(userId);
  }
}
