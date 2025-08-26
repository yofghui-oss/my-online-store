import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, Cpu } from 'lucide-react';

const TechLoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    alert('🚀 تم تسجيل الدخول بنجاح! أهلاً بك في عالم التكنولوجيا');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden" dir="rtl">
      {/* Tech Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-500/20 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-24 h-24 border-2 border-cyan-500/30 rounded-lg rotate-12 animate-spin slow-spin"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border-2 border-blue-400/25 rounded-lg -rotate-12 animate-pulse delay-300"></div>
        
        {/* Circuit Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        </div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {/* Tech Login Box */}
            <div className="bg-gray-800/90 backdrop-blur-lg border border-blue-500/30 rounded-xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  دخول النظام
                </h2>
                <p className="text-gray-300">
                  ادخل إلى لوحة التحكم التقنية
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 pl-12"
                      placeholder="admin@tech-store.sa"
                    />
                    <Mail className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 pl-12"
                      placeholder="••••••••"
                    />
                    <Lock className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
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
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                    />
                    <span className="mr-2 text-sm text-gray-300">حفظ بيانات الدخول</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-cyan-400 transition-colors"
                  >
                    استرداد كلمة المرور؟
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center justify-center group shadow-lg"
                >
                  <span className="ml-2">تسجيل الدخول</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">أو</span>
                  </div>
                </div>

                {/* Tech Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors bg-gray-700/30"
                  >
                    <span className="text-sm text-blue-400">GitHub</span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors bg-gray-700/30"
                  >
                    <span className="text-sm text-blue-400">Microsoft</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    ليس لديك حساب؟{' '}
                    <button
                      type="button"
                      className="text-blue-400 hover:text-cyan-400 font-medium transition-colors"
                    >
                      إنشاء حساب تقني
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Tech Branding */}
        <div className="hidden lg:block flex-1 relative">
          <div className="h-full flex flex-col items-center justify-center p-12 relative">
            {/* Tech Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-l-3xl"></div>
            
            <div className="relative z-10 max-w-md text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Cpu className="w-16 h-16 text-white" />
                </div>
                
                {/* Floating Tech Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                مرحباً بك في المستقبل
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                ادخل إلى عالم التكنولوجيا المتقدمة واستمتع بتجربة تسوق ذكية ومبتكرة مع أحدث الأجهزة والتقنيات.
              </p>
              
              {/* Tech Features */}
              <div className="space-y-3 text-left">
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full ml-3 animate-pulse"></div>
                  <span>أحدث التقنيات والأجهزة</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full ml-3 animate-pulse delay-200"></div>
                  <span>دعم فني متخصص 24/7</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full ml-3 animate-pulse delay-400"></div>
                  <span>ضمان شامل على جميع المنتجات</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechLoginPage;