"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const result = await prisma.classSchedule.createMany({
        data: [
            { name: 'Funcional', instructor: 'Diego Vargas', dayOfWeek: 2, startTime: '07:00', endTime: '08:00', capacity: 15 },
            { name: 'Iniciación', instructor: 'Laura Méndez', dayOfWeek: 2, startTime: '17:00', endTime: '18:00', capacity: 10 },
            { name: 'Fuerza', instructor: 'Carlos Rodríguez', dayOfWeek: 4, startTime: '06:00', endTime: '07:00', capacity: 15 },
            { name: 'Iniciación', instructor: 'Laura Méndez', dayOfWeek: 4, startTime: '17:00', endTime: '18:00', capacity: 10 },
        ],
        skipDuplicates: true,
    });
    console.log(`✅ ${result.count} clases de Martes/Jueves creadas`);
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=add-classes.js.map