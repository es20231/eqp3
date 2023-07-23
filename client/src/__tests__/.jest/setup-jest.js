import '@testing-library/jest-dom'

// setupTests.js
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
  
global.localStorage = localStorageMock;
  