// src/components/products/ProductFilters.js
import React from 'react';
import { Search } from 'lucide-react';

const ProductFilters = ({ onSearch, onSortChange, sortBy }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Búsqueda */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Buscar productos..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Ordenamiento */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="name">Ordenar por Nombre</option>
            <option value="stock">Ordenar por Stock</option>
            <option value="price">Ordenar por Precio</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
