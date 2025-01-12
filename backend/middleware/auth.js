// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    // Verificar token
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Por favor, inicia sesión para acceder'
      });
    }

    // Verificar que el token es válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar que el usuario existe
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: 'El usuario asociado a este token ya no existe'
      });
    }

    // Añadir el usuario a la request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'No autorizado'
    });
  }
};

// Middleware para verificar roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'No tienes permiso para realizar esta acción'
      });
    }
    next();
  };
};
