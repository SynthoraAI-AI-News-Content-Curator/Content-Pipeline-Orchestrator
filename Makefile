.PHONY: help bootstrap clean install dev build start test lint docker-up docker-down deploy

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

bootstrap: ## Install all dependencies
	npm install
	npm run install:all

clean: ## Remove build artifacts and temporary files
	rm -rf */node_modules */dist */build */.next
	rm -rf node_modules dist build
	find . -name "*.log" -delete

install: ## Install dependencies for all packages
	npm install

deps: install ## Alias for install

dev:frontend: ## Start frontend in development mode
	cd frontend && npm run dev

dev:backend: ## Start backend in development mode
	cd backend && npm run dev

dev:crawler: ## Start crawler in development mode
	cd crawler && npm run dev

dev:newsletter: ## Start newsletter in development mode
	cd newsletters && npm run dev

dev: ## Start all services in development mode
	npm run dev

build: ## Build all services
	npm run build

start: ## Start all services in production mode
	npm run start

test: ## Run all tests
	npm run test

lint: ## Lint and format all code
	npm run lint

docker-up: ## Start all services with Docker Compose
	docker-compose up -d

docker-down: ## Stop all Docker services
	docker-compose down

docker-build: ## Build Docker images
	docker-compose build

deploy: ## Deploy all services to Vercel
	npm run deploy

crawl: ## Run crawler manually
	npm run crawl

daily: ## Run daily automation script
	./daily.sh
