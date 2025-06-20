# 📚 Documentación de la API del Portafolio

## 🚀 Endpoints Disponibles

### 🔐 Autenticación

#### Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "username": "usuario123",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "first_name": "Juan",
  "last_name": "Pérez"
}
```

#### Login de Usuario
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

### 📧 Mensajes

#### Crear Mensaje
```http
POST /messages
Content-Type: application/json

{
  "subject": "Consulta sobre proyecto",
  "message_content": "Hola, me interesa tu trabajo..."
}
```

#### Obtener Todos los Mensajes
```http
GET /messages
```

#### Obtener Mensajes por Usuario
```http
GET /messages/user/{userId}
```

#### Marcar Mensaje como Leído
```http
PATCH /messages/{id}/read
```

### 🚀 Proyectos

#### Obtener Todos los Proyectos
```http
GET /projects
```

#### Obtener Proyectos Destacados
```http
GET /projects/featured
```

#### Obtener Proyecto por ID
```http
GET /projects/{id}
```

#### Crear Proyecto
```http
POST /projects
Content-Type: application/json

{
  "title": "Mi Proyecto",
  "description": "Descripción del proyecto...",
  "image_url": "https://ejemplo.com/imagen.jpg",
  "github_url": "https://github.com/usuario/proyecto",
  "live_url": "https://proyecto.com",
  "is_featured": true
}
```

#### Actualizar Proyecto
```http
PUT /projects/{id}
Content-Type: application/json

{
  "title": "Proyecto Actualizado",
  "description": "Nueva descripción..."
}
```

#### Eliminar Proyecto
```http
DELETE /projects/{id}
```

### 💻 Tecnologías

#### Obtener Todas las Tecnologías
```http
GET /technologies
```

#### Obtener Tecnologías por Categoría
```http
GET /technologies/category/{category}
```

Categorías disponibles:
- `frontend`
- `backend`
- `database`
- `devops`
- `other`

#### Obtener Tecnología por ID
```http
GET /technologies/{id}
```

#### Crear Tecnología
```http
POST /technologies
Content-Type: application/json

{
  "name": "React",
  "icon_class": "fab fa-react",
  "category": "frontend",
  "proficiency_level": "advanced"
}
```

### 🌱 Seed de Base de Datos

#### Ejecutar Seed
```http
POST /seed
```

Este endpoint poblará la base de datos con:
- Tecnologías básicas (HTML5, CSS3, JavaScript, React, etc.)
- Proyectos de ejemplo

## 🗄️ Estructura de la Base de Datos

### Tabla: `users`
- `id` (UUID, PK)
- `username` (VARCHAR(50), UNIQUE)
- `email` (VARCHAR(100), UNIQUE)
- `password_hash` (VARCHAR(255))
- `first_name` (VARCHAR(50))
- `last_name` (VARCHAR(50))
- `is_active` (BOOLEAN, DEFAULT true)
- `role` (ENUM: 'admin', 'user', DEFAULT 'user')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabla: `projects`
- `id` (UUID, PK)
- `title` (VARCHAR(100))
- `description` (TEXT)
- `image_url` (VARCHAR(255), NULLABLE)
- `github_url` (VARCHAR(255), NULLABLE)
- `live_url` (VARCHAR(255), NULLABLE)
- `is_featured` (BOOLEAN, DEFAULT false)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabla: `technologies`
- `id` (UUID, PK)
- `name` (VARCHAR(50), UNIQUE)
- `icon_class` (VARCHAR(100), NULLABLE)
- `category` (ENUM: 'frontend', 'backend', 'database', 'devops', 'other')
- `proficiency_level` (ENUM: 'beginner', 'intermediate', 'advanced', 'expert')
- `created_at` (TIMESTAMP)

### Tabla: `messages`
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users.id)
- `subject` (VARCHAR(200))
- `message_content` (TEXT)
- `is_read` (BOOLEAN, DEFAULT false)
- `created_at` (TIMESTAMP)

### Tabla: `project_technology` (Relación N:M)
- `project_id` (UUID, FK -> projects.id)
- `technology_id` (UUID, FK -> technologies.id)

## 🔧 Configuración

### Variables de Entorno (.env)
```env
DB_HOST=tu-host-postgresql
DB_PORT=5432
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=tu-base-de-datos
```

## 🚀 Cómo Usar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Crear archivo `.env` con las credenciales de tu base de datos PostgreSQL

3. **Ejecutar la aplicación:**
   ```bash
   npm run start:dev
   ```

4. **Poblar la base de datos:**
   ```bash
   curl -X POST http://localhost:3000/seed
   ```

5. **Probar endpoints:**
   - Registro: `POST http://localhost:3000/auth/register`
   - Login: `POST http://localhost:3000/auth/login`
   - Proyectos: `GET http://localhost:3000/projects`
   - Tecnologías: `GET http://localhost:3000/technologies`

## 📝 Notas Importantes

- La opción `synchronize: true` está habilitada para desarrollo. En producción, usar migraciones.
- Las contraseñas se hashean con bcrypt antes de guardarse.
- La API incluye validación básica de datos.
- Todos los endpoints retornan respuestas en formato JSON.

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt (10 salt rounds)
- Validación de datos de entrada
- Manejo de errores centralizado
- Roles de usuario (admin/user)

## 🎯 Próximas Mejoras

- [ ] Implementar JWT para autenticación
- [ ] Agregar validación con class-validator
- [ ] Implementar rate limiting
- [ ] Agregar documentación con Swagger
- [ ] Implementar migraciones para producción
- [ ] Agregar tests unitarios y e2e 