'use client';

import { FlightSearchForm } from '@/components/FlightSearchForm';
import { FlightCard } from '@/components/FlightCard';
import { Navbar } from '@/components/Navbar';
import { useFlightStore, useAuthStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FlightsPage() {
  const { user } = useAuthStore();
  const { filteredFlights, error, searchParams } = useFlightStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Search Flights</h1>
          <p className="text-gray-600 mt-2">Find and book your perfect flight</p>
        </div>

        {/* Search Form */}
        <div className="mb-12">
          <FlightSearchForm />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        {filteredFlights.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {filteredFlights.length} flights available
              {searchParams.from && ` from ${searchParams.from} to ${searchParams.to}`}
            </h2>
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  passengers={searchParams.passengers}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">
              Search for flights to see available options
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
