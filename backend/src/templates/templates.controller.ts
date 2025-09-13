import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/template.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Templates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new template' })
  create(@Body() createTemplateDto: CreateTemplateDto, @Request() req) {
    return this.templatesService.create(createTemplateDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all templates' })
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get template by ID' })
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update template' })
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(id, updateTemplateDto);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate template' })
  duplicate(@Param('id') id: string, @Request() req) {
    return this.templatesService.duplicate(id, req.user.id);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive template' })
  archive(@Param('id') id: string) {
    return this.templatesService.archive(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete template' })
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }
}