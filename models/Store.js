const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'La dirección es requerida']
  },
  city: {
    type: String,
    required: [true, 'La ciudad es requerida']
  },
  latitude: {
    type: Number,
    required: [true, 'La latitud es requerida']
  },
  longitude: {
    type: Number,
    required: [true, 'La longitud es requerida']
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es requerido']
  },
  hours: {
    type: String,
    default: 'Lun-Sab: 10:00 - 20:00'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Store', storeSchema);

