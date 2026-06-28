'use client';

import React, { useState } from "react";
import { Minus, Plus, Star } from "lucide-react";
import Link from "next/link";

interface ProductProps {
  product: {
    item_id: number;
    title: string;
    description: string;
    image_url: string;
    price: number | null;
    price_type: string;
    phone: string;
    listing_type?: string;
    status?: string;
    full_name?: string;
    email?: string;
  };
}

const LISTING_TYPE_COLORS: Record<string, string> = {
  sell: 'bg-orange-500 text-white',
  exchange: 'bg-blue-500 text-white',
  borrow: 'bg-purple-500 text-white',
};

const STATUS_COLORS: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  reserved: 'bg-yellow-100 text-yellow-700',
  sold: 'bg-gray-200 text-gray-600',
};

const ProductDetail: React.FC<ProductProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const numericPrice = Number(product?.price) || 0;
  const isFree = product?.price_type === "free";
  const listingType = product?.listing_type || "sell";
  const status = product?.status || "available";

  const totalPrice = isFree ? "0.00" : (numericPrice * quantity).toFixed(2);
  const formattedUnitPrice = isFree ? "Free" : `PKR ${numericPrice.toFixed(0)}`;

  const cleanPhone = (product?.phone || "").replace(/\s+/g, "").replace(/^\+/, "");
  const whatsappMessage = `Hi! I found your listing on UniSwap — I'm interested in "${product?.title}" (${formattedUnitPrice}). Is it still available?`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start pt-28">
      <div className="flex flex-col md:flex-row bg-white max-w-5xl w-full rounded-3xl shadow-xl overflow-hidden">
        {/* Image */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex justify-center items-center">
          <img
            src={product?.image_url || '/images/heroimg.png'}
            alt={product?.title}
            className="max-h-96 w-full object-contain rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 p-8 flex flex-col gap-4">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${LISTING_TYPE_COLORS[listingType] || 'bg-gray-200 text-gray-600'}`}>
              {listingType === 'sell' ? 'For Sale' : listingType === 'exchange' ? 'Exchange' : 'Borrow'}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[status] || 'bg-gray-200 text-gray-600'}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          <h1 className="text-3xl font-semibold text-gray-800">{product?.title}</h1>

          <div className="flex items-center gap-1 text-orange-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>

          <p className="text-2xl font-bold text-orange-600">{formattedUnitPrice}</p>

          <p className="text-gray-600 text-sm leading-relaxed">{product?.description}</p>

          {product?.full_name && (
            <p className="text-sm text-gray-500">Posted by: <span className="font-medium text-gray-700">{product.full_name}</span></p>
          )}

          {/* Quantity (only for paid sell items) */}
          {listingType === 'sell' && !isFree && status === 'available' && (
            <>
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-700">Quantity:</p>
                <div className="flex items-center border rounded-full px-4 py-1 bg-gray-100 gap-3">
                  <button onClick={() => handleQuantityChange(-1)} type="button"><Minus size={16} /></button>
                  <span className="w-6 text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} type="button"><Plus size={16} /></button>
                </div>
              </div>
              <p className="text-gray-700">Total: <span className="font-semibold">PKR {totalPrice}</span></p>
            </>
          )}

          {/* WhatsApp Button */}
          {product?.phone && status !== 'sold' ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white text-base font-semibold rounded-full hover:bg-green-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.304A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.957 7.957 0 01-4.073-1.117l-.292-.174-3.036.796.811-2.96-.19-.304A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
              Contact on WhatsApp
            </a>
          ) : status === 'sold' ? (
            <div className="mt-2 px-6 py-3 bg-gray-200 text-gray-500 text-center rounded-full font-semibold">
              This item has been sold
            </div>
          ) : null}

          <Link href="/Home" className="text-sm text-orange-500 hover:underline mt-2">
            ← Back to listings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
