'use client';

import { Navbar } from '@/components/Navbar';
import { useBookingStore, useAuthStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BookingsPage() {
  const { user } = useAuthStore();
  const { bookings, cancelBooking, error, isLoading, fetchBookings } =
    useBookingStore();
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    fetchBookings();
  }, [user, router, fetchBookings]);

  if (!user) {
    return null;
  }

  const handleCancel = async (bookingId: string) => {
    setCancellingId(bookingId);
    await cancelBooking(bookingId);
    setCancellingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">View and manage your flight bookings</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  {/* Flight Details */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      {booking.bookingRef}
                    </p>

                    <p className="text-sm text-gray-600">Flight</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {booking.flight.flightNumber}
                    </p>
                    <p className="text-sm text-gray-600">{booking.flight.airline}</p>
                  </div>

                  {/* Route & Times */}
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Departure</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {booking.flight.departure}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.flight.departureTime}
                        </p>
                      </div>
                      <div className="text-center text-xs text-gray-500">
                        <div className="w-12 h-1 bg-gray-300 my-2"></div>
                        <p>{booking.flight.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Arrival</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {booking.flight.arrival}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.flight.arrivalTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price, Status & Action */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Passengers</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {booking.passengers}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${booking.totalPrice}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>

                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          disabled={isLoading || cancellingId === booking.id}
                          className="ml-auto bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-1 rounded text-sm transition"
                        >
                          {cancellingId === booking.id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Booking Date */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Booked on{' '}
                    {new Date(booking.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              You haven't booked any flights yet.
            </p>
            <a
              href="/flights"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Search Flights
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
