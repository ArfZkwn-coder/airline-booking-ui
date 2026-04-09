import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seats: number;
  aircraft: string;
}

interface Booking {
  id: string;
  bookingRef: string;
  flightId: string;
  flight: Flight;
  passengers: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  setError: (error: string | null) => void;
}

interface FlightStore {
  flights: Flight[];
  filteredFlights: Flight[];
  isLoading: boolean;
  error: string | null;
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    passengers: number;
  };
  setSearchParams: (params: Partial<FlightStore['searchParams']>) => void;
  searchFlights: () => Promise<void>;
  setError: (error: string | null) => void;
}

interface BookingStore {
  bookings: Booking[];
  selectedFlight: Flight | null;
  passengers: number;
  isLoading: boolean;
  error: string | null;
  setSelectedFlight: (flight: Flight | null, passengers: number) => void;
  bookFlight: (flight: Flight, passengers: number) => Promise<void>;
  fetchBookings: () => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

// Mock auth store
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({
        user: {
          id: '1',
          email,
          name: email.split('@')[0],
          token: 'mock-token-' + Date.now(),
        },
      });
    } catch (error) {
      set({ error: 'Login failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  register: async (email: string, name: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({
        user: {
          id: '1',
          email,
          name,
          token: 'mock-token-' + Date.now(),
        },
      });
    } catch (error) {
      set({ error: 'Registration failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => set({ user: null }),
  setError: (error) => set({ error }),
}));

// Mock flight store
export const useFlightStore = create<FlightStore>((set) => ({
  flights: [],
  filteredFlights: [],
  isLoading: false,
  error: null,
  searchParams: {
    from: '',
    to: '',
    departDate: '',
    passengers: 1,
  },
  setSearchParams: (params) =>
    set((state) => ({
      searchParams: { ...state.searchParams, ...params },
    })),
  searchFlights: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockFlights: Flight[] = [
        {
          id: '1',
          flightNumber: 'AA101',
          airline: 'American Airlines',
          departure: 'JFK',
          arrival: 'LAX',
          departureTime: '08:00',
          arrivalTime: '11:30',
          duration: '5h 30m',
          price: 250,
          seats: 120,
          aircraft: 'Boeing 777',
        },
        {
          id: '2',
          flightNumber: 'UA202',
          airline: 'United Airlines',
          departure: 'JFK',
          arrival: 'LAX',
          departureTime: '10:15',
          arrivalTime: '13:45',
          duration: '5h 30m',
          price: 280,
          seats: 95,
          aircraft: 'Airbus A320',
        },
        {
          id: '3',
          flightNumber: 'DL303',
          airline: 'Delta Airlines',
          departure: 'JFK',
          arrival: 'LAX',
          departureTime: '14:00',
          arrivalTime: '17:30',
          duration: '5h 30m',
          price: 220,
          seats: 180,
          aircraft: 'Boeing 767',
        },
      ];
      set({ flights: mockFlights, filteredFlights: mockFlights });
    } catch (error) {
      set({ error: 'Failed to search flights' });
    } finally {
      set({ isLoading: false });
    }
  },
  setError: (error) => set({ error }),
}));

// Mock booking store
export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  selectedFlight: null,
  passengers: 1,
  isLoading: false,
  error: null,
  setSelectedFlight: (flight, passengers) =>
    set({ selectedFlight: flight, passengers }),
  bookFlight: async (flight: Flight, passengers: number) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const booking: Booking = {
        id: 'BK' + Date.now(),
        bookingRef: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        flightId: flight.id,
        flight,
        passengers,
        totalPrice: flight.price * passengers,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      set((state) => ({
        bookings: [booking, ...state.bookings],
        selectedFlight: null,
      }));
    } catch (error) {
      set({ error: 'Failed to book flight' });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Mock bookings would be loaded from API
    } catch (error) {
      set({ error: 'Failed to fetch bookings' });
    } finally {
      set({ isLoading: false });
    }
  },
  cancelBooking: async (bookingId: string) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to cancel booking' });
    } finally {
      set({ isLoading: false });
    }
  },
  setError: (error) => set({ error }),
}));
