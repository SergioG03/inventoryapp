// src/App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './redux/slices/productsSlice';
import stockReducer from './redux/slices/stockSlice';
import movementsReducer from './redux/slices/movementsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    stock: stockReducer,
    movements: movementsReducer,
  },
});

jest.mock('axios');

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });
});
