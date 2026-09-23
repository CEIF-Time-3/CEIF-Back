.PHONY: dev-up dev-down prod-up prod-down db-generate db-migrate db-push db-studio logs

# --- AMBIENTES DOCKER ---
dev-up:
	docker compose -f docker-compose.dev.yml up -d --build

dev-down:
	docker compose -f docker-compose.dev.yml down

prod-up:
	docker compose -f docker-compose.prd.yml up -d --build

prod-down:
	docker compose -f docker-compose.prd.yml down

logs-api-dev:
	docker compose -f docker-compose.dev.yml logs -f api_dev
logs-api-prod:
	docker compose -f docker-compose.prod.yml logs -f api_prod
# --- DRIZZLE ORM / BANCO DE DADOS ---
db-generate:
	npx drizzle-kit generate

db-migrate:
	npx drizzle-kit migrate

db-push:
	npx drizzle-kit push

db-studio:
	npx drizzle-kit studio