'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Heart } from 'lucide-react';

const LISTING_TYPE_COLORS: Record<string, string> = {
  sell: 'bg-orange-500 text-white',
  exchange: 'bg-blue-500 text-white',
  borrow: 'bg-purple-500 text-white',
};

const LISTING_TYPE_LABELS: Record<string, string> = {
  sell: 'For Sale',
  exchange: 'Exchange',
  borrow: 'Borrow',
};

const STATUS_COLORS: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  reserved: 'bg-yellow-100 text-yellow-700',
  sold: 'bg-gray-200 text-gray-500',
};

export default function ProductCard({ product, showWishlist = false, onWishlistRemove }: {
  product: any;
  showWishlist?: boolean;
  onWishlistRemove?: (id: number) => void;
}) {
  const { data: session } = useSession();
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  if (!product) return null;

  const listingType = product.listing_type || 'sell';
  const status = product.status || 'available';
  const isSold = status === 'sold';

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;
    setWishlistLoading(true);

    if (showWishlist && onWishlistRemove) {
      await fetch(`/api/wishlist?email=${encodeURIComponent(session.user.email)}&item_id=${product.item_id}`, { method: 'DELETE' });
      onWishlistRemove(product.item_id);
    } else {
      if (wishlisted) {
        await fetch(`/api/wishlist?email=${encodeURIComponent(session.user.email)}&item_id=${product.item_id}`, { method: 'DELETE' });
        setWishlisted(false);
      } else {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email, item_id: product.item_id }),
        });
        setWishlisted(true);
      }
    }
    setWishlistLoading(false);
  };

  return (
    <div className={`relative w-full max-w-sm rounded-3xl bg-white shadow-lg p-4 space-y-3 hover:scale-[1.02] transition-all ${isSold ? 'opacity-60' : ''}`}>
      {/* Badges Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${LISTING_TYPE_COLORS[listingType]}`}>
          {LISTING_TYPE_LABELS[listingType] || listingType}
        </span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Wishlist Button */}
      {session && !showWishlist && (
        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          className="absolute top-4 right-4 p-1 rounded-full bg-white shadow hover:scale-110 transition z-10"
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      )}

      {showWishlist && session && (
        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          className="absolute top-4 right-4 p-1 rounded-full bg-white shadow hover:scale-110 transition z-10"
          title="Remove from wishlist"
        >
          <Heart size={18} className="fill-red-500 text-red-500" />
        </button>
      )}

      <Link href={`/productdetails/${product.item_id}`}>
        <img
          src={product.image_url || '/images/heroimg.png'}
          alt={product.title}
          className="w-full h-52 object-cover rounded-xl"
        />
        <h2 className="text-lg font-semibold text-gray-800 mt-2">{product.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold text-gray-800">
            {product.price_type === 'free' ? 'Free' : `PKR ${product.price}`}
          </span>
          <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm hover:bg-orange-600 transition">
            {listingType === 'sell' ? 'Buy' : listingType === 'exchange' ? 'Exchange' : 'Borrow'}
          </button>
        </div>
      </Link>
    </div>
  );
}
