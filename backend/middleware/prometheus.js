const prometheus = require('prom-client');
const express = require('express');

// Crear el registro de métricas
const register = new prometheus.Registry();

// Añadir métricas por defecto
prometheus.collectDefaultMetrics({
  register,
  prefix: 'inventory_'
});

// Contadores personalizados
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'inventory_http_request_duration_seconds',
  help: 'Duración de las solicitudes HTTP en segundos',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 3, 5, 10]
});

const productOperationsCounter = new prometheus.Counter({
  name: 'inventory_product_operations_total',
  help: 'Contador de operaciones en productos',
  labelNames: ['operation']
});

const stockMovementsCounter = new prometheus.Counter({
  name: 'inventory_stock_movements_total',
  help: 'Contador de movimientos de stock',
  labelNames: ['type']
});

// Registrar métricas personalizadas
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(productOperationsCounter);
register.registerMetric(stockMovementsCounter);

// Middleware para medir la duración de las solicitudes
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration / 1000); // Convertir a segundos
  });
  
  next();
};

// Router para el endpoint de métricas
const metricsRouter = express.Router();
metricsRouter.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

module.exports = {
  metricsMiddleware,
  metricsRouter,
  productOperationsCounter,
  stockMovementsCounter
};
