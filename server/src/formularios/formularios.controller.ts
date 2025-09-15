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
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('formularios')
@Controller('formularios')
export class FormulariosController {
  constructor(private readonly formulariosService: FormulariosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo formulario' })
  @ApiResponse({ status: 201, description: 'Formulario creado exitosamente.' })
  create(@Body() createFormularioDto: CreateFormularioDto, @Request() req) {
    // TODO: Implement JWT auth guard and get user from request
    const autorId = 'default-user-id'; // Placeholder until auth is implemented
    return this.formulariosService.create(createFormularioDto, autorId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los formularios' })
  @ApiResponse({ status: 200, description: 'Lista de formularios.' })
  findAll(@Request() req) {
    // TODO: Filter by authenticated user
    return this.formulariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un formulario por ID' })
  @ApiResponse({ status: 200, description: 'Formulario encontrado.' })
  @ApiResponse({ status: 404, description: 'Formulario no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.formulariosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un formulario' })
  @ApiResponse({ status: 200, description: 'Formulario actualizado exitosamente.' })
  update(@Param('id') id: string, @Body() updateFormularioDto: UpdateFormularioDto) {
    return this.formulariosService.update(id, updateFormularioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un formulario' })
  @ApiResponse({ status: 200, description: 'Formulario eliminado exitosamente.' })
  remove(@Param('id') id: string) {
    return this.formulariosService.remove(id);
  }
}