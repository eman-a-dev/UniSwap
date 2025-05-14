'use client';

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between shadow-lg z-50">
      
      {/* Left: Logo */}
      <div className="text-black font-semibold text-xl">
        UniSwap
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 mx-6 max-w-md w-full">
        <input
          type="text"
          placeholder="Search items, books, tools..."
          className="w-full px-4 py-2 rounded-full bg-white/20 placeholder-white/70 text-white focus:outline-none backdrop-blur-md border border-white/30"
        />
      </div>

      {/* Right: Login Button */}
      <button
        type="button"
        className="bg-black/20 text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-200"
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
