const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

console.log('Configuración inicial:', { port, host });

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/stock', require('./routes/stock'));
app.use('/api/movements', require('./routes/movements'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Iniciar servidor antes de conectar a MongoDB
const server = app.listen(port, host, () => {
  console.log(`Servidor iniciado en http://${host}:${port}`);
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err);
    // No cerrar el proceso, solo registrar el error
  });

// Manejar errores del servidor
server.on('error', (error) => {
  console.error('Error en el servidor:', error);
});

module.exports = app;
