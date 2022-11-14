import { render, screen } from '@testing-library/react';
import Entrance from './Entrance';

test('renders learn react link', () => {
  render(<Entrance />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
