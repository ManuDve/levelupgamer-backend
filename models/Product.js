const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  hasDiscount: {
    type: Boolean,
    default: false
  },
  finalPrice: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: 0,
    default: 0
  },
  category: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  imageUrl: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

// Calcular precio final antes de guardar
productSchema.pre('save', function(next) {
  if (this.hasDiscount && this.discount > 0) {
    this.finalPrice = this.price - (this.price * this.discount / 100);
  } else {
    this.finalPrice = this.price;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

