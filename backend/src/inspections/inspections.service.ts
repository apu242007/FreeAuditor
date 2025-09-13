import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class InspectionsService {
  constructor(private prisma: PrismaService) {}

  async create(templateId: string, conductorId: string) {
    return this.prisma.inspection.create({
      data: {
        templateId,
        conductorId,
      },
      include: {
        template: true,
        conductor: {
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
    return this.prisma.inspection.findMany({
      include: {
        template: {
          select: {
            id: true,
            title: true,
          },
        },
        conductor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.inspection.findUnique({
      where: { id },
      include: {
        template: {
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
          },
        },
        conductor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        answers: {
          include: {
            question: true,
            option: true,
            files: true,
          },
        },
      },
    });
  }

  // Additional methods will be implemented as needed
}