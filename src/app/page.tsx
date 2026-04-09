'use client';

import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/store';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Fly Anywhere, <span className="text-blue-600">Anytime</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Book your perfect flight in seconds. Find the best deals, compare airlines, and
            travel with confidence.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/flights"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105"
            >
              Search Flights
            </Link>
            {!user && (
              <Link
                href="/auth/login"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-lg transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose AirBook?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-transparent p-8 rounded-lg border border-blue-100">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Best Flight Deals
              </h3>
              <p className="text-gray-600">
                Compare prices across multiple airlines and find the best deals for your
                journey.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-transparent p-8 rounded-lg border border-green-100">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Booking
              </h3>
              <p className="text-gray-600">
                Your information is encrypted and protected with industry-leading security
                standards.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-transparent p-8 rounded-lg border border-purple-100">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Confirmation
              </h3>
              <p className="text-gray-600">
                Get confirmed within seconds and receive your booking details immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Fly?</h2>
          <p className="text-blue-100 mb-8">
            Start your journey with AirBook today and discover amazing destinations.
          </p>
          <Link
            href="/flights"
            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105"
          >
            Explore Flights Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">AirBook</h3>
              <p className="text-sm">Your trusted partner for flight bookings worldwide.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/flights" className="hover:text-white transition">
                    Search Flights
                  </a>
                </li>
                <li>
                  <a href="/bookings" className="hover:text-white transition">
                    My Bookings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
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
