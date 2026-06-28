'use client';

import PostItemForm from '../components/PostItemForm/PostItemForm';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar/Navbar';

export default function PostItemPage() {
  return (
    <SessionProvider>
      <Navbar />
      <PostItemForm />
    </SessionProvider>
  );
}