import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pokémon tracker title', () => {
  render(<App />);
  expect(screen.getByText(/Pokémon/i)).toBeInTheDocument();
});