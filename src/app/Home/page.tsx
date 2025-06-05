'use client';

import Hero from '../components/Hero/Hero';
import FeaturedCategory from '../components/FeaturedCategory/FeaturedCategory';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { SessionProvider } from 'next-auth/react';


export default function Home() {
  return (
    <SessionProvider> 
      <Navbar />
      <Hero />
      <FeaturedCategory />
      <FeaturedProducts />
      <Footer />
    </SessionProvider>
  );
}