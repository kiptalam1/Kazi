import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { ApiOkResponse } from '@nestjs/swagger';
import { CompanyDto, GetAllCompaniesResponseDto } from './dto/company-response.dto.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { GetCompanyQueryDto } from './dto/candidate-query.dto.js';

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
  @ApiOkResponse({ type: GetAllCompaniesResponseDto, isArray: true })
  async findAll(
    @Query()
    query: GetCompanyQueryDto
  ) {
    return await this.companiesService.findAll(query);
  }
}
