import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { ApiOkResponse } from '@nestjs/swagger';
import { CompanyDto, GetAllCompaniesResponseDto } from './dto/company-response.dto.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { GetCompanyQueryDto } from './dto/candidate-query.dto.js';
import { UpdateCompanyDto } from './dto/update-company.dto.js';

@Controller('/api/v1/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  // get a single company;
  @Get(':slug')
  @ApiOkResponse({ type: CompanyDto })
  async getOne(
    @Param('slug')
    slug: string) {
    return await this.companiesService.findOne(slug);
  }

  // update company;
  @Patch('update/:id')
  @ApiOkResponse({ type: CompanyDto })
  async update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateDto: UpdateCompanyDto) {
    return await this.companiesService.update(id, updateDto);
  }

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
