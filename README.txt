Pasos:
1) cd UTNExamen-backend
2) cp .env.example .env
3) docker compose build --no-cache (la primera sin usar cache)
4) docker compose up -d
5) docker ps (verificar contenedores levantados)
Debe verse:
utnexamen-mysql → puerto 3309, estado healthy
utnexamen-app → puerto 3000
6) docker compose exec app npm install
6) docker compose exec app npm run seed
6) curl http://localhost:3000 (probar si la api responde)
6) docker compose exec app npm run cli (abre el cli interactivo)

Credenciales:
- superAdmin: jefe5978 / contraseñajefe5978
