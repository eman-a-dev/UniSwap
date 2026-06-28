'use client';

import { useSession, SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';
import { Trash2, CheckCircle } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  reserved: 'bg-yellow-100 text-yellow-700',
  sold: 'bg-gray-200 text-gray-500',
};

const LISTING_TYPE_COLORS: Record<string, string> = {
  sell: 'bg-orange-100 text-orange-700',
  exchange: 'bg-blue-100 text-blue-700',
  borrow: 'bg-purple-100 text-purple-700',
};

function MyListingsContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/Login');
  }, [status]);

  const fetchListings = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/mylistings?email=${encodeURIComponent(session.user.email)}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) fetchListings();
  }, [session]);

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setItems(prev => prev.map(item => item.item_id === id ? { ...item, status: newStatus } : item));
    setUpdatingId(null);
  };

  const deleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    if (!session?.user?.email) return;
    setUpdatingId(id);
    await fetch(`/api/products/${id}?email=${encodeURIComponent(session.user.email)}`, { method: 'DELETE' });
    setItems(prev => prev.filter(item => item.item_id !== id));
    setUpdatingId(null);
  };

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">My Listings</h1>
          <Link href="/PostItem">
            <button className="px-5 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition text-sm font-medium">
              + Post New Item
            </button>
          </Link>
        </div>
        <p className="text-gray-500 mb-8">Manage your posted items</p>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-2xl" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-xl font-medium">No listings yet</p>
            <p className="text-sm mt-2">Post your first item to get started</p>
            <Link href="/PostItem">
              <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                Post an Item
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.item_id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center">
                <img
                  src={item.image_url || '/images/heroimg.png'}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link href={`/productdetails/${item.item_id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-orange-500 transition truncate">{item.title}</h3>
                  </Link>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LISTING_TYPE_COLORS[item.listing_type] || 'bg-gray-100 text-gray-500'}`}>
                      {item.listing_type || 'sell'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[item.status] || 'bg-gray-100 text-gray-500'}`}>
                      {item.status || 'available'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.price_type === 'free' ? 'Free' : `PKR ${item.price}`}
                    </span>
                  </div>
                </div>

                {/* Status Controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <select
                    value={item.status || 'available'}
                    onChange={e => updateStatus(item.item_id, e.target.value)}
                    disabled={updatingId === item.item_id}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                  <button
                    onClick={() => deleteItem(item.item_id)}
                    disabled={updatingId === item.item_id}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    title="Delete listing"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default function MyListingsPage() {
  return (
    <SessionProvider>
      <MyListingsContent />
    </SessionProvider>
  );
}
