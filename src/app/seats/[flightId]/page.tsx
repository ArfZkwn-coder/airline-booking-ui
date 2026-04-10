'use client';

import { Navbar } from '@/components/Navbar';
import { useAuthStore, useFlightStore, useBookingStore } from '@/store/store';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SeatSelection {
  [seatNumber: string]: boolean;
}

export default function SeatsPage() {
  const { user } = useAuthStore();
  const { flights } = useFlightStore();
  const { bookFlight, isLoading } = useBookingStore();
  const router = useRouter();
  const params = useParams();
  const flightId = params.flightId as string;

  const [selectedSeats, setSelectedSeats] = useState<SeatSelection>({});
  const [flight, setFlight] = useState<any>(null);
  const [passengers, setPassengers] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Find the flight
    const selectedFlight = flights.find((f) => f.id === flightId);
    if (selectedFlight) {
      setFlight(selectedFlight);
      // Get passengers from URL params if available
      const searchParams = new URLSearchParams(window.location.search);
      const pass = searchParams.get('passengers');
      if (pass) setPassengers(parseInt(pass));
    }
  }, [user, flights, flightId, router]);

  if (!user || !flight) {
    return null;
  }

  const rows = 30;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  const bookedSeatsSet = new Set(flight.bookedSeats);

  const generateSeats = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (const col of columns) {
        const seatNumber = `${row}${col}`;
        seats.push({
          number: seatNumber,
          isBooked: bookedSeatsSet.has(seatNumber),
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();
  const selectedSeatsArray = Object.keys(selectedSeats).filter((s) => selectedSeats[s]);
  const totalPrice = selectedSeatsArray.length > 0 ? flight.price * selectedSeatsArray.length : 0;

  const handleSeatClick = (seatNumber: string) => {
    if (bookedSeatsSet.has(seatNumber)) return;
    if (selectedSeatsArray.length >= passengers && !selectedSeats[seatNumber]) return;

    setSelectedSeats((prev) => ({
      ...prev,
      [seatNumber]: !prev[seatNumber],
    }));
  };

  const handleConfirmBooking = async () => {
    if (selectedSeatsArray.length !== passengers) {
      alert(`Please select exactly ${passengers} seat(s)`);
      return;
    }

    setIsConfirming(true);
    await bookFlight(flight, passengers, selectedSeatsArray);
    setIsConfirming(false);
    router.push('/bookings');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Flight Info */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-1">FLIGHT</p>
              <p className="text-lg font-bold text-gray-900">{flight.airline}</p>
              <p className="text-sm text-gray-600">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600">{flight.departure}</p>
                <p className="text-xl font-bold text-gray-900">{flight.departTime}</p>
              </div>
              <div className="text-center flex-1">
                <div className="w-full h-0.5 bg-gray-300 my-2"></div>
                <p className="text-xs text-gray-500">{flight.duration}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600">{flight.arrival}</p>
                <p className="text-xl font-bold text-gray-900">{flight.arrivalTime}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-1">PRICE PER SEAT</p>
              <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-semibold mb-1">TOTAL</p>
              <p className="text-3xl font-bold text-blue-600">${totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Seat Map */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Select Your Seats</h1>
          <p className="text-gray-600 mb-8 font-medium">
            Select {passengers} seat{passengers > 1 ? 's' : ''} for your booking ({selectedSeatsArray.length} selected)
          </p>

          <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-8 rounded-lg border border-gray-200 overflow-x-auto">
            {/* Seat Legend */}
            <div className="flex gap-8 mb-8 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded border border-green-600"></div>
                <span className="text-sm font-medium text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded border border-blue-600"></div>
                <span className="text-sm font-medium text-gray-700">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-400 rounded border border-gray-500"></div>
                <span className="text-sm font-medium text-gray-700">Booked</span>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="inline-block">
              <div className="flex gap-8 mb-4 justify-center">
                <div className="w-8"></div>
                {columns.map((col) => (
                  <div key={col} className="w-8 h-8 flex items-center justify-center font-bold text-gray-700">
                    {col}
                  </div>
                ))}
              </div>

              {Array.from({ length: rows }).map((_, rowIdx) => (
                <div key={rowIdx} className="flex gap-8 mb-2 items-center">
                  <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-700">
                    {rowIdx + 1}
                  </div>
                  <div className="flex gap-2">
                    {columns.map((col) => {
                      const seatNumber = `${rowIdx + 1}${col}`;
                      const isBooked = bookedSeatsSet.has(seatNumber);
                      const isSelected = selectedSeats[seatNumber];

                      return (
                        <button
                          key={seatNumber}
                          onClick={() => handleSeatClick(seatNumber)}
                          disabled={isBooked}
                          className={`w-8 h-8 rounded border-2 font-medium text-xs transition ${
                            isBooked
                              ? 'bg-gray-400 border-gray-500 cursor-not-allowed'
                              : isSelected
                              ? 'bg-blue-500 border-blue-600 text-white'
                              : 'bg-green-500 border-green-600 hover:bg-green-600 text-white'
                          }`}
                          title={seatNumber}
                        >
                          {seatNumber.length > 2 ? '' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeatsArray.length > 0 && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Selected Seats</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {selectedSeatsArray.sort().map((seat) => (
                <span key={seat} className="bg-blue-500 text-white px-3 py-1 rounded font-semibold text-sm">
                  {seat}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-green-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Seats: {selectedSeatsArray.length}</p>
                <p className="text-2xl font-bold text-green-600">${totalPrice}</p>
              </div>
              <button
                onClick={handleConfirmBooking}
                disabled={isConfirming || isLoading || selectedSeatsArray.length !== passengers}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 font-bold uppercase transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConfirming ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Link
            href="/flights"
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8 py-3 font-bold uppercase transition"
          >
            ← Back to Flights
          </Link>
        </div>
      </div>
    </div>
  );
}
