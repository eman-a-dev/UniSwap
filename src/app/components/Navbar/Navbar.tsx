'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ item_id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) setSearchResults(await res.json());
        else setSearchResults([]);
      } catch {
        setSearchResults([]);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between shadow-lg z-50">

      <Link href="/Home">
        <div className="text-black font-extrabold text-2xl cursor-pointer">UniSwap</div>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 mx-6 max-w-md w-full relative">
        <input
          type="text"
          placeholder="Search items, books, tools..."
          className="w-full px-4 py-2 rounded-full bg-black/20 placeholder-white/70 text-white focus:outline-none backdrop-blur-md border border-white/30"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query.length >= 2 && (
          <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto z-50 text-black">
            {loading && <div className="p-2 text-center text-gray-500">Loading...</div>}
            {!loading && searchResults.length === 0 && (
              <div className="p-2 text-center text-gray-500">No results found</div>
            )}
            {!loading && searchResults.map(item => (
              <Link key={item.item_id} href={`/productdetails/${item.item_id}`}>
                <div
                  className="px-4 py-2 hover:bg-orange-400 cursor-pointer"
                  onClick={() => setQuery('')}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <Link href="/PostItem">
              <button className="bg-black/20 text-white px-4 py-2 rounded-full border border-white/30 hover:bg-[#FA902D] transition-all duration-200 text-sm">
                Post Item
              </button>
            </Link>
            <Link href="/Wishlist">
              <button className="bg-black/20 text-white px-4 py-2 rounded-full border border-white/30 hover:bg-[#FA902D] transition-all duration-200 text-sm">
                Wishlist
              </button>
            </Link>
            <Link href="/MyListings">
              <button className="bg-black/20 text-white px-4 py-2 rounded-full border border-white/30 hover:bg-[#FA902D] transition-all duration-200 text-sm">
                My Listings
              </button>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/Home' })}
              className="bg-black/20 text-white px-4 py-2 rounded-full border border-white/30 hover:bg-red-500 transition-all duration-200 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/Login">
              <button className="bg-black/20 text-white px-4 py-2 rounded-full border border-white/30 hover:bg-[#FA902D] transition-all duration-200 text-sm">
                Login
              </button>
            </Link>
            <Link href="/Signup">
              <button className="bg-[#FA902D] text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-all duration-200 text-sm">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
