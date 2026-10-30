import React, { useState } from 'react';
import { Cake, Lock, Mail, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { dataProvider } from '@/services/dataProvider';
import { Link } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const res = await login(email, password);
    if (!res.success) {
      setError(res.error || 'Login failed');
    }
    setIsLoading(false);
  };

  const handleFillDemo = () => {
    setEmail('admin@cakesanddessert.in');
    setPassword('baker123');
  };

  return (
    <div className="min-h-screen bg-[#2F1916] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#D7BFAE]/30">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#4B2923] flex items-center justify-center text-[#E9AEBB] mx-auto mb-4 shadow-md">
            <Cake className="w-8 h-8" />
          </div>
          <h1 className="font-serif font-extrabold text-2xl text-[#4B2923]">
            Bakery Admin Portal
          </h1>
          <p className="text-xs text-[#8A554D] mt-1">
            Cakes &amp; Dessert Order &amp; Operations Management
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mt-3 bg-[#FFF7F0] text-[#4B2923] border border-[#D7BFAE]/50">
            <Database className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>Mode: {dataProvider.isCloud() ? 'Supabase PostgreSQL' : 'Local IndexedDB'}</span>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-xl mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A554D]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cakesanddessert.in"
                className="w-full pl-10 pr-3.5 py-3 text-xs bg-[#FFF7F0] border border-[#D7BFAE] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B2923]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A554D]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-3 text-xs bg-[#FFF7F0] border border-[#D7BFAE] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4B2923]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4B2923] text-white py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2F1916] transition-all shadow-md active:scale-98 mt-2"
          >
            {isLoading ? 'Verifying Credentials...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4 text-[#E9AEBB]" />
          </button>
        </form>

        {!dataProvider.isCloud() && (
          <div className="mt-6 pt-4 border-t border-[#D7BFAE]/30 text-center">
            <button
              onClick={handleFillDemo}
              className="text-xs text-[#8A554D] hover:text-[#4B2923] underline font-medium"
            >
              Fill Demo Admin Credentials (admin@cakesanddessert.in)
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-[#8A554D] hover:text-[#4B2923]">
            ← Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};

