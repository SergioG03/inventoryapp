import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import stockReducer from './slices/stockSlice';
import movementsReducer from './slices/movementsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    stock: stockReducer,
    movements: movementsReducer,
  },
});
