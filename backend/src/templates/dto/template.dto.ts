import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  helpText?: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  defaultScore?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  validationRules?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  options?: any[];
}

export class CreateSectionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  isRepeatable?: boolean;

  @ApiProperty({ type: [CreateQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}

export class CreatePageDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({ type: [CreateSectionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections: CreateSectionDto[];
}

export class CreateTemplateDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  scoringEnabled?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxScore?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  passingScore?: number;

  @ApiProperty({ type: [CreatePageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePageDto)
  pages: CreatePageDto[];
}

export class UpdateTemplateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  scoringEnabled?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxScore?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  passingScore?: number;
}