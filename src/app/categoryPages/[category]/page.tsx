'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard/ProductCard';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { SessionProvider } from 'next-auth/react';

const categoryContent: Record<string, { heading: string; description: string; id: number }> = {
  books: { heading: 'Books', description: 'Explore a world of knowledge and stories.', id: 1 },
  gadgets: { heading: 'Gadgets', description: 'Stay updated with the latest tech.', id: 2 },
  academic: { heading: 'Academic Essentials', description: 'All must-have supplies in one place.', id: 3 },
  'design-tools': { heading: 'Design Tools', description: 'Power up your creativity and visuals.', id: 4 },
};

const LISTING_TYPES = [
  { value: '', label: 'All' },
  { value: 'sell', label: 'For Sale' },
  { value: 'exchange', label: 'Exchange' },
  { value: 'borrow', label: 'Borrow' },
];

function CategoryContent() {
  const params = useParams();
  const category = params?.category as string;
  const content = categoryContent[category];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [listingType, setListingType] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!content) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ category: String(content.id) });
        if (listingType) params.append('listing_type', listingType);
        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, listingType]);

  if (!content) return <h1 className="text-center text-2xl py-20">Category Not Found</h1>;

  const filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <div className="p-6 bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700">
          <h1 className="py-3 text-center text-4xl font-bold text-white">{content.heading}</h1>
          <p className="text-center text-md text-amber-100 pb-3">{content.description}</p>
        </div>

        <div className="p-8 space-y-6 max-w-7xl mx-auto">
          {/* Search and sort */}
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border px-4 py-2 border-gray-300 rounded-full w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="border border-gray-300 px-3 py-2 rounded-full text-sm"
            >
              <option value="asc">Sort A–Z</option>
              <option value="desc">Sort Z–A</option>
            </select>
          </div>

          {/* Listing type filter */}
          <div className="flex flex-wrap gap-2">
            {LISTING_TYPES.map(lt => (
              <button
                key={lt.value}
                onClick={() => setListingType(lt.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                  listingType === lt.value
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                }`}
              >
                {lt.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="h-72 bg-gray-100 animate-pulse rounded-3xl" />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.item_id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg col-span-full text-center pt-8">
              No products found. Try a different filter.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function CategoryPage() {
  return (
    <SessionProvider>
      <CategoryContent />
    </SessionProvider>
  );
}
