'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setSuccess(true);
      
      // If email confirmation is disabled, redirect immediately
      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Check your email
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent you a confirmation link to <strong>{email}</strong>
            </p>
            <Link
              href="/auth/login"
              className="inline-block bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Go to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">RitePath</h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Create your account
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Start managing your funeral home with RitePath
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-600 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>

        <Link
          href="/"
          className="block text-sm text-gray-500 hover:text-gray-700 text-center mt-4"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

