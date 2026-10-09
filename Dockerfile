# --- Estágio Base ---
FROM node:20-alpine AS base
WORKDIR /app

# --- Estágio Builder (Copia tudo e instala as dependências uma única vez) ---
FROM base AS builder
COPY package*.json ./
RUN npm install
COPY . .

# --- Estágio Development (Apenas muda a execução) ---
FROM builder AS development
ENV NODE_ENV=development
# Garante as permissões corretas para o usuário node
RUN chown -R node:node /app
USER node
CMD ["npm", "run", "start:dev"]

# --- Estágio Production (Gera o build e muda a execução) ---
FROM builder AS production
ENV NODE_ENV=production
RUN npm run build
# Garante as permissões corretas para o usuário node
RUN chown -R node:node /app
USER node
CMD ["npm", "run", "start:prod"]
