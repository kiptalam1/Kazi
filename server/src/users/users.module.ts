import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { PrismaService } from '../prisma.service.js';
import { CloudinaryModule } from '../infrastructure/storage/cloudinary/cloudinary.module.js';

@Module({
  imports: [CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [PrismaService, UsersService],
})
export class UsersModule {}
