FRONTEND_IMAGE := lucianoxhdx/tingeso-frontend:latest
BACKEND_IMAGE  := lucianoxhdx/tingeso-backend:latest

FRONTEND_SERVICES := frontend1 frontend2 frontend3
BACKEND_SERVICES  := backend1 backend2 backend3

.PHONY: help \
        front-build front-push front-deploy front \
        back-build back-push back-deploy back \
        deploy-all up down restart logs ps

# ─────────────────────────────────────────
#  AYUDA
# ─────────────────────────────────────────
help:
	@echo ""
	@echo "  TINGESO TRAVEL — Comandos disponibles"
	@echo "  ─────────────────────────────────────"
	@echo "  FRONTEND"
	@echo "    make front-build   → docker build del frontend"
	@echo "    make front-push    → push a Docker Hub"
	@echo "    make front-deploy  → pull + recrear frontend1/2/3 en EC2"
	@echo "    make front         → build + push + deploy (ciclo completo)"
	@echo ""
	@echo "  BACKEND"
	@echo "    make back-build    → mvn package + docker build del backend"
	@echo "    make back-push     → push a Docker Hub"
	@echo "    make back-deploy   → pull + recrear backend1/2/3 en EC2"
	@echo "    make back          → build + push + deploy (ciclo completo)"
	@echo ""
	@echo "  COMPOSE"
	@echo "    make deploy-all    → front + back completos en secuencia"
	@echo "    make up            → levantar todo el stack"
	@echo "    make down          → bajar todo el stack"
	@echo "    make restart       → down + up"
	@echo "    make logs          → logs en tiempo real (todos los servicios)"
	@echo "    make ps            → estado de todos los contenedores"
	@echo ""

# ─────────────────────────────────────────
#  FRONTEND
# ─────────────────────────────────────────
front-build:
	@echo "▶ [FRONTEND] Build imagen Docker..."
	docker build --no-cache -t $(FRONTEND_IMAGE) ./frontend

front-push:
	@echo "▶ [FRONTEND] Push a Docker Hub..."
	docker push $(FRONTEND_IMAGE)

front-deploy:
	@echo "▶ [FRONTEND] Pull imagen actualizada..."
	docker pull $(FRONTEND_IMAGE)
	@echo "▶ [FRONTEND] Recreando contenedores..."
	docker compose rm -sf $(FRONTEND_SERVICES)
	docker compose up -d $(FRONTEND_SERVICES)
	@echo "✓ [FRONTEND] Desplegado. Recuerda hacer Ctrl+Shift+R en el navegador."

front: front-build front-push front-deploy

# ─────────────────────────────────────────
#  BACKEND
# ─────────────────────────────────────────
back-build:
	@echo "▶ [BACKEND] Compilando con Maven..."
	cd backend && mvn clean package -DskipTests
	@echo "▶ [BACKEND] Build imagen Docker..."
	docker build --no-cache -t $(BACKEND_IMAGE) ./backend

back-push:
	@echo "▶ [BACKEND] Push a Docker Hub..."
	docker push $(BACKEND_IMAGE)

back-deploy:
	@echo "▶ [BACKEND] Pull imagen actualizada..."
	docker pull $(BACKEND_IMAGE)
	@echo "▶ [BACKEND] Recreando contenedores..."
	docker compose rm -sf $(BACKEND_SERVICES)
	docker compose up -d $(BACKEND_SERVICES)
	@echo "✓ [BACKEND] Desplegado."

back: back-build back-push back-deploy

# ─────────────────────────────────────────
#  COMPOSE COMPLETO
# ─────────────────────────────────────────
deploy-all: front back
	@echo "✓ Stack completo actualizado."

up:
	docker compose up -d

down:
	docker compose down

restart: down up

logs:
	docker compose logs -f

ps:
	docker compose ps
