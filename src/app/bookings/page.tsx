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
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2 font-medium">View and manage your flight bookings</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white px-8 py-5 mb-6 font-medium flex items-center gap-3 shadow">
            <span>i</span>
            {error}
          </div>
        )}

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 p-8 hover:shadow-md transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                  {/* Flight Details */}
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Booking Ref</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {booking.bookingRef}
                    </p>

                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-4">Flight</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.flight.flightNumber}
                    </p>
                    <p className="text-sm text-gray-600">{booking.flight.airline}</p>
                  </div>

                  {/* Route & Times */}
                  <div className="col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Departure</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {booking.flight.departure}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.flight.departureTime}
                        </p>
                      </div>
                      <div className="text-center flex-1">
                        <div className="w-full h-0.5 bg-gray-300 my-2"></div>
                        <p className="text-xs text-gray-500">{booking.flight.duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Arrival</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {booking.flight.arrival}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.flight.arrivalTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price, Status & Action */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Passengers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {booking.passengers}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${booking.totalPrice}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center flex-col sm:flex-row">
                      <span
                        className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider ${
                          booking.status === 'confirmed'
                            ? 'bg-green-600 text-white'
                            : booking.status === 'pending'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>

                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          disabled={isLoading || cancellingId === booking.id}
                          className="ml-auto bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-2 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                        >
                          {cancellingId === booking.id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Booking Date */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-600">
                    Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', {
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
          <div className="bg-gray-50 border border-gray-200 p-16 text-center">
            <p className="text-2xl font-bold text-gray-900 mb-4">
              No bookings yet
            </p>
            <p className="text-gray-600 font-medium mb-8">You haven't booked any flights yet. Start exploring.</p>
            <a
              href="/flights"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 transition uppercase tracking-wider"
            >
              Search Flights
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
