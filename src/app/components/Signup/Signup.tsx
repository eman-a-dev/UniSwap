'use client';

import React, { useState, FormEvent } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Signin() {
  const [full_name, setFull_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmpassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password, confirmpassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.ok) router.push('/Home');
      else router.push('/Login');
    } else {
      setError(data.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md overflow-hidden">
        <h2 className="text-2xl font-bold text-center text-white bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 py-3 rounded-md mb-6">
          Create Account
        </h2>

        <div className="p-8">
          <button
            onClick={() => signIn('google', { callbackUrl: '/Home' })}
            className="flex items-center justify-center gap-2 border px-4 py-2 rounded-md w-full hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-lg text-red-500" />
            Continue with Google
          </button>

          <div className="flex items-center justify-between my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={full_name}
                onChange={e => setFull_name(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="At least 6 characters"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmpassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Repeat your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            <Link href="/Login" className="text-[#FA902D] hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
