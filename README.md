# Level Up Gamer - Backend API

Backend RESTful API para la aplicación Level Up Gamer, desarrollado con Express.js y MongoDB.

## Autores

- Onésimo Aguirre
- Alex Caica
- Manuel Alfaro

## Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con JSON Web Tokens
- **bcryptjs** - Encriptación de contraseñas

## Requisitos Previos

- Node.js >= 14.x
- npm o yarn
- MongoDB Atlas (cuenta gratuita)

## Instalación

### 1. Navegar a la carpeta del backend

```bash
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar MongoDB

#### Opción A: MongoDB Atlas (Recomendado)

1. Acceder a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear una cuenta gratuita
3. Crear un nuevo cluster (seleccionar el tier gratuito)
4. En "Database Access", crear un nuevo usuario con contraseña
5. En "Network Access", agregar tu IP o permitir acceso desde cualquier IP (0.0.0.0/0)
6. Hacer clic en "Connect" → "Connect your application"
7. Copiar el connection string

#### Opción B: MongoDB local

```bash
# Instalar MongoDB
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend`:

```bash
cp .env.example .env
```

Editar el archivo `.env` y agregar el connection string de MongoDB:

```env
# Reemplazar con el connection string real
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/levelupgamer?retryWrites=true&w=majority

PORT=3000
JWT_SECRET=tu_super_secreto_jwt_cambiar_en_produccion_12345
NODE_ENV=development
```

Reemplazar:
- `tu_usuario` con el usuario de MongoDB
- `tu_password` con la contraseña de MongoDB
- `cluster` con el nombre del cluster

### 5. Poblar la base de datos

```bash
npm run seed
```

Este comando creará:
- 1 usuario administrador (admin@duoc.cl / 123456)
- 10 productos de ejemplo
- 3 tiendas en Viña del Mar y Valparaíso

### 6. Iniciar el servidor

#### Modo desarrollo (con auto-reload)
```bash
npm run dev
```

#### Modo producción
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## API Endpoints

### Autenticación (`/api/auth`)

#### Registrar usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "address": "Calle Ejemplo 123",
  "latitude": -33.0243,
  "longitude": -71.5518
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@duoc.cl",
  "password": "123456"
}
```

Respuesta:
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "Administrador",
      "email": "admin@duoc.cl",
      "address": "Alvarez 1130, Viña del Mar",
      "latitude": -33.0243,
      "longitude": -71.5518,
      "role": "admin"
    }
  }
}
```

#### Obtener usuario actual
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### Actualizar dirección
```http
PUT /api/auth/update-address
Authorization: Bearer {token}
Content-Type: application/json

{
  "address": "Nueva Dirección 456",
  "latitude": -33.0458,
  "longitude": -71.6197
}
```

### Productos (`/api/products`)

#### Obtener todos los productos
```http
GET /api/products
```

Query params opcionales:
- `?category=Consolas` - Filtrar por categoría
- `?search=playstation` - Buscar por texto
- `?hasDiscount=true` - Solo productos con descuento

#### Obtener un producto
```http
GET /api/products/:id
```

#### Crear producto (Admin)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": 11,
  "name": "Steam Deck",
  "description": "Consola portátil de Valve",
  "price": 499990,
  "discount": 0,
  "hasDiscount": false,
  "stock": 10,
  "category": {
    "id": 1,
    "name": "Consolas"
  }
}
```

#### Actualizar producto (Admin)
```http
PUT /api/products/:id
Authorization: Bearer {token}
```

#### Eliminar producto (Admin)
```http
DELETE /api/products/:id
Authorization: Bearer {token}
```

### Tiendas (`/api/stores`)

#### Obtener todas las tiendas
```http
GET /api/stores
```

#### Obtener tienda más cercana
```http
GET /api/stores/nearest?latitude=-33.0243&longitude=-71.5518
```

### Carrito (`/api/cart`)

#### Obtener carrito del usuario
```http
GET /api/cart
Authorization: Bearer {token}
```

#### Agregar producto al carrito
```http
POST /api/cart
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 1,
  "productName": "PlayStation 5",
  "productPrice": 599990,
  "productImage": "",
  "quantity": 1
}
```

#### Actualizar cantidad
```http
PUT /api/cart/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 2
}
```

#### Eliminar item del carrito
```http
DELETE /api/cart/:id
Authorization: Bearer {token}
```

#### Vaciar carrito completo
```http
DELETE /api/cart
Authorization: Bearer {token}
```

## Estructura del Proyecto

```
backend/
├── config/
│   └── database.js          # Configuración de MongoDB
├── models/
│   ├── User.js              # Modelo de usuario
│   ├── Product.js           # Modelo de producto
│   ├── Store.js             # Modelo de tienda
│   └── CartItem.js          # Modelo de item de carrito
├── routes/
│   ├── auth.js              # Rutas de autenticación
│   ├── products.js          # Rutas de productos
│   ├── stores.js            # Rutas de tiendas
│   └── cart.js              # Rutas de carrito
├── middleware/
│   └── auth.js              # Middleware de autenticación JWT
├── seeders/
│   └── seed.js              # Script para poblar la BD
├── .env.example             # Ejemplo de variables de entorno
├── .gitignore
├── package.json
├── server.js                # Archivo principal
└── README.md
```

## Seguridad

- Las contraseñas se encriptan con bcrypt
- Autenticación con JWT
- Validación de datos con express-validator
- CORS habilitado

## Notas Importantes

- El token JWT expira en 30 días
- Los productos con descuento calculan automáticamente el precio final
- El carrito está asociado al usuario autenticado
- Solo los administradores pueden crear, editar o eliminar productos

## Solución de Problemas

### Error: "MongooseServerSelectionError"
- Verificar que el connection string de MongoDB sea correcto
- Asegurarse de que la IP esté permitida en MongoDB Atlas
- Revisar que el usuario y contraseña sean correctos

### Error: "JWT must be provided"
- Asegurarse de incluir el header `Authorization: Bearer {token}` en las rutas protegidas

### Error: "Port 3000 already in use"
- Cambiar el puerto en el archivo `.env`
- O detener el proceso que está usando el puerto 3000

---

**Level Up Gamer** - Tienda de videojuegos

