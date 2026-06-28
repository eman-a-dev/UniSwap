'use client';

import { useSession, SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../components/ProductCard/ProductCard';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function WishlistContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/Login');
  }, [status]);

  const fetchWishlist = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/wishlist?email=${encodeURIComponent(session.user.email)}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) fetchWishlist();
  }, [session]);

  const handleRemove = (id: number) => {
    setProducts(prev => prev.filter(p => p.item_id !== id));
  };

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-500 mb-8">Items you've saved for later</p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="rounded-3xl bg-gray-100 animate-pulse h-72" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🤍</p>
            <p className="text-xl font-medium">Your wishlist is empty</p>
            <p className="text-sm mt-2">Browse items and tap the heart to save them</p>
            <button
              onClick={() => router.push('/Home')}
              className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Browse Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.item_id}
                product={product}
                showWishlist={true}
                onWishlistRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default function WishlistPage() {
  return (
    <SessionProvider>
      <WishlistContent />
    </SessionProvider>
  );
}
