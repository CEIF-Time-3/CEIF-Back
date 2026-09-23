# --- Stage Base ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- Stage Development ---
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

# --- Stage Builder ---
FROM base AS builder
RUN npm install
COPY . .
RUN npm run build

# --- Stage Production ---
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]