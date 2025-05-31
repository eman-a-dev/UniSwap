'use client';

import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {

  return (
    <section className="w-full min-h-screen flex items-center justify-center top-0 px-6 relative overflow-hidden bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 pt-32">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl z-10">
        
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow">
            Don't Let It Dust. <br />
            <span className="text-white">Swap. Share. Save.</span>
          </h1>
          <p className="text-white/80 text-lg">
            UniSwap helps students exchange semester-specific tools, books & electronics with ease. Free or paid — you decide.
          </p>
          <Link href="/Signin">
          <button
            className="mt-4 px-6 py-3 bg-pink-700 text-white font-semibold rounded-full hover:bg-white hover:text-[#FA902D] transition-all duration-300 shadow-lg"
          >
            Get Started
          </button>
          </Link>
          
        </div>

        {/* Right Side - Image */}
        <div className="md:w-[550px] mt-10 md:mt-0 flex justify-center">
          <img
            src="/images/heroimg.png"
            alt="Hero"
            className="w-full object-contain drop-shadow-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
