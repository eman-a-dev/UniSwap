// FeaturedProducts.tsx
'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">Products</h1>
      <div className="w-full flex justify-center px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center max-w-5xl w-full">
          {products.map((product: any) => (
            <ProductCard key={product.item_id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
