import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InspectionsService } from './inspections.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Inspections')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inspections')
export class InspectionsController {
  constructor(private inspectionsService: InspectionsService) {}

  @Get()
  findAll() {
    return this.inspectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspectionsService.findOne(id);
  }
}