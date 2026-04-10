/**
 * Mock API service for airline booking system
 * Replace endpoints with real API URLs in production
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Generic fetch handler with error management
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'An error occurred',
        statusCode: response.status,
      };
    }

    return {
      success: true,
      data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      statusCode: 500,
    };
  }
}

/**
 * Authentication API calls
 */
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiFetch<{ id: string; name: string; email: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
    );
  },

  register: async (name: string, email: string, password: string) => {
    return apiFetch<{ id: string; name: string; email: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      },
    );
  },

  logout: async () => {
    return apiFetch<null>('/auth/logout', {
      method: 'POST',
    });
  },
};

/**
 * Flight search API calls
 */
export const flightAPI = {
  search: async (
    departure: string,
    arrival: string,
    date: string,
    passengers: number,
  ) => {
    const params = new URLSearchParams({
      from: departure,
      to: arrival,
      departDate: date,
      passengers: passengers.toString(),
    });

    return apiFetch<
      Array<{
        id: string;
        departure: string;
        arrival: string;
        departDate: string;
        departTime: string;
        arrivalTime: string;
        airline: string;
        price: number;
        duration: string;
        stops: number;
      }>
    >(`/flights?${params}`);
  },

  getFlightDetails: async (flightId: string) => {
    return apiFetch(`/flights/${flightId}`);
  },
};

/**
 * Booking API calls
 */
export const bookingAPI = {
  createBooking: async (flightId: string, passengers: number) => {
    return apiFetch<{
      id: string;
      bookingRef: string;
      status: string;
      totalPrice: number;
    }>('/bookings', {
      method: 'POST',
      body: JSON.stringify({ flightId, passengers }),
    });
  },

  getBookings: async () => {
    return apiFetch(`/bookings`);
  },

  getBookingDetails: async (bookingId: string) => {
    return apiFetch(`/bookings/${bookingId}`);
  },

  cancelBooking: async (bookingId: string) => {
    return apiFetch<{ status: string }>(`/bookings/${bookingId}/cancel`, {
      method: 'PUT',
    });
  },

  modifyBooking: async (
    bookingId: string,
    updates: { passengers?: number; flightId?: string },
  ) => {
    return apiFetch(`/bookings/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

/**
 * User profile API calls
 */
export const userAPI = {
  getProfile: async () => {
    return apiFetch(`/users/profile`);
  },

  updateProfile: async (updates: { name?: string; email?: string }) => {
    return apiFetch(`/users/profile`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiFetch(`/users/change-password`, {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// Export all APIs as single object for convenience
export const API = {
  auth: authAPI,
  flights: flightAPI,
  bookings: bookingAPI,
  users: userAPI,
};
