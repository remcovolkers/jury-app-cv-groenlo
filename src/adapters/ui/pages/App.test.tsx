import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jury App heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Jury App - CV Groenlo/i);
  expect(headingElement).toBeInTheDocument();
});
