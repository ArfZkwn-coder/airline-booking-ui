'use client';

import { useFlightStore } from '@/store/store';
import { useState } from 'react';

export function FlightSearchForm() {
  const { setSearchParams, searchFlights, isLoading } = useFlightStore();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('1');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      from,
      to,
      departDate: date,
      passengers: parseInt(passengers),
    });
    searchFlights();
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white border border-gray-200 p-8 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            From
          </label>
          <input
            type="text"
            placeholder="Departure city"
            value={from}
            onChange={(e) => setFrom(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            To
          </label>
          <input
            type="text"
            placeholder="Arrival city"
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Passengers
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} passenger{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 transition"
      >
        {isLoading ? 'Searching...' : 'Search Flights'}
      </button>
    </form>
  );
}
