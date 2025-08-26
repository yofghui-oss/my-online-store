import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowLeft, Calendar } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

const ToysSignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    childAge: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { currentStore } = useStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreeToTerms) {
      alert('Please agree to our safety rules');
      return;
    }
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce text-yellow-300">🎪</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse text-pink-300">🎨</div>
        <div className="absolute bottom-20 left-1/4 text-4xl animate-bounce delay-300 text-green-300">🎈</div>
        <div className="absolute top-1/3 left-20 text-5xl animate-pulse delay-150 text-orange-300">🚀</div>
        <div className="absolute bottom-32 right-1/4 text-4xl animate-bounce delay-500 text-blue-300">🧸</div>
        <div className="absolute top-40 right-1/3 text-3xl animate-spin-slow text-purple-300">⭐</div>
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

        {/* Signup Form */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-white/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/50">
              <span className="text-3xl">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Join the Fun!
            </h1>
            <p className="text-purple-100">Create your family account at {currentStore?.name || 'Toy Kingdom'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Parent Name Field */}
            <div>
              <label htmlFor="parentName" className="block text-sm font-bold text-white mb-2">
                Parent/Guardian Name 👨‍👩‍👧‍👦
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/70 font-medium"
                  placeholder="Enter parent's name"
                  required
                />
                <User className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
              </div>
            </div>

            {/* Child Name Field */}
            <div>
              <label htmlFor="childName" className="block text-sm font-bold text-white mb-2">
                Little Explorer's Name 🧒
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/70 font-medium"
                  placeholder="Enter child's name"
                  required
                />
                <span className="absolute left-4 top-3.5 text-white/70">👶</span>
              </div>
            </div>

            {/* Email and Child Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                  Email 📧
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-12 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/70 font-medium"
                    placeholder="your@email.com"
                    required
                  />
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
                </div>
              </div>

              <div>
                <label htmlFor="childAge" className="block text-sm font-bold text-white mb-2">
                  Child's Age 🎂
                </label>
                <select
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white font-medium"
                  required
                >
                  <option value="">Select</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-8">6-8 years</option>
                  <option value="9-12">9-12 years</option>
                  <option value="13+">13+ years</option>
                </select>
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-white mb-2">
                Phone Number 📱
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/70 font-medium"
                  placeholder="Enter phone number"
                  required
                />
                <Phone className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-white mb-2">
                  Password 🔐
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-12 pr-12 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/70 font-medium"
                    placeholder="Create password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-white mb-2">
                  Confirm 🔒
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-12 pr-12 bg-white/30 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/70 font-medium"
                    placeholder="Confirm password"
                    required
                  />
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-white/70 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 rounded border-white/30 bg-white/20 text-yellow-500 focus:ring-yellow-400"
                required
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-white font-medium">
                I agree to keep the fun safe! 🛡️{' '}
                <Link to="/terms" className="text-yellow-300 hover:text-yellow-200 transition-colors">
                  Safety Rules
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-yellow-300 hover:text-yellow-200 transition-colors">
                  Privacy Promise
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-purple-700 font-bold py-4 px-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 shadow-lg"
            >
              Start the Adventure! 🚀
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-white/90 font-medium">
              Already part of our kingdom? 🏰{' '}
              <Link to="/login" className="text-yellow-300 hover:text-yellow-200 font-bold transition-colors">
                Welcome back! 🎈
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/30"></div>
            <span className="px-4 text-white/70 text-sm font-medium">OR</span>
            <div className="flex-1 border-t border-white/30"></div>
          </div>

          {/* Social Signup */}
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
      </div>
    </div>
  );
};

export default ToysSignupPage;