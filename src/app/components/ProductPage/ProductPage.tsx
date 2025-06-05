// app/components/ProductDetails/ProductDetails.tsx
'use client';

import React, { useState } from "react";
import { Minus, Plus, Star } from "lucide-react";

interface ProductProps {
  product: {
    item_id: number;
    title: string;
    description: string;
    image_url: string;
    price: number | null;
    price_type: string;
    phone: string;
  };
}

const ProductDetail: React.FC<ProductProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const numericPrice = Number(product?.price) || 0;

  const totalPrice =
    product?.price_type === "Free"
      ? "0.00"
      : (numericPrice * quantity).toFixed(2);

  const formattedUnitPrice =
    product?.price_type === "Free"
      ? "Free"
      : `$${numericPrice.toFixed(2)}`;

  const whatsappMessage = `Hi, I'm interested in the ${product?.title} for ${formattedUnitPrice}`;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="min-h-screen bg-white p-10 flex justify-center items-center my-16">
      <div className="flex flex-col md:flex-row bg-white max-w-5xl w-full rounded-3xl shadow-xl overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex justify-center items-center">
          <img
            src={product?.image_url}
            alt={product?.title}
            className="max-h-96 object-contain"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-gray-800">
              {product?.title}
            </h1>
            <p className="text-gray-500">White</p>
            <div className="flex items-center space-x-1 text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-2xl text-orange-600 font-bold">
              {formattedUnitPrice}
            </p>
            <p className="text-sm text-gray-600">{product?.description}</p>

            {/* Quantity Selector */}
            {product?.price_type !== "Free" && (
              <>
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

                {/* Total Price */}
                <div className="mt-4 text-lg text-gray-700">
                  Total Price:{" "}
                  <span className="font-semibold">${totalPrice}</span>
                </div>
              </>
            )}
          </div>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${product?.phone}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block px-6 py-3 bg-green-500 text-white text-lg rounded-full hover:bg-green-600 transition"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
