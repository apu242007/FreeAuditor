import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';

@Injectable()
export class FormulariosService {
  constructor(private prisma: PrismaService) {}

  async create(createFormularioDto: CreateFormularioDto, autorId: string) {
    return this.prisma.formulario.create({
      data: {
        ...createFormularioDto,
        autorId,
      },
      include: {
        secciones: {
          include: {
            preguntas: {
              include: {
                opciones: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(autorId?: string) {
    return this.prisma.formulario.findMany({
      where: autorId ? { autorId } : undefined,
      include: {
        secciones: {
          include: {
            preguntas: {
              include: {
                opciones: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.formulario.findUnique({
      where: { id },
      include: {
        secciones: {
          include: {
            preguntas: {
              include: {
                opciones: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, updateFormularioDto: UpdateFormularioDto) {
    return this.prisma.formulario.update({
      where: { id },
      data: updateFormularioDto,
      include: {
        secciones: {
          include: {
            preguntas: {
              include: {
                opciones: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.formulario.delete({
      where: { id },
    });
  }
}