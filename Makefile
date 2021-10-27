build-dev:
	cd frontend && $(MAKE) build-frontend-dev
	cd backend_api && $(MAKE) build-backend

run-dev:
	docker-compose -f docker-compose-dev.yml up
