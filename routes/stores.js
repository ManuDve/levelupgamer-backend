const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// @route   GET /api/stores
// @desc    Obtener todas las tiendas
// @access  Public
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find().sort({ id: 1 });

    res.json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// @route   GET /api/stores/nearest
// @desc    Obtener tienda más cercana
// @access  Public
router.get('/nearest', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren latitud y longitud'
      });
    }

    const stores = await Store.find();

    // Calcular distancia a cada tienda
    const storesWithDistance = stores.map(store => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        store.latitude,
        store.longitude
      );
      return { ...store.toObject(), distance };
    });

    // Ordenar por distancia
    storesWithDistance.sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      data: storesWithDistance[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Función auxiliar para calcular distancia (Haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

module.exports = router;

