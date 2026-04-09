'use client';

import { useBookingStore, useAuthStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FlightCardProps {
  flight: {
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
  };
  passengers: number;
}

export function FlightCard({ flight, passengers }: FlightCardProps) {
  const { user } = useAuthStore();
  const { bookFlight, isLoading } = useBookingStore();
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setIsBooking(true);
    await bookFlight(flight, passengers);
    setIsBooking(false);
    router.push('/bookings');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Flight Info */}
        <div>
          <p className="text-sm text-gray-600">{flight.airline}</p>
          <p className="text-lg font-bold text-gray-800">{flight.flightNumber}</p>
          <p className="text-xs text-gray-500">{flight.aircraft}</p>
        </div>

        {/* Departure & Arrival */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-2xl font-bold text-gray-800">{flight.departure}</p>
            <p className="text-sm text-gray-600">{flight.departureTime}</p>
          </div>
          <div className="text-center text-xs text-gray-500">
            <div className="w-24 h-1 bg-gray-300 my-1"></div>
            <p>{flight.duration}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{flight.arrival}</p>
            <p className="text-sm text-gray-600">{flight.arrivalTime}</p>
          </div>
        </div>

        {/* Availability & Price */}
        <div>
          <p className="text-sm text-gray-600">Available Seats</p>
          <p className="text-xl font-bold text-green-600">{flight.seats}</p>
          <p className="text-xs text-gray-500">Price per seat</p>
        </div>

        {/* Price & Book Button */}
        <div className="flex flex-col items-end gap-2">
          <div>
            <p className="text-xs text-gray-600">Per Passenger</p>
            <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
            <p className="text-sm text-gray-600">
              Total: ${flight.price * passengers}
            </p>
          </div>
          <button
            onClick={handleBook}
            disabled={isLoading || isBooking || flight.seats < passengers}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-2 rounded transition"
          >
            {isBooking ? 'Booking...' : 'Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
