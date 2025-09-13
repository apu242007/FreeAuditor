import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting to seed the database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@freeauditor.com' },
    update: {},
    create: {
      email: 'admin@freeauditor.com',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create demo auditor user
  const auditorPassword = await bcrypt.hash('auditor123', 12);
  const auditor = await prisma.user.upsert({
    where: { email: 'auditor@freeauditor.com' },
    update: {},
    create: {
      email: 'auditor@freeauditor.com',
      firstName: 'Demo',
      lastName: 'Auditor',
      password: auditorPassword,
      role: 'AUDITOR',
    },
  });

  console.log('✅ Created auditor user:', auditor.email);

  // Create a demo template
  const template = await prisma.template.create({
    data: {
      title: 'Safety Inspection Checklist',
      description: 'Basic safety inspection template for workplace audits',
      creatorId: admin.id,
      scoringEnabled: true,
      maxScore: 100,
      passingScore: 80,
      pages: {
        create: [
          {
            title: 'General Safety',
            description: 'Basic safety checks',
            order: 0,
            sections: {
              create: [
                {
                  title: 'Emergency Equipment',
                  description: 'Check emergency equipment availability and condition',
                  order: 0,
                  questions: {
                    create: [
                      {
                        text: 'Are fire extinguishers present and accessible?',
                        type: 'SELECT_ONE',
                        isRequired: true,
                        order: 0,
                        defaultScore: 10,
                        options: {
                          create: [
                            { text: 'Yes', value: 'yes', score: 10, order: 0 },
                            { text: 'No', value: 'no', score: 0, order: 1 },
                            { text: 'Partially', value: 'partial', score: 5, order: 2 },
                          ],
                        },
                      },
                      {
                        text: 'Are emergency exits clearly marked?',
                        type: 'SELECT_ONE',
                        isRequired: true,
                        order: 1,
                        defaultScore: 10,
                        options: {
                          create: [
                            { text: 'Yes', value: 'yes', score: 10, order: 0 },
                            { text: 'No', value: 'no', score: 0, order: 1 },
                          ],
                        },
                      },
                      {
                        text: 'Take a photo of the emergency equipment',
                        type: 'PHOTO',
                        isRequired: false,
                        order: 2,
                      },
                    ],
                  },
                },
                {
                  title: 'Personal Protective Equipment',
                  description: 'Check PPE requirements and compliance',
                  order: 1,
                  questions: {
                    create: [
                      {
                        text: 'Are hard hats required in this area?',
                        type: 'CHECKBOX',
                        isRequired: false,
                        order: 0,
                        defaultScore: 5,
                      },
                      {
                        text: 'PPE Compliance Score (1-10)',
                        type: 'SLIDER',
                        isRequired: true,
                        order: 1,
                        defaultScore: 10,
                        validationRules: {
                          min: 1,
                          max: 10,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Created demo template:', template.title);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📝 Demo credentials:');
  console.log('Admin: admin@freeauditor.com / admin123');
  console.log('Auditor: auditor@freeauditor.com / auditor123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });