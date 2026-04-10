'use client';

import { useFlightStore } from '@/store/store';
import { useState } from 'react';

// Available airports from the flight database
const AIRPORTS = [
  { code: 'DEL', name: 'Delhi (Indira Gandhi)' },
  { code: 'BOM', name: 'Mumbai (Bombay)' },
  { code: 'BLR', name: 'Bangalore (Kempegowda)' },
  { code: 'NYC', name: 'New York (JFK)' },
  { code: 'LAX', name: 'Los Angeles' },
  { code: 'SFO', name: 'San Francisco' },
  { code: 'LHR', name: 'London (Heathrow)' },
  { code: 'CDG', name: 'Paris (Charles de Gaulle)' },
  { code: 'AMS', name: 'Amsterdam' },
];

export function FlightSearchForm() {
  const { setSearchParams, searchFlights, isLoading } = useFlightStore();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [cabin, setCabin] = useState('Economy');
  const [tripType, setTripType] = useState('one-way');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) {
      alert('Please select departure and arrival airports');
      return;
    }
    setSearchParams({
      from,
      to,
      departDate,
      passengers: parseInt(passengers),
    });
    searchFlights();
  };

  return (
    <form onSubmit={handleSearch} className="w-full space-y-6">
      {/* Trip Type Buttons */}
      <div className="flex gap-3 justify-center">
        <button
          type="button"
          onClick={() => setTripType('one-way')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
            tripType === 'one-way'
              ? 'bg-black text-white'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          One way
        </button>
        <button
          type="button"
          onClick={() => setTripType('round-trip')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
            tripType === 'round-trip'
              ? 'bg-black text-white'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          Round trip
        </button>
        <button
          type="button"
          onClick={() => setTripType('multi-city')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
            tripType === 'multi-city'
              ? 'bg-black text-white'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          Multi city
        </button>
      </div>

      {/* Subtitle */}
      <p className="text-center text-sm text-gray-600 font-medium">
        Book International and Domestic Flights
      </p>

      {/* From and To Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            required
          >
            <option value="">Select departure</option>
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            required
          >
            <option value="">Select arrival</option>
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date and Passenger Row */}
      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase">Depart</label>
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        {tripType === 'round-trip' && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase">Return</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        <div className={tripType === 'round-trip' ? '' : 'col-span-2'}>
          <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase">Travellers</label>
          <input
            type="text"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            placeholder="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase">Class</label>
          <select
            value={cabin}
            onChange={(e) => setCabin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Economy</option>
            <option>Business</option>
            <option>First</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition text-lg"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
