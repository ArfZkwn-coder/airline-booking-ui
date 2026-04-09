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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">AirBook</span>
          </Link>

          <div className="flex gap-6 items-center">
            {user ? (
              <>
                <Link href="/flights" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                  Search Flights
                </Link>
                <Link href="/bookings" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                  My Bookings
                </Link>
                <div className="flex gap-4 items-center border-l border-gray-200 pl-4">
                  <span className="text-sm text-gray-600">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition"
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
