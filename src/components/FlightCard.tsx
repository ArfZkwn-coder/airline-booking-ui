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
    <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <div>
          <p className="text-xs text-gray-500 font-semibold mb-1">AIRLINE</p>
          <p className="font-semibold text-gray-900">{flight.airline}</p>
          <p className="text-sm text-gray-600">{flight.flightNumber}</p>
        </div>

        <div className="flex items-center justify-between gap-2 col-span-2">
          <div>
            <p className="text-2xl font-bold text-gray-900">{flight.departure}</p>
            <p className="text-sm text-gray-600">{flight.departureTime}</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-0.5 bg-gray-300"></div>
            <p className="text-xs text-gray-500">{flight.duration}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{flight.arrival}</p>
            <p className="text-sm text-gray-600">{flight.arrivalTime}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 font-semibold mb-1">SEATS</p>
          <p className="text-2xl font-bold text-gray-900">{flight.seats}</p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div>
            <p className="text-xs text-gray-500 font-semibold">PRICE</p>
            <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
            <p className="text-sm text-gray-600">Total: ${flight.price * passengers}</p>
          </div>
          <button
            onClick={handleBook}
            disabled={isLoading || isBooking || flight.seats < passengers}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            {isBooking ? 'Booking...' : flight.seats < passengers ? 'No Seats' : 'Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
