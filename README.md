# Level Up Gamer - Backend API

Backend RESTful API para la aplicación Level Up Gamer, desarrollado con Express.js y MongoDB.

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con JSON Web Tokens
- **bcryptjs** - Encriptación de contraseñas

## 📋 Requisitos Previos

- Node.js >= 14.x
- npm o yarn
- Cuenta en MongoDB Atlas (gratis)

## 🔧 Instalación

### 1. Navegar a la carpeta del backend

```bash
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar MongoDB

#### Opción A: Usar MongoDB Atlas (RECOMENDADO - GRATIS)

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (selecciona el tier FREE)
4. En "Database Access", crea un nuevo usuario con contraseña
5. En "Network Access", agrega tu IP (o permite acceso desde cualquier IP: 0.0.0.0/0)
6. Haz click en "Connect" → "Connect your application"
7. Copia el connection string (algo como: `mongodb+srv://usuario:password@cluster.mongodb.net/`)

#### Opción B: Usar MongoDB local

```bash
# Instala MongoDB en tu sistema
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Inicia MongoDB
brew services start mongodb-community
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y agrega tu connection string de MongoDB:

```env
# IMPORTANTE: Reemplaza con tu connection string real
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/levelupgamer?retryWrites=true&w=majority

PORT=3000
JWT_SECRET=tu_super_secreto_jwt_cambiar_en_produccion_12345
NODE_ENV=development
```

**IMPORTANTE**: Reemplaza:
- `tu_usuario` con tu usuario de MongoDB
- `tu_password` con tu contraseña de MongoDB
- `cluster` con el nombre de tu cluster

### 5. Poblar la base de datos (Seeder)

```bash
npm run seed
```

Este comando creará:
- ✅ 1 usuario admin (admin@duoc.cl / 123456)
- ✅ 10 productos de ejemplo
- ✅ 3 tiendas en Viña del Mar y Valparaíso

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

## 📚 API Endpoints

### 🔐 Autenticación (`/api/auth`)

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

### 🎮 Productos (`/api/products`)

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

### 🏪 Tiendas (`/api/stores`)

#### Obtener todas las tiendas
```http
GET /api/stores
```

#### Obtener tienda más cercana
```http
GET /api/stores/nearest?latitude=-33.0243&longitude=-71.5518
```

### 🛒 Carrito (`/api/cart`)

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

## 👤 Usuario de Prueba

```
Email: admin@duoc.cl
Password: 123456
Rol: admin
```

## 🗂️ Estructura del Proyecto

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

## 🔒 Seguridad

- Las contraseñas se encriptan con bcrypt
- Autenticación con JWT
- Validación de datos con express-validator
- CORS habilitado para desarrollo

## 📝 Notas

- El token JWT expira en 30 días
- Los productos con descuento calculan automáticamente el precio final
- El carrito está asociado al usuario autenticado
- Solo los administradores pueden crear/editar/eliminar productos

## 🐛 Troubleshooting

### Error: "MongooseServerSelectionError"
- Verifica que tu connection string de MongoDB sea correcto
- Asegúrate de que tu IP esté permitida en MongoDB Atlas
- Revisa que el usuario y contraseña sean correctos

### Error: "JWT must be provided"
- Asegúrate de incluir el header `Authorization: Bearer {token}` en las rutas protegidas

### Error: "Port 3000 already in use"
- Cambia el puerto en el archivo `.env`
- O mata el proceso que está usando el puerto 3000

## 📧 Soporte

Para cualquier duda o problema, contacta a Grupo 10.

---

**Level Up Gamer** - Tu tienda de videojuegos favorita 🎮

