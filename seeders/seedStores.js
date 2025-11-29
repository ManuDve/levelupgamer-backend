require('dotenv').config();
const mongoose = require('mongoose');
const Store = require('../models/Store');
const connectDB = require('../config/database');

// Tiendas con direcciones reales de Viña del Mar
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

const seedStores = async () => {
  try {
    console.log('🏪 Iniciando seeder de tiendas...\n');

    // Conectar a la base de datos
    await connectDB();

    // Limpiar colección de tiendas
    console.log('🗑️  Limpiando tiendas existentes...');
    await Store.deleteMany({});
    console.log('✅ Tiendas limpiadas\n');

    // Insertar tiendas
    console.log('🏪 Creando tiendas...');
    const createdStores = await Store.insertMany(stores);
    console.log(`✅ ${createdStores.length} tienda(s) creada(s)\n`);

    // Mostrar tiendas creadas
    console.log('📍 Tiendas creadas:');
    createdStores.forEach(store => {
      console.log(`   - ${store.name}`);
      console.log(`     📍 ${store.address}, ${store.city}`);
      console.log(`     📞 ${store.phone}`);
      console.log(`     🕐 ${store.hours}`);
      console.log(`     🌍 Lat: ${store.latitude}, Lng: ${store.longitude}\n`);
    });

    console.log('🎉 ¡Seeder de tiendas completado exitosamente!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seeder de tiendas:', error);
    process.exit(1);
  }
};

seedStores();
