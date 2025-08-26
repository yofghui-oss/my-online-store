import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Terminal, Code } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

const SoftwareLoginPage: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBkOWZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-cyan-400 font-mono text-sm opacity-60 animate-pulse">
          {'{ }'}
        </div>
        <div className="absolute top-40 right-20 text-blue-400 font-mono text-lg opacity-50 animate-bounce">
          &lt;/&gt;
        </div>
        <div className="absolute bottom-32 left-1/4 text-green-400 font-mono text-xs opacity-70 animate-pulse delay-300">
          console.log('hello');
        </div>
        <div className="absolute top-60 left-1/3 text-purple-400 font-mono text-sm opacity-60 animate-bounce delay-150">
          npm install
        </div>
        <div className="absolute bottom-20 right-1/4 text-orange-400 font-mono text-sm opacity-50 animate-pulse delay-500">
          git commit -m
        </div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back to Store */}
        <Link 
          to="/" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Platform
        </Link>

        {/* Login Form */}
        <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Developer Access</h1>
            <p className="text-gray-400">Sign in to {currentStore?.name || 'Software Platform'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="developer@example.com"
                  required
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-10 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-400"
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
                  className="rounded border-gray-600 bg-gray-900/50 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="ml-2 text-sm text-gray-300">Remember session</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                Reset password
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Initialize Session
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Need developer access?{' '}
              <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Request account
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-gray-900/50 hover:bg-gray-900/70 text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors duration-200 border border-gray-700 flex items-center justify-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
            <button className="w-full bg-gray-900/50 hover:bg-gray-900/70 text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors duration-200 border border-gray-700">
              Continue with GitLab
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            By accessing the platform, you agree to our{' '}
            <Link to="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Developer Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoftwareLoginPage;