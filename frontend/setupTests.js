import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

// Mock de axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  })),
  defaults: {
    baseURL: '',
    headers: {
      common: {}
    }
  }
}));
