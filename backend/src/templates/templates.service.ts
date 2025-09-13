import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/template.dto';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async create(createTemplateDto: CreateTemplateDto, userId: string) {
    const { pages, ...templateData } = createTemplateDto;

    return this.prisma.template.create({
      data: {
        ...templateData,
        creatorId: userId,
        pages: {
          create: pages.map((page, pageIndex) => ({
            ...page,
            order: pageIndex,
            sections: {
              create: page.sections.map((section, sectionIndex) => ({
                ...section,
                order: sectionIndex,
                questions: {
                  create: section.questions.map((question, questionIndex) => ({
                    ...question,
                    order: questionIndex,
                    options: question.options ? {
                      create: question.options.map((option, optionIndex) => ({
                        ...option,
                        order: optionIndex,
                      }))
                    } : undefined,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        pages: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.template.findMany({
      where: {
        isArchived: false,
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: {
            inspections: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
      include: {
        pages: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    options: true,
                    conditions: true,
                  },
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return template;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return this.prisma.template.update({
      where: { id },
      data: updateTemplateDto,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async duplicate(id: string, userId: string) {
    const originalTemplate = await this.findOne(id);
    
    const { id: _, createdAt, updatedAt, creator, ...templateData } = originalTemplate;
    
    return this.prisma.template.create({
      data: {
        ...templateData,
        title: `${templateData.title} (Copy)`,
        creatorId: userId,
        pages: {
          create: originalTemplate.pages.map((page) => ({
            title: page.title,
            description: page.description,
            order: page.order,
            sections: {
              create: page.sections.map((section) => ({
                title: section.title,
                description: section.description,
                order: section.order,
                isRepeatable: section.isRepeatable,
                questions: {
                  create: section.questions.map((question) => ({
                    text: question.text,
                    helpText: question.helpText,
                    type: question.type,
                    isRequired: question.isRequired,
                    order: question.order,
                    defaultScore: question.defaultScore,
                    validationRules: question.validationRules,
                    options: {
                      create: question.options.map((option) => ({
                        text: option.text,
                        value: option.value,
                        score: option.score,
                        order: option.order,
                      })),
                    },
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async archive(id: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return this.prisma.template.update({
      where: { id },
      data: { isArchived: true },
    });
  }

  async remove(id: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return this.prisma.template.delete({
      where: { id },
    });
  }
}