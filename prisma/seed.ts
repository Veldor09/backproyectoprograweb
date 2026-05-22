import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.admin.findUnique({
    where: { email: 'admin@forceextreme.com' },
  });

  if (!existing) {
    await prisma.admin.create({
      data: {
        email: 'admin@forceextreme.com',
        password: await bcrypt.hash('admin123', 10),
        name: 'Administrador',
      },
    });
    console.log('Admin creado: admin@forceextreme.com / admin123');
  }

  const classCount = await prisma.classSchedule.count();
  if (classCount === 0) {
    await prisma.classSchedule.createMany({
      data: [
        { name: 'Fuerza', instructor: 'Carlos R.', dayOfWeek: 1, startTime: '06:00', endTime: '07:00', capacity: 15 },
        { name: 'HIIT', instructor: 'Laura M.', dayOfWeek: 1, startTime: '18:00', endTime: '19:00', capacity: 20 },
        { name: 'Funcional', instructor: 'Carlos R.', dayOfWeek: 3, startTime: '07:00', endTime: '08:00', capacity: 15 },
        { name: 'Iniciación', instructor: 'Laura M.', dayOfWeek: 3, startTime: '17:00', endTime: '18:00', capacity: 10 },
        { name: 'HIIT', instructor: 'Carlos R.', dayOfWeek: 5, startTime: '06:00', endTime: '07:00', capacity: 20 },
        { name: 'Fuerza', instructor: 'Laura M.', dayOfWeek: 5, startTime: '18:00', endTime: '19:00', capacity: 15 },
        { name: 'Funcional', instructor: 'Carlos R.', dayOfWeek: 6, startTime: '08:00', endTime: '09:00', capacity: 15 },
      ],
    });
    console.log('Clases de ejemplo creadas');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
