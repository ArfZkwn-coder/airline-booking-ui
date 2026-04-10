'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('flight');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16 border-b border-gray-700">
          <Link href="/" className="text-cyan-400 text-lg font-bold">
            TriPlanner
          </Link>

          <div className="flex gap-3 items-center">
            {user ? (
              <>
                <span className="text-sm text-gray-300">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white font-medium text-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 items-center">
                <button className="text-gray-300 hover:text-white font-medium text-sm flex items-center gap-1">
                  🌐 EN
                </button>
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-white font-medium text-sm border-l border-gray-600 pl-3"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-8 h-14 items-center">
          <button
            onClick={() => setActiveTab('flight')}
            className={`flex items-center gap-2 text-sm font-medium transition pb-4 border-b-2 ${
              activeTab === 'flight'
                ? 'text-white border-cyan-400'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent'
            }`}
          >
            ✈️ Flight
          </button>
          <button
            onClick={() => setActiveTab('hotel')}
            className={`flex items-center gap-2 text-sm font-medium transition pb-4 border-b-2 ${
              activeTab === 'hotel'
                ? 'text-white border-cyan-400'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent'
            }`}
          >
            🏨 Hotel
          </button>
          <button
            onClick={() => setActiveTab('homestays')}
            className={`flex items-center gap-2 text-sm font-medium transition pb-4 border-b-2 ${
              activeTab === 'homestays'
                ? 'text-white border-cyan-400'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent'
            }`}
          >
            🏠 Homestays & villas
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2 text-sm font-medium transition pb-4 border-b-2 ${
              activeTab === 'packages'
                ? 'text-white border-cyan-400'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent'
            }`}
          >
            📦 Holiday packages
          </button>
        </div>
      </div>
    </nav>
  );
}
