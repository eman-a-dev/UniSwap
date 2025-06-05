'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between shadow-lg z-50">
      
      {/* Left: Logo */}
      <Link href="/Home">
        <div className="text-black font-extrabold text-2xl cursor-pointer">
          UniSwap
        </div>
      </Link>
      
      {/* Center: Search Bar */}
      <div className="flex-1 mx-6 max-w-md w-full">
        <input
          type="text"
          placeholder="Search items, books, tools..."
          className="w-full px-4 py-2 rounded-full bg-black/20 placeholder-white/70 text-white focus:outline-none backdrop-blur-md border border-white/30"
        />
      </div>

      {/* Right: Buttons */}
      <div className='flex items-center gap-4'>
            <Link href="/PostItem">
              <button
                type="button"
                className="bg-black/20 text-white px-4 py-2 rounded-full border border-white/30 hover:bg-[#FA902D] transition-all duration-200"
              >
                Post Item
              </button>
            </Link>
          <Link href="/Login">
            <button
              type="button"
              className="bg-black/20 text-white px-4 py-2 rounded-full border border-white/30 hover:bg-[#FA902D] transition-all duration-200"
            >
              Login
            </button>
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;
