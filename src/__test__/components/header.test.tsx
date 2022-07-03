import { render, screen } from '@testing-library/react';
import Header from '@/components/dashboard/header';

test('renders header title', () => {
  render(<Header />);
  const headerTitle = screen.getByText(/Analysis chart/i);
  expect(headerTitle).toBeInTheDocument();
});

test('renders header subtitle', () => {
  render(<Header />);
  const headerTitle = screen.getByText(/Number of lessons/i);
  expect(headerTitle).toBeInTheDocument();
});
