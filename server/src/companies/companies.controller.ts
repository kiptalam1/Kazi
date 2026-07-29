import { Controller, Get } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('/api/v1/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  // all companies;
  @Get()
  @ApiOkResponse()
  async findAll() {
    return await this.companiesService.findAll();
  }
}
