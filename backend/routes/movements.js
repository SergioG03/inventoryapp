// backend/routes/movements.js
const express = require('express');
const router = express.Router();
const Movement = require('../models/Movement');
const { protect } = require('../middleware/auth');

// Usar middleware de autenticación
router.use(protect);

// Obtener todos los movimientos
router.get('/', async (req, res) => {
  try {
    console.log('GET /movements being called');

    const movements = await Movement.find()
      .populate('productId', 'name')
      .populate('userId', 'username')
      .sort({ date: -1 });
    
    const formattedMovements = movements.map(movement => {
      // Manejo seguro de referencias nulas
      const productId = movement.productId ? movement.productId._id : null;
      const productName = movement.productId ? movement.productId.name : 'Producto eliminado';
      const userId = movement.userId ? movement.userId._id : null;
      const username = movement.userId ? movement.userId.username : 'Usuario desconocido';

      return {
        id: movement._id,
        productId,
        productName,
        userId,
        username,
        type: movement.type,
        quantity: movement.quantity,
        date: movement.date
      };
    });

    console.log('Sending formatted movements:', formattedMovements);
    res.json(formattedMovements);
  } catch (error) {
    console.error('Error in GET /movements:', error);
    res.status(500).json({ 
      message: 'Error al obtener los movimientos',
      error: error.message 
    });
  }
});

// Obtener movimientos por producto
router.get('/product/:productId', async (req, res) => {
  try {
    const movements = await Movement.find({ productId: req.params.productId })
      .populate('productId', 'name')
      .populate('userId', 'username')
      .sort({ date: -1 });

    const formattedMovements = movements.map(movement => ({
      id: movement._id,
      productId: movement.productId?._id || null,
      productName: movement.productId?.name || 'Producto eliminado',
      userId: movement.userId?._id || null,
      username: movement.userId?.username || 'Usuario desconocido',
      type: movement.type,
      quantity: movement.quantity,
      date: movement.date
    }));

    res.json(formattedMovements);
  } catch (error) {
    console.error('Error in GET /movements/product:', error);
    res.status(500).json({ message: error.message });
  }
});

// Obtener mis movimientos
router.get('/my-movements', async (req, res) => {
  try {
    const movements = await Movement.find({ userId: req.user._id })
      .populate('productId', 'name')
      .populate('userId', 'username')
      .sort({ date: -1 });

    const formattedMovements = movements.map(movement => ({
      id: movement._id,
      productId: movement.productId?._id || null,
      productName: movement.productId?.name || 'Producto eliminado',
      userId: movement.userId?._id || null,
      username: movement.userId?.username || 'Usuario desconocido',
      type: movement.type,
      quantity: movement.quantity,
      date: movement.date
    }));

    res.json(formattedMovements);
  } catch (error) {
    console.error('Error in GET /my-movements:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
