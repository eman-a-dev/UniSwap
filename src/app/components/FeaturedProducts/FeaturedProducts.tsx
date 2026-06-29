'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const LISTING_TYPES = [
  { value: '', label: 'All' },
  { value: 'sell', label: 'For Sale' },
  { value: 'exchange', label: 'Exchange' },
  { value: 'borrow', label: 'Borrow' },
];

export default function FeaturedProducts() {
 const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (listingType) params.append('listing_type', listingType);
      if (minPrice) params.append('min_price', minPrice);
      if (maxPrice) params.append('max_price', maxPrice);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [listingType]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Browse Items</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8 justify-center">
        {LISTING_TYPES.map(lt => (
          <button
            key={lt.value}
            onClick={() => setListingType(lt.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
              listingType === lt.value
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
            }`}
          >
            {lt.label}
          </button>
        ))}

        <div className="flex items-center gap-2 ml-4">
          <input
            type="number"
            placeholder="Min PKR"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max PKR"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-3xl bg-gray-100 animate-pulse h-72" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-16">No items found. Try a different filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((product: any) => (
            <ProductCard key={product.item_id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
