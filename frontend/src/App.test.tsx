import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Add export statement to make it a module
test('renders without crashing', () => {
  render(<App />);
});

export {}; // Fixes isolatedModules error
