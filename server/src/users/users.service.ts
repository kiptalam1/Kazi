import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { FileType, type Prisma, type User } from '../generated/prisma/client.js';
import { CloudinaryService } from '../infrastructure/storage/cloudinary/cloudinary.service.js';
import { UploadAvatarApiResponse } from './dto/avatar-response.dto.js';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) { }

  // upload user avatar;
  async uploadAvatar(
    userId: string,
    file: Express.Multer.File
  ): Promise<UploadAvatarApiResponse> {
    const existingAvatar = await this.prisma.file
      .findFirst({
        where: {
          userAvatar: {
            id: userId,
          },
          type: FileType.AVATAR,
        },
      });

    let uploaded;
    try {
      uploaded = await this.cloudinary.uploadFile(
        file,
        'kazi/avatars',
        'image'
      );
    } catch {
      throw new BadRequestException(
        'failed to upload avatar.',
      );
    }

    let newAvatar;
    try {
      newAvatar = await this.prisma.file.create({
        data: {
          fileName: file.originalname,
          mimeType: file.mimetype,
          publicId: uploaded.public_id,
          size: file.size,
          type: FileType.AVATAR,
          url: uploaded.secure_url,
          userAvatar: {
            connect: {
              id: userId,
            },
          },
        },
      });

    } catch (error) {
      try {
        console.error(error);
        await this.cloudinary.deleteFile(
          uploaded.public_id
        );
      } catch (cleanupError) {
        console.error(cleanupError);
      }
      throw new InternalServerErrorException(
        'Failed to upload avatar');
    }
    if (existingAvatar) {
      await this.cloudinary
        .deleteFile(existingAvatar.publicId);

      await this.prisma.file.delete({
        where: {
          id: existingAvatar.id,
        },
      });
    }
    return {
      message: 'Avatar uploaded successfully',
      data: {
        id: newAvatar.id,
        fileName: newAvatar.fileName,
        mimeType: newAvatar.mimeType,
        size: newAvatar.size,
        url: newAvatar.url,
        type: newAvatar.type,
      },
    };
  }

  // delete user avatar;
  async deleteAvatar(
    userId: string,
  ) {
    const existsAvatar = await this.prisma.file.findFirst({
      where: {
        type: FileType.AVATAR,
        userAvatar: {
          id: userId
        },
      }
    });

    if (!existsAvatar) {
      throw new NotFoundException(
        'Avatar not found',
      );
    }

    try {
      await this.cloudinary.deleteFile(existsAvatar.publicId);

      await this.prisma.file.delete({
        where: {
          id: existsAvatar.id,
        }
      });

      return {
        message: 'Avatar deleted successfully.',
      };

    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to delete avatar.'
      );
    }
  }

  // get my profile
  async me(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    const roles = user.roles.map((r) => r.role);
    return {
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
        avatarId: user.avatarId,
        avatar: user.avatar
          ? this.cloudinary.getAvatarUrl(user.avatar.publicId)
          : null,
        phone: user.phone,
        isActive: user.isActive,
        candidate: user.candidate,
        lastLoginAt: user.lastLoginAt,
      },
    };
  }

  // find user with email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
        candidate: true,
      },
    });
  }

  // find user with id
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
        candidate: true,
        avatar: {
          select: {
            url: true,
            type: true,
            publicId: true,
          },
        },
      },
    })
  }


  // update user
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }
}
