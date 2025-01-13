const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Movement = require('../models/Movement');
const { protect } = require('../middleware/auth');

// Ruta para actualizar stock
router.post('/update', protect, async (req, res) => {
    try {
        const { productId, type, quantity } = req.body;

        // Buscar el producto
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Calcular nuevo stock
        const newStock = type === 'entrada' 
            ? product.stock + Number(quantity)
            : product.stock - Number(quantity);

        // Verificar stock suficiente para salidas
        if (type === 'salida' && newStock < 0) {
            return res.status(400).json({ message: 'Stock insuficiente' });
        }

        // Actualizar stock
        product.stock = newStock;
        await product.save();

        // Crear registro de movimiento
        const movement = new Movement({
            productId,
            type,
            quantity: Number(quantity)
        });
        await movement.save();

        res.status(200).json({ product, movement });
    } catch (error) {
        console.error('Error en stock update:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
