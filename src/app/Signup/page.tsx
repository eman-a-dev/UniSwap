'use client';

import Signin from '../components/Signup/Signup';
import { SessionProvider } from 'next-auth/react';

export default function SignupPage() {
  return (
    <SessionProvider>
      <Signin />
    </SessionProvider>
  );
}