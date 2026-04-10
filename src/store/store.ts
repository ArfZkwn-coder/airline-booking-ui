import { create } from 'zustand';
import { API } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Flight {
  id: string;
  departure: string;
  arrival: string;
  departDate: string;
  departTime: string;
  arrivalTime: string;
  duration: string;
  airline: string;
  price: number;
  stops: number;
}

interface Booking {
  id: string;
  userId: string;
  flightId: string;
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
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setError: (error: string | null) => void;
}

interface FlightStore {
  flights: Flight[];
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

// Auth store with real API
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.auth.login(email, password);
      if (response.success && response.data) {
        set({ user: response.data as unknown as User });
      } else {
        set({ error: response.error || 'Login failed' });
      }
    } catch (error) {
      set({ error: 'Login failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.auth.register(name, email, password);
      if (response.success && response.data) {
        set({ user: response.data as unknown as User });
      } else {
        set({ error: response.error || 'Registration failed' });
      }
    } catch (error) {
      set({ error: 'Registration failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => set({ user: null }),
  setError: (error) => set({ error }),
}));

// Flight store with real API
export const useFlightStore = create<FlightStore>((set, get) => ({
  flights: [],
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
      const { searchParams } = get();
      const response = await API.flights.search(
        searchParams.from,
        searchParams.to,
        searchParams.departDate,
        searchParams.passengers,
      );

      if (response.success && response.data) {
        set({ flights: response.data as unknown as Flight[] });
      } else {
        set({ error: response.error || 'Failed to search flights' });
      }
    } catch (error) {
      set({ error: 'Failed to search flights' });
    } finally {
      set({ isLoading: false });
    }
  },
  setError: (error) => set({ error }),
}));

// Booking store with real API  
export const useBookingStore = create<BookingStore>((set, get) => ({
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
      const user = useAuthStore.getState().user;
      if (!user) {
        set({ error: 'Please login to book a flight' });
        return;
      }

      const response = await API.bookings.createBooking(flight.id, passengers);
      if (response.success) {
        await get().fetchBookings();
        set({ selectedFlight: null, passengers: 1 });
      } else {
        set({ error: response.error || 'Booking failed' });
      }
    } catch (error) {
      set({ error: 'Booking failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = useAuthStore.getState().user;
      if (!user) return;

      const response = await API.bookings.getBookings();
      if (response.success && response.data) {
        set({ bookings: response.data as unknown as Booking[] });
      } else {
        set({ error: response.error || 'Failed to fetch bookings' });
      }
    } catch (error) {
      set({ error: 'Failed to fetch bookings' });
    } finally {
      set({ isLoading: false });
    }
  },
  cancelBooking: async (bookingId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.bookings.cancelBooking(bookingId);
      if (response.success) {
        await get().fetchBookings();
      } else {
        set({ error: response.error || 'Cancellation failed' });
      }
    } catch (error) {
      set({ error: 'Cancellation failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  setError: (error) => set({ error }),
}));
