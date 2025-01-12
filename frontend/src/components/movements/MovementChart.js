// src/components/movements/MovementChart.js
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MovementChart = ({ movements }) => {
  // Agrupar movimientos por fecha y tipo
  const groupedData = movements.reduce((acc, movement) => {
    const date = new Date(movement.date).toLocaleDateString('es-ES');
    
    if (!acc[date]) {
      acc[date] = { date, entradas: 0, salidas: 0 };
    }
    
    if (movement.type === 'entrada') {
      acc[date].entradas += movement.quantity;
    } else {
      acc[date].salidas += movement.quantity;
    }
    
    return acc;
  }, {});

  // Convertir el objeto agrupado en un array para Recharts
  const data = Object.values(groupedData).sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  ).slice(-7); // Mostrar últimos 7 días

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-8">
      <h3 className="text-lg font-semibold mb-4">Movimientos de los últimos 7 días</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="entradas" 
              name="Entradas" 
              fill="#4ade80"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="salidas" 
              name="Salidas" 
              fill="#f87171"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MovementChart;
