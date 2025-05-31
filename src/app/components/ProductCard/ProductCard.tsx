'use client';
import React from 'react';
import Link from 'next/link';

export default function ProductCard() {
  const products = [
    {
      image: "/images/The series consists of four books, each book….jpg",
      title: "HydroSync Pro Bottle",
      description: "Smart bottle with hydration reminders and Bluetooth connectivity.",
      price: 137,
    },
    {
      image: "/images/academic essentials.jpg",
      title: "ThermoSteel Flask",
      description: "Keeps your drinks hot or cold for 24 hours with double insulation.",
      price: 89,
    },
    {
      image: "/images/Daisy Brown.jpg",
      title: "EcoSip Water Bottle",
      description: "Made from eco-friendly materials, perfect for daily use and travel.",
      price: 59,
    },
    {
      image: "/images/Daisy Brown.jpg",
      title: "EcoSip Water Bottle",
      description: "Made from eco-friendly materials, perfect for daily use and travel.",
      price: 59,
    },
    {
      image: "/images/Daisy Brown.jpg",
      title: "EcoSip Water Bottle",
      description: "Made from eco-friendly materials, perfect for daily use and travel.",
      price: 59,
    },
    {
      image: "/images/Daisy Brown.jpg",
      title: "EcoSip Water Bottle",
      description: "Made from eco-friendly materials, perfect for daily use and travel.",
      price: 59,
    },
    {
      image: "/images/Daisy Brown.jpg",
      title: "EcoSip Water Bottle",
      description: "Made from eco-friendly materials, perfect for daily use and travel.",
      price: 59,
    },
    {
      image: "/images/Daisy Brown.jpg",
      title: "EcoSip Water Bottle",
      description: "Made from eco-friendly materials, perfect for daily use and travel.",
      price: 59,
    },
  ];

  return (
    <>
    <h1 className="text-3xl font-bold text-center my-8">Featured Products</h1>
    <div className="w-full flex justify-center px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center max-w-5xl w-full">
        {products.map((product, idx) => (
          <Link
            key={idx}
            href={{
              pathname: '/ProductDetail',
              query: {
                title: product.title,
                image: product.image,
                description: product.description,
                price: product.price.toString(),
              },
            }}
            className="w-full max-w-sm rounded-3xl bg-white shadow-lg p-4 space-y-4 hover:scale-[1.02] transition-all"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />
              <button className="absolute top-2 right-2 rounded-full bg-white p-3 shadow text-gray-400 hover:text-red-400 transition">
                🤍
              </button>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>

            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-gray-800">${product.price}</span>
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full transition">
                🛒 Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
