const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const { auth } = require('../middleware/auth');

// @route   GET /api/cart
// @desc    Obtener items del carrito del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user._id });

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.productPrice * item.quantity);
    }, 0);

    res.json({
      success: true,
      count: cartItems.length,
      total,
      data: cartItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// @route   POST /api/cart
// @desc    Agregar item al carrito
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { productId, productName, productPrice, productImage, quantity } = req.body;

    // Verificar si el producto ya está en el carrito
    let cartItem = await CartItem.findOne({
      userId: req.user._id,
      productId
    });

    if (cartItem) {
      // Si existe, aumentar cantidad
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      // Si no existe, crear nuevo
      cartItem = new CartItem({
        userId: req.user._id,
        productId,
        productName,
        productPrice,
        productImage: productImage || '',
        quantity: quantity || 1
      });
      await cartItem.save();
    }

    res.status(201).json({
      success: true,
      message: 'Producto agregado al carrito',
      data: cartItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// @route   PUT /api/cart/:id
// @desc    Actualizar cantidad de item en carrito
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'La cantidad debe ser al menos 1'
      });
    }

    const cartItem = await CartItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado en el carrito'
      });
    }

    res.json({
      success: true,
      message: 'Cantidad actualizada',
      data: cartItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// @route   DELETE /api/cart/:id
// @desc    Eliminar item del carrito
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado en el carrito'
      });
    }

    res.json({
      success: true,
      message: 'Item eliminado del carrito'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// @route   DELETE /api/cart
// @desc    Vaciar carrito completo
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await CartItem.deleteMany({ userId: req.user._id });

    res.json({
      success: true,
      message: 'Carrito vaciado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

module.exports = router;

