import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Pokémon tracker title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/Pokémon/i)).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/My Cards/i)).toBeInTheDocument();
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();
});

test('renders footer component', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/Footer/i)).toBeInTheDocument(); // Replace with actual footer text if different
});

test('renders Home page by default', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument(); // Replace with actual Home page content if different
});