# ── Build stage ───────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# ── Runtime stage ─────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos el build y el schema, y regeneramos el cliente Prisma
# contra los node_modules de producción (evita rutas ambiguas).
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

EXPOSE 4000

# Aplica migraciones, carga datos iniciales (idempotente) y arranca.
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed-prod.js && node dist/src/main"]
