"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
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
                role: 'SUPER_ADMIN',
            },
        });
        console.log('✅ Super-admin creado: admin@forceextreme.com / admin123');
    }
    else if (existing.role !== 'SUPER_ADMIN') {
        await prisma.admin.update({
            where: { id: existing.id },
            data: { role: 'SUPER_ADMIN' },
        });
        console.log('✅ Admin existente promovido a SUPER_ADMIN');
    }
    const instructorCount = await prisma.instructor.count();
    if (instructorCount === 0) {
        await prisma.instructor.createMany({
            data: [
                {
                    name: 'Carlos Rodríguez',
                    specialty: 'Fuerza & Funcional',
                    bio: 'Entrenador certificado con 8 años de experiencia en levantamiento olímpico y entrenamiento funcional. Especialista en progresión de fuerza y corrección de técnica.',
                    photoUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80',
                    order: 1,
                },
                {
                    name: 'Laura Méndez',
                    specialty: 'HIIT & Iniciación',
                    bio: 'Licenciada en Ciencias del Deporte. Apasionada por el entrenamiento de alta intensidad y por ayudar a quienes empiezan desde cero a ganar confianza y resultados.',
                    photoUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80',
                    order: 2,
                },
                {
                    name: 'Diego Vargas',
                    specialty: 'Cardio & Movilidad',
                    bio: 'Especialista en acondicionamiento físico general y movilidad articular. Sus clases combinan trabajo cardiovascular con rutinas de flexibilidad para una recuperación óptima.',
                    photoUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80',
                    order: 3,
                },
            ],
        });
        console.log('✅ Instructores creados');
    }
    const classCount = await prisma.classSchedule.count();
    if (classCount === 0) {
        await prisma.classSchedule.createMany({
            data: [
                { name: 'Fuerza', instructor: 'Carlos Rodríguez', dayOfWeek: 1, startTime: '06:00', endTime: '07:00', capacity: 15 },
                { name: 'HIIT', instructor: 'Laura Méndez', dayOfWeek: 1, startTime: '18:00', endTime: '19:00', capacity: 20 },
                { name: 'Funcional', instructor: 'Diego Vargas', dayOfWeek: 2, startTime: '07:00', endTime: '08:00', capacity: 15 },
                { name: 'Iniciación', instructor: 'Laura Méndez', dayOfWeek: 2, startTime: '17:00', endTime: '18:00', capacity: 10 },
                { name: 'Funcional', instructor: 'Carlos Rodríguez', dayOfWeek: 3, startTime: '07:00', endTime: '08:00', capacity: 15 },
                { name: 'HIIT', instructor: 'Diego Vargas', dayOfWeek: 3, startTime: '18:00', endTime: '19:00', capacity: 20 },
                { name: 'Fuerza', instructor: 'Carlos Rodríguez', dayOfWeek: 4, startTime: '06:00', endTime: '07:00', capacity: 15 },
                { name: 'Iniciación', instructor: 'Laura Méndez', dayOfWeek: 4, startTime: '17:00', endTime: '18:00', capacity: 10 },
                { name: 'HIIT', instructor: 'Laura Méndez', dayOfWeek: 5, startTime: '06:00', endTime: '07:00', capacity: 20 },
                { name: 'Fuerza', instructor: 'Carlos Rodríguez', dayOfWeek: 5, startTime: '18:00', endTime: '19:00', capacity: 15 },
                { name: 'Funcional', instructor: 'Diego Vargas', dayOfWeek: 6, startTime: '08:00', endTime: '09:00', capacity: 15 },
                { name: 'HIIT', instructor: 'Laura Méndez', dayOfWeek: 6, startTime: '10:00', endTime: '11:00', capacity: 20 },
            ],
        });
        console.log('✅ Clases de ejemplo creadas (Lun–Sáb)');
    }
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map