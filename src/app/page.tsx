'use client';

import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/store';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Book Flights with Confidence
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Simple, transparent flight bookings. Find the best prices and book in seconds.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/flights"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg transition"
            >
              Search Flights
            </Link>
            {!user && (
              <Link
                href="/auth/login"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-8 py-3 text-lg transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Why AirBook
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">Best Prices</div>
              <p className="text-gray-600 text-lg">
                Compare prices across airlines and find the lowest fares.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">Secure</div>
              <p className="text-gray-600 text-lg">
                Your data is protected with industry-standard encryption.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">Fast</div>
              <p className="text-gray-600 text-lg">
                Book in seconds and receive instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24 px-4 border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to travel?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your journey today and discover amazing destinations.
          </p>
          <Link
            href="/flights"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg transition"
          >
            Explore Flights
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">AirBook</h3>
              <p className="text-sm">Flight booking made simple.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/flights" className="hover:text-white">Search Flights</a></li>
                <li><a href="/bookings" className="hover:text-white">My Bookings</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 AirBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
