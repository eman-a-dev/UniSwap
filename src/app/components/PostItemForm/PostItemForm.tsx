// components/PostItemForm.tsx
"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function PostItemForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    pricing: "free",
    price: "",
    fullName: "",
    phone: "",
    email: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // Add API logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 my-28 rounded-md shadow-md space-y-6">
      <h2 className="text-xl font-bold text-white bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 px-4 py-2 rounded">Item Details</h2>

      {/* Image Upload */}
<label htmlFor="image-upload" className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center rounded cursor-pointer">
  <Upload className="w-8 h-8 text-gray-500" />
  <p className="mt-2 text-gray-600">Click to upload image</p>
  <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
</label>
<input type="file" onChange={handleImageChange} className="hidden" id="image-upload" />


      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter item title" required className="w-full px-3 py-2 border border-gray-300 rounded" />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your item in detail" required className="w-full px-3 py-2 border border-gray-300  rounded" />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category *</label>
        <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300  rounded">
          <option value="">Select a category</option>
          <option value="books">Books</option>
          <option value="academic">Academic Essentials</option>
          <option value="gadgets">E-Gadgets</option>
          <option value="design">Design Tools</option>
        </select>
      </div>

      {/* Pricing */}
<div>
  <label className="block text-sm font-medium mb-1">Pricing</label>
  <div className="flex space-x-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="pricing"
        value="free"
        checked={formData.pricing === "free"}
        onChange={handleChange}
      />
      <span className="ml-2">Free</span>
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="pricing"
        value="paid"
        checked={formData.pricing === "paid"}
        onChange={handleChange}
      />
      <span className="ml-2">Paid</span>
    </label>
  </div>

  {/* Conditionally show price input field */}
  {formData.pricing === "paid" && (
    <div className="mt-3">
      <label className="block text-sm font-medium mb-1">Enter Price (PKR)</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="e.g. 500"
        required={formData.pricing === "paid"}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  )}
</div>


      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" className="w-full px-3 py-2 border border-gray-300  rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" className="w-full px-3 py-2 border border-gray-300  rounded" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email address" required className="w-full px-3 py-2 border border-gray-300  rounded" />
        </div>
      </div>

      <button type="submit" className="w-full py-3 bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 text-white rounded font-semibold hover:opacity-90">
        Post Item
      </button>
    </form>
  );
}


