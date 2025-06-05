'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard/ProductCard';

const categoryContent = {
  books: {
    heading: 'books',
    description: 'Explore a world of knowledge and stories.',
    id: 1,
  },
  gadgets: {
    heading: 'gadgets',
    description: 'Stay updated with the latest tech.',
    id: 2,
  },
  academic: {
    heading: 'academic',
    description: 'All must-have supplies in one place.',
    id: 3,
  },
  'design-tools': {
    heading: 'design-tools',
    description: 'Power up your creativity and visuals.',
    id: 4,
  },
};

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as keyof typeof categoryContent; // <-- fix here
  const content = categoryContent[category];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const catId = content?.id; // ✅ this was missing
        const res = await fetch(`/api/products?category=${catId}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    if (category && content) {
      fetchProducts();
    }
  }, [category]);

  if (!content) {
    return <h1 className="text-center text-2xl">Category Not Found</h1>;
  }

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <>
     <div className='p-0 bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700'>
        <h1 className="py-3 text-center text-4xl font-bold text-white ">{content.heading}</h1>
        <p className="text-center text-md text-amber-100 pb-3">{content.description}</p>
      </div>

    <div className="p-8 space-y-6">
     
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 border-gray-400 rounded w-full max-w-md "
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="border border-gray-400 px-3 py-2 rounded"
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-20">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.item_id} product={product} />
        
          ))
        ) : (
          <p className="text-gray-500 text-lg col-span-full text-center pt-8">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
    </>
  );
}
