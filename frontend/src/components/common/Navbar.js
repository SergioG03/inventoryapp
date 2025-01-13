// src/components/common/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Package, BarChart2, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-700' : '';
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Package className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-lg font-bold">Inventory</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className={`${isActive('/')} text-white px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-indigo-700`}
            >
              <Box className="h-4 w-4 mr-2" />
              Productos
            </Link>

            <Link
              to="/stock"
              className={`${isActive('/stock')} text-white px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-indigo-700`}
            >
              <Package className="h-4 w-4 mr-2" />
              Stock
            </Link>

            <Link
              to="/movements"
              className={`${isActive('/movements')} text-white px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-indigo-700`}
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Movimientos
            </Link>

            <div className="ml-4 flex items-center space-x-4">
              <span className="text-white flex items-center">
                <User className="h-4 w-4 mr-1" />
                {user?.username}
              </span>
              <button
                onClick={logout}
                className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`${isActive('/')} text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700`}
            >
              Productos
            </Link>

            <Link
              to="/stock"
              className={`${isActive('/stock')} text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700`}
            >
              Stock
            </Link>

            <Link
              to="/movements"
              className={`${isActive('/movements')} text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700`}
            >
              Movimientos
            </Link>

            <div className="border-t border-indigo-700 pt-2">
              <div className="px-3 py-2 text-white">
                <User className="h-4 w-4 inline mr-2" />
                {user?.username}
              </div>
              <button
                onClick={logout}
                className="w-full text-left text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium"
              >
                <LogOut className="h-4 w-4 inline mr-2" />
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
