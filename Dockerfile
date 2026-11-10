# --- Estágio Base ---
FROM node:20-alpine AS base
WORKDIR /app

# --- Estágio Builder ---
FROM base AS builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

# --- Estágio Development ---
FROM builder AS development
ENV NODE_ENV=development
RUN chown -R node:node /app
USER node
CMD ["npm", "run", "start:dev"]

# --- Estágio Production Otimizado ---
FROM base AS production
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY ./drizzle ./drizzle 

RUN chown -R node:node /app
USER node

CMD ["/bin/sh", "-c", "npm run db:migrate && npm run db:seed && npm run start:prod"]