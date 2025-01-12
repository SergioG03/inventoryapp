// backend/routes/stock.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Movement = require('../models/Movement');
const { protect } = require('../middleware/auth');

// Usar middleware de autenticación en todas las rutas
router.use(protect);

// Actualizar stock
router.post('/update', async (req, res) => {
  const { productId, type, quantity } = req.body;
  const userId = req.user._id; // Obtenemos el ID del usuario del middleware de auth

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const newStock = type === 'entrada' 
      ? product.stock + Number(quantity)
      : product.stock - Number(quantity);

    if (newStock < 0) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    // Crear el movimiento con el userId
    const movement = new Movement({
      productId,
      userId,
      type,
      quantity: Number(quantity)
    });
    await movement.save();

    // Actualizar el stock del producto
    product.stock = newStock;
    await product.save();

    // Obtener el movimiento poblado con la información del usuario
    const populatedMovement = await Movement.findById(movement._id)
      .populate('productId', 'name')
      .populate('userId', 'username');

    res.json({
      product,
      movement: {
        id: populatedMovement._id,
        productId: populatedMovement.productId._id,
        productName: populatedMovement.productId.name,
        userId: populatedMovement.userId._id,
        username: populatedMovement.userId.username,
        type: populatedMovement.type,
        quantity: populatedMovement.quantity,
        date: populatedMovement.date
      }
    });

  } catch (error) {
    console.error('Error en POST /stock/update:', error);
    res.status(500).json({ 
      message: 'Error al actualizar el stock',
      error: error.message 
    });
  }
});

// Obtener estado del stock
router.get('/status', async (req, res) => {
  try {
    const products = await Product.find().select('name stock');
    res.json(products);
  } catch (error) {
    console.error('Error en GET /stock/status:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
