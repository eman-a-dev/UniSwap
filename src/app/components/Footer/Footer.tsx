'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center border-b border-white/30">
        <div className="flex items-center space-x-2">
           <span className="text-xl font-semibold">UniSwap</span>
        </div>
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <a href="/Home" className="hover:underline">Home</a>
          <a href="/PostItemForm" className="hover:underline">PostItem</a>
           <a href="/Login" className="hover:underline">LogIn</a>
        </nav>
        <div className="mt-4 md:mt-0">
          <a href="mailto:info@company.com" className="hover:underline">info@UniSwap.com</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2025 UniSwap™. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
