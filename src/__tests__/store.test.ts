import { renderHook, act } from '@testing-library/react';
import { useAuthStore, useFlightStore, useBookingStore } from '@/store/store';

describe('Store - Auth', () => {
  it('should initialize with no user', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.user).toBeNull();
  });

  it('should handle login', async () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login('test@example.com', 'password123');
    });

    // Mock async delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.email).toBe('test@example.com');
  });

  it('should clear user on logout', async () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login('test@example.com', 'password123');
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});

describe('Store - Flight', () => {
  it('should initialize with empty flights', () => {
    const { result } = renderHook(() => useFlightStore());
    expect(result.current.flights).toEqual([]);
  });

  it('should search flights', async () => {
    const { result } = renderHook(() => useFlightStore());

    act(() => {
      result.current.searchFlights('NYC', 'LAX', '2024-06-15', 2);
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    expect(result.current.flights.length).toBeGreaterThan(0);
    expect(result.current.isLoading).toBe(false);
  });
});

describe('Store - Booking', () => {
  it('should initialize with empty bookings', () => {
    const { result } = renderHook(() => useBookingStore());
    expect(result.current.bookings).toEqual([]);
  });

  it('should create booking', async () => {
    const { result, rerender } = renderHook(() => useBookingStore());
    const authResult = renderHook(() => useAuthStore());

    // Login first
    act(() => {
      authResult.result.current.login('test@example.com', 'password123');
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create booking
    act(() => {
      result.current.createBooking(
        {
          id: 'FL001',
          flightNumber: 'AA100',
          airline: 'American Airlines',
          departure: 'NYC',
          arrival: 'LAX',
          departureTime: '10:00',
          arrivalTime: '13:00',
          duration: '5h 0m',
          pricePerPassenger: 300,
          availableSeats: 50,
        },
        2,
      );
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    expect(result.current.bookings.length).toBeGreaterThan(0);
  });
});
