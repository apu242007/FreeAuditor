import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormularioDto {
  @ApiProperty({ description: 'Título del formulario' })
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Descripción del formulario', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ description: 'Estado activo del formulario', default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean = true;
}