import { render, screen } from '@testing-library/react';
import { Navbar } from '@/components/Navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock the store
jest.mock('@/store/store', () => ({
  useAuthStore: () => ({
    user: null,
    logout: jest.fn(),
  }),
}));

describe('Navbar', () => {
  it('should render logo', () => {
    render(<Navbar />);
    expect(screen.getByText(/AirBook/i)).toBeInTheDocument();
  });

  it('should show login and register links when not authenticated', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /search flights/i })).toBeInTheDocument();
  });
});
