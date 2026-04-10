'use client';

import { useAuthStore } from '@/store/store';
import { useRouter } from 'next/navigation';

interface FlightCardProps {
  flight: {
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
  passengers: number;
}

export function FlightCard({ flight, passengers }: FlightCardProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleBook = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Redirect to seat selection page with flight ID and passenger count
    router.push(`/seats/${flight.id}?passengers=${passengers}`);
  };

  return (
    <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <div>
          <p className="text-xs text-gray-500 font-semibold mb-1">AIRLINE</p>
          <p className="font-semibold text-gray-900">{flight.airline}</p>
          <p className="text-sm text-gray-600">{flight.stops} {flight.stops === 0 ? 'Non-stop' : 'stop(s)'}</p>
        </div>

        <div className="flex items-center justify-between gap-2 col-span-2">
          <div>
            <p className="text-2xl font-bold text-gray-900">{flight.departure}</p>
            <p className="text-sm text-gray-600">{flight.departTime}</p>
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
          <p className="text-xs text-gray-500 font-semibold mb-1">DATE</p>
          <p className="text-lg font-bold text-gray-900">{flight.departDate}</p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div>
            <p className="text-xs text-gray-500 font-semibold">PRICE</p>
            <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
            <p className="text-sm text-gray-600">Total: ${flight.price * passengers}</p>
          </div>
          <button
            onClick={handleBook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold transition w-full"
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
}
