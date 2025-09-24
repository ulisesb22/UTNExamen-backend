# UTNExamen – Backend (Node.js, Express, Docker, MySQL) 🚀
### Node.js v20.19.5 (LTS) / Docker Engine 28.4.0 / Docker Compose v2.39.2
![Node.js](https://img.shields.io/badge/Node.js-v20-green)
![Docker](https://img.shields.io/badge/Docker-Engine-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

## Backend de gestión de **usuarios, productos y pedidos** con:  
🔑 Autenticación **JWT**  
🔒 Contraseñas hasheadas con **bcrypt**  
🧑‍💻 Roles: **superAdmin, admin, userComun**   
🐳 Despliegue con **Docker Compose + MySQL**   
🖥️ **CLI interactivo**  para registro, login y operaciones según rol.   
📌 Se trabaja principalmente con CLI, pero los endpoints están expuestos.   

## Resumen del Proyecto
Este proyecto implementa un backend en Node.js y Express con base de datos MySQL desplegada en Docker Compose.  
Permite la gestión de usuarios, productos y pedidos, con autenticación JWT, contraseñas seguras con bcrypt y control de acceso por roles (superAdmin, admin, userComun).  
Incluye un CLI interactivo que facilita el registro, login y operaciones según el rol, además de un modo de SQL libre exclusivo para superAdmin.  
Se incorporan seeds iniciales (roles, superAdmin y productos) y una arquitectura modular clara con controllers, services, repositories y middlewares  

# ⚙️ Inicialización del proyecto
### 1. Clonar el repositorio
git clone https://github.com/ulisesb22/UTNExamen-backend.git   
cd UTNExamen-backend  

### 2. Configurar variables de entorno (Copiar el archivo de ejemplo .env.example y renombrarlo a .env:)  
```bash
cp .env.example .env  
```
### 3. Construir las imágenes Docker (primera vez usar sin caché):
```bash
docker compose build --no-cache  
```
### 4. Levantar los contenedores
```bash
docker compose up -d
```  

### 5. Verificar que los contenedores están corriendo
```bash
docker ps  
```
Debe verse:  
utnexamen-mysql → puerto 3309, estado healthy  
utnexamen-app → puerto 3000`  

### 6. Instalar dependencias dentro del contenedor app
```bash
docker compose exec app npm install
```

### 7. Ejecutar los seeds iniciales (roles, superAdmin y productos):
```bash
docker compose exec app npm run seed  
```

### 8. Probar que la API responde
```bash
curl http://localhost:3000
```
Respuesta esperada:  
{ "success": true, "message": "UTNExamen API running" }  


### 9. Abrir el CLI interactivo
```bash
docker compose exec app npm run cli  
```

### 10. Desde el CLI se puede:
Registrarse o loguearse.  
Usar opciones según el rol (superAdmin, admin, userComun).  
Generar reportes.  
Ejecutar consultas SQL avanzadas (solo superAdmin).  

## 🧑‍💻 Datos iniciales de prueba  
Tendremos un superAdmin con el siguiente usuario y contraseña.  
Usuario: jefe5978  
Contraseña: contraseñajefe5978  
## 📦 Productos iniciales
10 productos cargados automáticamente.  
## 🔑 Roles disponibles
superAdmin: gestiona usuarios y roles, reportes, SQL libre.  
admin: gestiona productos y reportes.  
userComun: crea pedidos y consulta productos.  

## 🖥️ Notas sobre el CLI
El CLI interactivo es el medio principal de interacción con el sistema: registro, login, menús según rol y reportes.  
Si el usuario logueado es superAdmin, se habilita la opción de ejecutar consultas SQL avanzadas.  
Importante: el CLI de SQL libre solo acepta una sentencia por vez y en una sola línea.  
### ✅ Ejemplo válido:
```bash
SELECT COUNT(*) FROM Usuarios;
```
### ❌ Ejemplo inválido:
```bash
DELETE FROM Pedidos WHERE id_usuario=2; DELETE FROM Usuarios WHERE id_usuario=2;
```
## 🌐 Endpoints RESTful expuestos.
📌 El proyecto se trabaja principalmente a través del CLI interactivo.  
Sin embargo, los endpoints RESTful están completamente funcionales y pueden probarse usando herramientas como Postman o cURL.  
### 🔑 Autenticación y usuarios
POST /usuarios/register → registrar nuevo usuario (rol por defecto: userComun).  
POST /usuarios/login → login y generación de JWT.  
GET /usuarios → listar usuarios (solo superAdmin).  
DELETE /usuarios/:id → eliminar usuario (solo superAdmin).  

### 📦 Productos
GET /productos → listar productos.  
POST /productos → crear producto (admin y superAdmin).  
PUT /productos/:id → editar producto (admin y superAdmin).  
DELETE /productos/:id → eliminar producto (admin y superAdmin).  

### 🛒 Pedidos
POST /pedidos → crear pedido (userComun).  
GET /pedidos → listar pedidos del usuario autenticado.  

### 📊 Reportes
GET /reportes → reportes de usuarios, pedidos y productos (admin y superAdmin).  
