// src/components/products/ProductForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/slices/productsSlice';
import { useNotification } from '../../context/NotificationContext';

const ProductForm = () => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    stock: '',
    price: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProduct({
        ...formData,
        stock: Number(formData.stock),
        price: Number(formData.price)
      })).unwrap();
      
      // Limpiar formulario
      setFormData({ name: '', stock: '', price: '' });
      showNotification('Producto añadido correctamente', 'success');
    } catch (error) {
      showNotification(error.message || 'Error al añadir el producto', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="text-lg font-semibold mb-4">Añadir Nuevo Producto</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Producto
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Inicial
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Añadir Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
