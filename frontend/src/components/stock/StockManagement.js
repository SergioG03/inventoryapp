// src/components/stock/StockManagement.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/slices/productsSlice';
import { resetStatus } from '../../redux/slices/movementsSlice';
import { stockService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

const StockManagement = () => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const products = useSelector(state => state.products.items);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [movementType, setMovementType] = useState('entrada');
  const [loading, setLoading] = useState(false);

  const handleMovement = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) {
      showNotification('Por favor complete todos los campos', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await stockService.updateStock({
        productId: selectedProduct,
        type: movementType,
        quantity: parseInt(quantity)
      });

      // Actualizar el producto en el estado
      dispatch(updateProduct({
        id: selectedProduct,
        product: response.data.product
      }));
      
      // Resetear el estado de los movimientos para forzar una nueva carga
      dispatch(resetStatus());
      
      showNotification('Movimiento registrado correctamente', 'success');
      
      // Limpiar el formulario
      setSelectedProduct('');
      setQuantity('');
      setMovementType('entrada');
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Error al registrar el movimiento',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Gestión de Stock</h2>

      {/* Formulario de movimientos */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Registrar Movimiento</h3>
        <form onSubmit={handleMovement} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Producto
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={loading}
            >
              <option value="">Selecciona un producto</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.name} - Stock actual: {product.stock}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Movimiento
            </label>
            <select
              value={movementType}
              onChange={(e) => setMovementType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={loading}
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Movimiento'}
          </button>
        </form>
      </div>

      {/* Tabla de Stock Actual */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-lg font-semibold p-4 bg-gray-50">Stock Actual</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 10 
                        ? 'bg-green-100 text-green-800' 
                        : product.stock > 5 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 10 
                        ? 'Stock OK' 
                        : product.stock > 5 
                        ? 'Stock Bajo'
                        : 'Stock Crítico'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;
