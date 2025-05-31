'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Minus, Plus, Star } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || 'Product Title';
  const image = searchParams.get('image') || '';
  const phone = searchParams.get('phone') || '';
  const description = searchParams.get('description') || 'Product description goes here.';
  const price = parseFloat(searchParams.get('price') || '0');
  const [quantity, setQuantity] = useState(1);

  const totalPrice = (price * quantity).toFixed(2);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="min-h-screen bg-white p-10 flex justify-center items-center my-16">
      <div className="flex flex-col md:flex-row bg-white max-w-5xl w-full rounded-3xl shadow-xl overflow-hidden">
        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex justify-center items-center">
          <img src={image} alt={title} className="rounded-2xl object-contain max-h-[450px]" />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase text-gray-400">New Collection</p>
            <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
            <p className="text-gray-500">White</p>

            {/* Ratings */}
            <div className="flex items-center space-x-1 text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
              <a href="#" className="ml-2 text-sm text-blue-500 underline">8 Reviews</a>
            </div>

            <p className="text-2xl text-orange-600 font-bold">${price.toFixed(2)}</p>

            <p className="text-sm text-gray-600">{description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mt-4">
              <p className="text-sm text-gray-700">Quantity:</p>
              <div className="flex items-center border rounded-full px-4 py-1 bg-gray-100">
                <button onClick={() => handleQuantityChange(-1)}>
                  <Minus size={16} />
                </button>
                <span className="mx-3">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="mt-4 text-lg text-gray-700">
              Total Price: <span className="font-semibold">${totalPrice}</span>
            </div>
          </div>

          <a
  href={`https://wa.me/${phone}?text=Hi, I'm interested in the ${title} for $${price.toFixed(2)}.`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-block px-6 py-3 bg-green-500 text-white text-lg rounded-full hover:bg-green-600 transition"
>
  📱 Contact on WhatsApp
</a>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
