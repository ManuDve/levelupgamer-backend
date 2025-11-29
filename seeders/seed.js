require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Store = require('../models/Store');
const connectDB = require('../config/database');

// Datos iniciales

const products = [
  {
    id: 1,
    name: 'PlayStation 5',
    description: 'Consola de última generación con gráficos 4K y SSD ultrarrápido',
    price: 599990,
    discount: 15,
    hasDiscount: true,
    finalPrice: 509991,
    stock: 10,
    category: { id: 1, name: 'Consolas' },
    imageUrl: '',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Xbox Series X',
    description: 'La consola Xbox más poderosa de todos los tiempos',
    price: 549990,
    discount: 10,
    hasDiscount: true,
    finalPrice: 494991,
    stock: 8,
    category: { id: 1, name: 'Consolas' },
    imageUrl: '',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Nintendo Switch OLED',
    description: 'Consola híbrida con pantalla OLED de 7 pulgadas',
    price: 399990,
    discount: 0,
    hasDiscount: false,
    finalPrice: 399990,
    stock: 15,
    category: { id: 1, name: 'Consolas' },
    imageUrl: '',
    rating: 4.6
  },
  {
    id: 4,
    name: 'The Last of Us Part II',
    description: 'Juego de acción y aventura exclusivo de PlayStation',
    price: 59990,
    discount: 25,
    hasDiscount: true,
    finalPrice: 44992,
    stock: 30,
    category: { id: 2, name: 'Juegos' },
    imageUrl: '',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Halo Infinite',
    description: 'Shooter en primera persona exclusivo de Xbox',
    price: 69990,
    discount: 20,
    hasDiscount: true,
    finalPrice: 55992,
    stock: 25,
    category: { id: 2, name: 'Juegos' },
    imageUrl: '',
    rating: 4.5
  },
  {
    id: 6,
    name: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'Aventura épica exclusiva de Nintendo Switch',
    price: 69990,
    discount: 0,
    hasDiscount: false,
    finalPrice: 69990,
    stock: 20,
    category: { id: 2, name: 'Juegos' },
    imageUrl: '',
    rating: 5.0
  },
  {
    id: 7,
    name: 'DualSense Wireless Controller',
    description: 'Control inalámbrico para PlayStation 5 con retroalimentación háptica',
    price: 79990,
    discount: 10,
    hasDiscount: true,
    finalPrice: 71991,
    stock: 40,
    category: { id: 3, name: 'Accesorios' },
    imageUrl: '',
    rating: 4.7
  },
  {
    id: 8,
    name: 'Xbox Wireless Controller',
    description: 'Control inalámbrico para Xbox Series X|S',
    price: 69990,
    discount: 0,
    hasDiscount: false,
    finalPrice: 69990,
    stock: 35,
    category: { id: 3, name: 'Accesorios' },
    imageUrl: '',
    rating: 4.6
  },
  {
    id: 9,
    name: 'Nintendo Switch Pro Controller',
    description: 'Control Pro oficial de Nintendo Switch',
    price: 79990,
    discount: 15,
    hasDiscount: true,
    finalPrice: 67991,
    stock: 22,
    category: { id: 3, name: 'Accesorios' },
    imageUrl: '',
    rating: 4.8
  },
  {
    id: 10,
    name: 'PlayStation VR2',
    description: 'Sistema de realidad virtual de última generación para PS5',
    price: 699990,
    discount: 5,
    hasDiscount: true,
    finalPrice: 664990,
    stock: 5,
    category: { id: 3, name: 'Accesorios' },
    imageUrl: '',
    rating: 4.4
  }
];

const stores = [
  {
    id: 1,
    name: 'Level Up Gamer Viña del Mar Centro',
    address: 'Alvarez 2336',
    city: 'Viña del Mar',
    latitude: -33.033690,
    longitude: -71.532752,
    phone: '+56 32 268 5000',
    hours: 'Lun-Sab: 10:00 - 20:00, Dom: 11:00 - 19:00'
  },
  {
    id: 2,
    name: 'Level Up Gamer Viña del Mar 15 Norte',
    address: '15 Norte 961',
    city: 'Viña del Mar',
    latitude: -33.0083489,
    longitude: -71.5456331,
    phone: '+56 32 268 5001',
    hours: 'Lun-Sab: 10:00 - 20:00, Dom: 11:00 - 19:00'
  },
  {
    id: 3,
    name: 'Level Up Gamer Valparaíso',
    address: 'Avenida Brasil 2830',
    city: 'Valparaíso',
    latitude: -33.044660,
    longitude: -71.606695,
    phone: '+56 32 259 4000',
    hours: 'Lun-Sab: 10:00 - 20:00, Dom: 11:00 - 19:00'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seeder...\n');

    // Conectar a la base de datos
    await connectDB();

    // Limpiar colecciones existentes
    console.log('🗑️  Limpiando base de datos...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Store.deleteMany({});
    console.log('✅ Base de datos limpiada\n');

    // Insertar usuarios
    console.log('👤 Creando usuarios...');
    await User.insertMany(users);
    console.log(`✅ ${users.length} usuario(s) creado(s)\n`);

    // Insertar productos
    console.log('🎮 Creando productos...');
    await Product.insertMany(products);
    console.log(`✅ ${products.length} producto(s) creado(s)\n`);

    // Insertar tiendas
    console.log('🏪 Creando tiendas...');
    await Store.insertMany(stores);
    console.log(`✅ ${stores.length} tienda(s) creada(s)\n`);

    console.log('🎉 ¡Seeder completado exitosamente!\n');
    console.log('📋 Datos de acceso:');
    console.log('   Email: admin@duoc.cl');
    console.log('   Password: 123456\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seeder:', error);
    process.exit(1);
  }
};

seedDatabase();

