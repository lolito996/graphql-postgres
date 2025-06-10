# 🎥 CineApp - Proyecto de GraphQL con PostgreSQL

Este proyecto es una aplicación para la gestión de un cine, desarrollada con **GraphQL**, **PostgreSQL** y **TypeScript**. Permite gestionar usuarios, películas, salas y funciones.

---

## 🚀 Tecnologías utilizadas

- Node.js
- TypeScript
- GraphQL (Apollo Server)
- TypeORM
- PostgreSQL
- Docker (para la base de datos)

---

## 🏗️ Configuración y ejecución

### 1️⃣ Clona el repositorio

```bash
git clone https://github.com/tu-usuario/cineapp.git
cd cineapp
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### Variables de Entorno

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=cinema
JWT_SECRET=tu_clave_secreta
```

### Levantar base de datos con Docker

```bash
docker-compose up -d
```

### Ejecutar

```bash
npm run start:dev
```

---

## 🧪 Uso de la API GraphQL

### Ejemplo de Query

query {
  theatres {
    id
    roomNumber
    capacity
    type
  }
}

---

## 📚 Funcionalidades principales

✔️ CRUD para:

- Usuarios

- Películas

- Salas (Theatres)

- Funciones (Showtimes)

✔️ Uso de fragments para evitar duplicación en consultas.
✔️ Validaciones de entrada y manejo de errores.
✔️ Autenticación y autorización para proteger las rutas y operaciones.

---
## Tipos de Documentos y Operaciones que recibe

- Query: Para consultar información y llamar peticiones.

### Ejemplo de Query

```bash
query {
  findAllMovies {
    id
    title
    genre
    duration
  }
}
```

---

## Integrantes

- Jose Alejandro Muñoz
- Santiago Castillo
- Samuel Ibarra Cano