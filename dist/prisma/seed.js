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
//# sourceMappingURL=seed.js.map