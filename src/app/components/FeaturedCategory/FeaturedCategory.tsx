'use client';

import React from 'react';
import Link from 'next/link';

const cards = [
  {
    title: 'Books',
    slug: 'books',
    description: 'Explore a world of knowledge and stories.',
    image: '/images/frame44-removebg-preview.png',
  },
  {
    title: 'Gadgets',
    slug: 'gadgets',
    description: 'Stay updated with the latest tech.',
    image: '/images/frame_5-removebg-preview.png',
  },
  {
    title: 'Design Tools',
    slug: 'design-tools',
    description: 'Power up your creativity and visuals.',
    image: '/images/frame_88-removebg-preview.png',
  },
  {
    title: 'Academic Essentials',
    slug: 'academic',
    description: 'All must-have supplies in one place.',
    image: '/images/frame_8-removebg-preview.png',
  },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="px-6 py-12 w-full mx-auto min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Featured Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
        {cards.map((card, index) => {
          // Title ko URL slug me convert karna - lowercase aur spaces hyphen se replace
          const categorySlug = card.title.toLowerCase().replace(/\s+/g, '-');

          return (
            <Link
              href={`/categoryPages/${card.slug}`} // ✅ Fixed this line
              key={index}
              className="flex flex-row justify-between items-center w-full max-w-[550px] mx-auto backdrop-blur-lg bg-white border border-rose-200/20 shadow-rose-300/30 rounded-4xl shadow-xl pl-6 text-gray-800 overflow-hidden no-underline hover:bg-gray-100 transition"
            >
              {/* Left Side - Text + Button */}
              <div className="flex-1 pr-4">
                <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
                <p className="text-sm text-gray-700 mb-6">{card.description}</p>
                <button className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-pink-300 transition text-sm font-medium text-gray-900">
                  Learn More
                </button>
              </div>

              {/* Right Side - Image */}
              <div className="flex-shrink-0 max-w-[350px]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCategories;
