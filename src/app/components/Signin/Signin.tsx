'use client';

import React, { useState, FormEvent } from 'react';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [full_name, setfull_name] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ full_name, email, password, confirmpassword }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      router.push('/Home'); // redirect to Home after signup
    } else {
      const errorData = await res.json();
      console.error('Signup failed:', errorData.message || errorData);
      alert('Signup failed: ' + (errorData.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md overflow-hidden">
        <h2 className="text-2xl font-bold text-center text-white bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 py-3 rounded-md mb-6">
          Sign In
        </h2>

        <div className="p-8">
          <button
            onClick={() => signIn('google')}
            className="flex items-center justify-center gap-2 border px-4 py-2 rounded-md w-full"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>

          <div className="flex items-center justify-between my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={full_name}
                onChange={(e) => setfull_name(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmpassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>

          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <Link href="/Login" className="text-[#FA902D]">
              Already Have an account? Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
