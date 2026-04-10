'use client';

import { Navbar } from '@/components/Navbar';
import { useBookingStore, useAuthStore, useFlightStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface EnrichedBooking {
  id: string;
  userId: string;
  flightId: string;
  passengers: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  flightDetails?: {
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
  };
}

export default function BookingsPage() {
  const { user } = useAuthStore();
  const { bookings, cancelBooking, error, isLoading, fetchBookings } =
    useBookingStore();
  const { flights } = useFlightStore();
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPassengers, setEditPassengers] = useState<number>(1);
  const [enrichedBookings, setEnrichedBookings] = useState<EnrichedBooking[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    fetchBookings();
  }, [user, router, fetchBookings]);

  // Enrich bookings with flight details
  useEffect(() => {
    if (bookings && flights) {
      const enriched = bookings.map((booking) => ({
        ...booking,
        flightDetails: flights.find((f) => f.id === booking.flightId),
      }));
      setEnrichedBookings(enriched);
    }
  }, [bookings, flights]);

  if (!user) {
    return null;
  }

  const handleCancel = async (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setCancellingId(bookingId);
      await cancelBooking(bookingId);
      setCancellingId(null);
    }
  };

  const handleModifyClick = (booking: EnrichedBooking) => {
    setEditingId(booking.id);
    setEditPassengers(booking.passengers);
  };

  const handleConfirmModify = async (booking: EnrichedBooking) => {
    // TODO: Call modify API when backend support is added
    setEditingId(null);
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
            <span>!</span>
            {error}
          </div>
        )}

        {/* Bookings List */}
        {enrichedBookings.length > 0 ? (
          <div className="grid gap-6">
            {enrichedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 p-8 hover:shadow-md transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                  {/* Flight Details */}
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Booking ID</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {booking.id.substring(0, 8).toUpperCase()}
                    </p>

                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-4">Flight</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.flightDetails?.airline || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.flightDetails?.stops === 0 ? 'Non-stop' : `${booking.flightDetails?.stops} stop(s)`}
                    </p>
                  </div>

                  {/* Route & Times */}
                  <div className="col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Departure</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {booking.flightDetails?.departure || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.flightDetails?.departTime}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {booking.flightDetails?.departDate}
                        </p>
                      </div>
                      <div className="text-center flex-1">
                        <div className="w-full h-0.5 bg-gray-300 my-2"></div>
                        <p className="text-xs text-gray-500">{booking.flightDetails?.duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Arrival</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {booking.flightDetails?.arrival || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.flightDetails?.arrivalTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price, Status & Action */}
                  <div className="space-y-4">
                    {editingId === booking.id ? (
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 font-semibold mb-2">PASSENGERS</p>
                          <div className="flex items-center gap-2 border border-gray-300">
                            <button
                              onClick={() => setEditPassengers(Math.max(1, editPassengers - 1))}
                              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={editPassengers}
                              onChange={(e) => setEditPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                              className="flex-1 text-center py-2 border-none"
                            />
                            <button
                              onClick={() => setEditPassengers(editPassengers + 1)}
                              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {booking.flightDetails && (
                          <div>
                            <p className="text-xs text-gray-500 font-semibold mb-1">NEW TOTAL</p>
                            <p className="text-2xl font-bold text-blue-600">
                              ${booking.flightDetails.price * editPassengers}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}

                    <div className="flex gap-2">
                      <span
                        className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider flex-1 text-center ${
                          booking.status === 'confirmed'
                            ? 'bg-green-600 text-white'
                            : booking.status === 'pending'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                  {editingId === booking.id ? (
                    <>
                      <button
                        onClick={() => handleConfirmModify(booking)}
                        disabled={isLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 font-semibold uppercase tracking-wider text-sm transition disabled:opacity-50"
                      >
                        {isLoading ? 'Updating...' : 'Confirm'}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 font-semibold uppercase tracking-wider text-sm transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {booking.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => handleModifyClick(booking)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold uppercase tracking-wider text-sm transition"
                          >
                            ✏️ Modify
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            disabled={isLoading || cancellingId === booking.id}
                            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 font-semibold uppercase tracking-wider text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {cancellingId === booking.id ? 'Cancelling...' : '🗑️ Cancel'}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Booking Date */}
                <div className="mt-4 pt-4 border-t border-gray-200">
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
            <Link
              href="/flights"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 transition uppercase tracking-wider"
            >
              Search Flights
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
