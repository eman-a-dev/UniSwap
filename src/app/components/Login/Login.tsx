'use client';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      router.push('/Home');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md overflow-hidden">
        <h3 className="text-xl font-semibold text-white bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 py-3 text-center mb-2">Login</h3>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">Welcome Back</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Login to your account</p>

          <button
            onClick={() => signIn('google', { callbackUrl: '/Home' })}
            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-100 w-full"
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

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#FA902D] via-[#fd753f] to-pink-700 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <Link href="/Signup" className="text-[#FA902D] hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
