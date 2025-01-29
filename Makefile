start-arangodb:
	docker run --name arangodb -d -p 8529:8529 -e ARANGO_ROOT_PASSWORD=test123 arangodb/arangodb:3.12.3

migrate-up:
	cd migrations && npm run build && npm run migrate

