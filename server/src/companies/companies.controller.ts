import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { ApiOkResponse } from '@nestjs/swagger';
import { CompanyDto } from './dto/company-response.dto.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

@Controller('/api/v1/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  // create company;
  @Post('create')
  @ApiOkResponse({ type: CompanyDto })
  async create(
    @Body() createDto: CreateCompanyDto
    , @CurrentUser('id') userId: string
  ) {
    return await this.companiesService.create(userId, createDto);
  }
  // all companies;
  @Get()
  @ApiOkResponse({ type: CompanyDto, isArray: true })
  async findAll() {
    return await this.companiesService.findAll();
  }
}
