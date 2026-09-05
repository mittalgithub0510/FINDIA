import React, { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { Mail, Lock, User, ArrowRight, ChevronLeft } from '../components/icons';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Demo ${activeTab === 'login' ? 'Login' : 'Sign Up'} submitted for ${email || 'user'}`);
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-high flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="max-w-md w-full glass-heavy p-8 rounded-3xl border border-white/15 shadow-lifted space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-text-low hover:text-amber-400 flex items-center gap-1 text-xs font-mono">
            <ChevronLeft size={14} />
            <span>Home</span>
          </Link>
          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
            UI DEMO ONLY
          </span>
        </div>

        {/* LOGO BRANDING */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" showTagline={true} />
          </div>
          <p className="text-xs text-text-mid pt-1">
            Access crowd telemetry & personalized itinerary saves
          </p>
        </div>

        {/* LOGIN / SIGNUP TAB SWITCHER */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-bg-raised border border-white/10 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'login'
                ? 'bg-amber-500 text-bg-base font-bold shadow'
                : 'text-text-mid hover:text-text-high'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'signup'
                ? 'bg-amber-500 text-bg-base font-bold shadow'
                : 'text-text-mid hover:text-text-high'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-text-low">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-low" />
                <input
                  type="text"
                  placeholder="Arjun Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-text-low">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-low" />
              <input
                type="email"
                placeholder="traveler@findia.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-text-low">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-low" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          {activeTab === 'login' && (
            <div className="flex items-center justify-between text-xs text-text-low">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded accent-amber-500" />
                <span>Remember me</span>
              </label>
              <button type="button" className="hover:text-amber-400 transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs transition-colors shadow-lifted mt-2 cursor-pointer"
          >
            <span>{activeTab === 'login' ? 'Sign In to FINDIA' : 'Create Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="space-y-3 pt-2">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-bg-raised px-3 text-[10px] uppercase font-mono text-text-low absolute">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => alert('Google auth integration pending backend pass')}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-text-high flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Apple auth integration pending backend pass')}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-text-high flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Apple ID</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
