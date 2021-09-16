start-server:
	npm run server
.PHONY: start-server

start-frontend:
	npm start
.PHONY: start-frontend

start:
	make -j 2 start-server start-frontend
.PHONY: start
