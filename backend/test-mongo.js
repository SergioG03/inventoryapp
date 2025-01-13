const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    console.log('URI utilizada:', process.env.MONGODB_URI);
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });
