// src/components/products/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/slices/productsSlice';
import { useNotification } from '../../context/NotificationContext';
import ProductForm from './ProductForm';

const ProductList = () => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const products = useSelector(state => state.products.items);
  const status = useSelector(state => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        showNotification('Producto eliminado correctamente', 'success');
      } catch (error) {
        showNotification(error.message || 'Error al eliminar el producto', 'error');
      }
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Gestión de Productos</h2>
      
      <ProductForm />

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className="border p-4 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Stock: <span className="font-semibold">{product.stock}</span>
                  </p>
                  <p className="text-gray-600">
                    Precio: <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No hay productos disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
