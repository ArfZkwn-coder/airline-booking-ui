'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/store';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl">AirBook</span>
          </Link>

          <div className="flex gap-6 items-center">
            {user ? (
              <>
                <Link href="/flights" className="hover:text-blue-100 transition">
                  Search Flights
                </Link>
                <Link href="/bookings" className="hover:text-blue-100 transition">
                  My Bookings
                </Link>
                <div className="flex gap-4 items-center">
                  <span className="text-sm">👤 {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/auth/login"
                  className="hover:text-blue-100 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
