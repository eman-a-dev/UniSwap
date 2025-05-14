'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const squareRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      squareRef.current,
      { y: -200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'bounce.out' }
    );
    gsap.fromTo(
      triangleRef.current,
      { y: -200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'bounce.out' }
    );
    gsap.fromTo(
      circleRef.current,
      { y: -200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'bounce.out' }
    );
  }, []);

  return (
    <section className="w-full min-h-screen flex items-center justify-center top-0 px-6 relative overflow-hidden bg-gradient-to-br from-purple-800 via-white to-pink-500 pt-32">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl z-10">
        
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-800 drop-shadow">
            Dont Let It Dust. <br />
            <span className="text-purple-400">Swap. Share. Save.</span>
          </h1>
          <p className="text-gray/80 text-lg">
            UniSwap helps students exchange semester-specific tools, books & electronics with ease. Free or paid — you decide.
          </p>
          <button className="mt-4 px-6 py-3 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-600 transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </div>

        {/* Right Side - Animated Shapes */}
        <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center items-center gap-6 z-10">
          <div ref={squareRef} className="w-20 h-20 bg-blue-500"></div>
          <div
            ref={triangleRef}
            className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-l-transparent border-r-transparent border-b-red-500"
          ></div>
          <div ref={circleRef} className="w-20 h-20 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


