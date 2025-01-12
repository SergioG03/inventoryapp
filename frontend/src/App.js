// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/common/Navbar';
import ProductList from './components/products/ProductList';
import StockManagement from './components/stock/StockManagement';
import MovementHistory from './components/movements/MovementHistory';
import { useAuth } from './context/AuthContext';

// Componente para rutas protegidas
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Componente para rutas de auth (redirige si ya está autenticado)
const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : children;
};

// Componente principal que envuelve la app con los providers
const AppWrapper = () => {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
};

// Componente principal de la app
const App = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/login" 
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/stock" 
          element={
            <PrivateRoute>
              <StockManagement />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/movements" 
          element={
            <PrivateRoute>
              <MovementHistory />
            </PrivateRoute>
          } 
        />
        {/* Redirigir cualquier otra ruta a la página principal */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default AppWrapper;
