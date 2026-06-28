"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PostItemForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    listing_type: "sell",
    pricing: "free",
    price: "",
    fullName: "",
    phone: "",
    email: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Login");
    }
    if (session?.user?.email) {
      setFormData(prev => ({ ...prev, email: session.user!.email! }));
    }
  }, [session, status]);

  useEffect(() => {
    if (formData.image) {
      const url = URL.createObjectURL(formData.image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [formData.image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    payload.append("listing_type", formData.listing_type);
    payload.append("pricing", formData.pricing);
    if (formData.pricing === "paid") payload.append("price", formData.price);
    payload.append("fullName", formData.fullName);
    payload.append("phone", formData.phone);
    payload.append("email", formData.email);
    if (formData.image) payload.append("image", formData.image);

    try {
      const res = await fetch("/api/auth/postitem", { method: "POST", body: payload });
      if (res.ok) {
        setSuccess(true);
        setFormData({
          title: "", description: "", category: "", listing_type: "sell",
          pricing: "free", price: "", fullName: "", phone: "",
          email: session?.user?.email || "", image: null,
        });
      } else {
        const err = await res.json();
        alert("Failed to post item: " + (err.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 my-28 rounded-md shadow-md space-y-6"
    >
      <h2 className="text-xl font-bold text-white bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 px-4 py-2 rounded">
        Post an Item
      </h2>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          ✅ Item posted successfully! <a href="/MyListings" className="underline font-medium">View your listings</a>
        </div>
      )}

      {/* Image Upload */}
      <label
        htmlFor="image-upload"
        className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center rounded cursor-pointer hover:border-orange-400 transition"
      >
        <Upload className="w-8 h-8 text-gray-500" />
        <p className="mt-2 text-gray-600">Click to upload image</p>
        <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-4 max-h-48 object-contain rounded" />
        )}
      </label>
      <input type="file" onChange={handleImageChange} className="hidden" id="image-upload" accept="image/png,image/jpeg" />

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange}
          placeholder="Enter item title" required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
          disabled={loading} />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea name="description" value={formData.description} onChange={handleChange}
          placeholder="Describe your item in detail" required rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
          disabled={loading} />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category *</label>
        <select name="category" value={formData.category} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 rounded" disabled={loading}>
          <option value="">Select a category</option>
          <option value="books">Books</option>
          <option value="academic">Academic Essentials</option>
          <option value="gadgets">E-Gadgets</option>
          <option value="design">Design Tools</option>
        </select>
      </div>

      {/* Listing Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Listing Type *</label>
        <div className="flex gap-4">
          {['sell', 'exchange', 'borrow'].map(type => (
            <label key={type} className={`flex-1 cursor-pointer border-2 rounded-lg p-3 text-center transition ${formData.listing_type === type ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
              <input type="radio" name="listing_type" value={type}
                checked={formData.listing_type === type} onChange={handleChange}
                className="hidden" disabled={loading} />
              <span className="font-medium capitalize">{type === 'sell' ? '🛒 Sell' : type === 'exchange' ? '🔄 Exchange' : '📦 Borrow'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pricing (only for sell) */}
      {formData.listing_type === 'sell' && (
        <div>
          <label className="block text-sm font-medium mb-1">Pricing</label>
          <div className="flex space-x-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="pricing" value="free"
                checked={formData.pricing === "free"} onChange={handleChange} disabled={loading} />
              <span>Free</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="pricing" value="paid"
                checked={formData.pricing === "paid"} onChange={handleChange} disabled={loading} />
              <span>Paid</span>
            </label>
          </div>
          {formData.pricing === "paid" && (
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Price (PKR)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange}
                placeholder="e.g. 500" required={formData.pricing === "paid"}
                className="w-full px-3 py-2 border rounded" disabled={loading} min={1} />
            </div>
          )}
        </div>
      )}

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
            placeholder="Your full name"
            className="w-full px-3 py-2 border border-gray-300 rounded" disabled={loading} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange}
            placeholder="e.g. 923001234567"
            className="w-full px-3 py-2 border border-gray-300 rounded" disabled={loading} />
          <p className="text-xs text-gray-400 mt-1">Include country code (e.g. 92 for Pakistan)</p>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="Your email address" required
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50" disabled={loading} />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 text-white rounded font-semibold hover:opacity-90 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Item"}
      </button>
    </form>
  );
}
