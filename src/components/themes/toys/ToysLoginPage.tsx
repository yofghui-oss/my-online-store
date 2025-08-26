import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

const ToysLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { currentStore } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce text-yellow-300">⭐</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse text-pink-300">🎈</div>
        <div className="absolute bottom-20 left-1/4 text-4xl animate-bounce delay-300 text-green-300">🎨</div>
        <div className="absolute top-1/3 left-20 text-5xl animate-pulse delay-150 text-orange-300">🧸</div>
        <div className="absolute bottom-32 right-1/4 text-4xl animate-bounce delay-500 text-blue-300">🎮</div>
        <div className="absolute top-40 right-1/3 text-3xl animate-spin-slow text-purple-300">🎪</div>
        <div className="absolute bottom-40 left-1/3 text-4xl animate-pulse delay-700 text-red-300">🚀</div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back to Store */}
        <Link 
          to="/" 
          className="inline-flex items-center text-white hover:text-yellow-300 mb-8 transition-colors bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Toy Kingdom
        </Link>

        {/* Login Form */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-white/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/50">
              <span className="text-3xl">🎈</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-purple-100">Ready for more fun at {currentStore?.name || 'Toy Kingdom'}?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                Parent's Email 📧
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/70 font-medium"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-white mb-2">
                Secret Password 🔐
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-12 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/70 font-medium"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/30 bg-white/20 text-yellow-500 focus:ring-yellow-400"
                />
                <span className="ml-2 text-sm text-white font-medium">Remember me 🎯</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-yellow-300 hover:text-yellow-200 transition-colors font-medium">
                Forgot password? 🤔
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-purple-700 font-bold py-4 px-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 shadow-lg"
            >
              Let's Play! 🎮
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-white/90 font-medium">
              New to our toy kingdom? 🏰{' '}
              <Link to="/signup" className="text-yellow-300 hover:text-yellow-200 font-bold transition-colors">
                Join the fun here! 🎉
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/30"></div>
            <span className="px-4 text-white/70 text-sm font-medium">OR</span>
            <div className="flex-1 border-t border-white/30"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 border-2 border-white/30 flex items-center justify-center space-x-2">
              <span>🔍</span>
              <span>Continue with Google</span>
            </button>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 border-2 border-white/30 flex items-center justify-center space-x-2">
              <span>🍎</span>
              <span>Continue with Apple</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm font-medium">
            By playing with us, you agree to keep the fun safe! 🛡️{' '}
            <Link to="/terms" className="text-yellow-300 hover:text-yellow-200 transition-colors">
              Safety Rules
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-yellow-300 hover:text-yellow-200 transition-colors">
              Privacy Promise
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToysLoginPage;