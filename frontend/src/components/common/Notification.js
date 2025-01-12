// src/components/common/Notification.js
import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const Notification = ({ message, type = 'success', onClose }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-500',
    error: 'bg-red-50 border-red-500',
    warning: 'bg-yellow-50 border-yellow-500'
  };

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800'
  };

  const Icon = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle
  }[type];

  return (
    <div className={`fixed top-4 right-4 w-96 ${bgColor[type]} border-l-4 p-4 rounded shadow-lg`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${textColor[type]}`} />
        </div>
        <div className="ml-3 w-full">
          <p className={`text-sm ${textColor[type]}`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-gray-700"
        >
          <span className="sr-only">Cerrar</span>
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
