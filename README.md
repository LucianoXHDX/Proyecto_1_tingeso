Codigos utiles para levantar la app
 Para consutrir desde la terminal en la carpeta backend/
 ```bash
 mvn clean package -DskipTests
```
para correrlo en local en la carpeta backend/
```bash
mvn spring-boot:run
```
# Para crear imagen:
```bash
docker build -t lucianoxhdx/tingeso-backend:latest .
# *** docker build --no-cache -t lucianoxhdx/tingeso-backend:latest .

# Para correr imagen:
docker run --name tingeso-backend -e DB_HOST=192.168.3.155 -e DB_PORT=5432 -e DB_NAME=tingeso_db -e DB_USER=postgres -e DB_PASSWORD=postgres -d -p 8080:8080 lucianoxhdx/tingeso-backend
# Para abrir backend en el navegador:
# http://localhost:8080/api/v1/travel-packages

# Para subir imagen a Docker Hub:
docker login
docker push lucianoxhdx/tingeso-backend:latest
```


para construir el font 
desde la carpeta forntend
```bash
npm run build
```
para crear la imagen 
```bash
docker build -t lucianoxhdx/tingeso-frontend:latest .
```
# Ir a la carpeta frontend
cd ../frontend

# Crear el build
npm run build

# Crear la imagen
docker build -t lucianoxhdx/tingeso-frontend:latest .

# Correr la imagen para probar
docker run --name tingeso-frontend -d -p 80:80 lucianoxhdx/tingeso-frontend

# Abrir en el navegador
# http://localhost:80

# Subir a Docker Hub
docker push lucianoxhdx/tingeso-frontend:latest





para levantar el docker compose
desde la carpeta lab1/
``` bash
docker-compose up
```
