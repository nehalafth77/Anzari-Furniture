import React, { useState } from 'react';
import { Armchair, Eye, EyeOff, Lock, Mail, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password to continue.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || 'Login failed. Please check your credentials.');
        return;
      }

      // Store token and user in sessionStorage for this session
      sessionStorage.setItem('anzari_token', data.token);
      sessionStorage.setItem('anzari_user', JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError('Cannot reach server. Please make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('admin@anzarifurniture.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex">
      {/* ── Left Panel: Decorative Branding ── */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-[#0E2B1C] overflow-hidden flex-col justify-between p-12">
        {/* Subtle geometric background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#18412F]/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#22563F]/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#B88349]/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Top: Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#22563F] flex items-center justify-center shadow-lg">
              <Armchair className="w-7 h-7 text-white stroke-[1.5]" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold tracking-widest text-white uppercase">
                ANZARI
              </div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-[#A7C7B7] font-medium">
                Furnitures
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Headline */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold text-[#A7C7B7] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#B88349]" />
            Admin Management Console
          </div>

          <h2 className="font-serif text-5xl font-bold text-white leading-tight">
            Manage Your <br />
            <span className="text-[#A7C7B7]">Furniture Store</span><br />
            with Ease
          </h2>

          <p className="text-[#A7C7B7] text-base leading-relaxed max-w-sm font-light">
            A simple, powerful dashboard designed for furniture showroom administrators — no technical expertise required.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Product Catalog', 'Category Management', 'Live Statistics', 'Image Upload', 'INR Pricing'].map((f) => (
              <span
                key={f}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/8 border border-white/15 text-white/80"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Demo Credentials Note */}

      </div>

      {/* ── Right Panel: Login Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-xl bg-[#18412F] flex items-center justify-center shadow-md">
            <Armchair className="w-6 h-6 text-white stroke-[1.5]" />
          </div>
          <div>
            <div className="font-serif text-2xl font-bold tracking-widest text-[#191816] uppercase">
              ANZARI
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#8C8275] font-medium">
              Furnitures
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#191816]">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-[#4F4B45] mt-2">
              Sign in to manage your furniture catalog and store.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 leading-snug">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Field */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-bold text-[#191816] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8C8275] pointer-events-none w-[18px] h-[18px]" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-2xl text-base text-[#191816] placeholder-[#8C8275] focus:outline-none focus:bg-white focus:border-[#18412F] focus:ring-2 focus:ring-[#18412F]/15 transition-all touch-target-lg"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-bold text-[#191816] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none w-[18px] h-[18px] text-[#8C8275]" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 bg-[#F9F7F2] border border-[#EAE4D9] rounded-2xl text-base text-[#191816] placeholder-[#8C8275] focus:outline-none focus:bg-white focus:border-[#18412F] focus:ring-2 focus:ring-[#18412F]/15 transition-all touch-target-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#8C8275] hover:text-[#191816] hover:bg-[#EAE4D9] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                  ) : (
                    <Eye className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-[#18412F] hover:bg-[#123324] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#18412F]/20 transition-all active:scale-[0.98] touch-target-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Signing In…</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Page</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#EAE4D9]" />
            <span className="text-xs font-semibold text-[#8C8275] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#EAE4D9]" />
          </div>



          {/* Hint text */}
          <p className="text-center text-xs text-[#8C8275] mt-8 leading-relaxed">
            This is a secure administration panel for{' '}
            <span className="font-semibold text-[#4F4B45]">Anzari Furnitures</span>.<br />
            Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
