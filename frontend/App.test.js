// frontend/src/App.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

test('renders app without crashing', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});

// frontend/src/components/products/ProductList.test.js
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import ProductList from './ProductList';

test('renders product list', () => {
  render(
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
  
  // Verifica que el título existe
  const titleElement = screen.getByText(/Lista de Productos/i);
  expect(titleElement).toBeInTheDocument();
});
