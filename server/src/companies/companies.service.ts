import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class CompaniesService {
  constructor(
    private prisma: PrismaService,
  ) { }
  // get all companies;
  async findAll() {
    return await this.prisma.company.findMany();
  }
}
