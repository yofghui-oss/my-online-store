import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Crown, Diamond, Star } from 'lucide-react';

const LuxeLoginPage: React.FC = () => {
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
    alert('👑 أهلاً وسهلاً بعضو VIP! تم تسجيل الدخول بنجاح إلى عالم الرفاهية');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900 relative overflow-hidden" dir="rtl">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-amber-500/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-yellow-500/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-amber-400/25 rounded-full animate-pulse delay-700"></div>
        
        {/* Luxury Sparkle Effects */}
        <div className="absolute top-10 right-10">
          <Diamond className="w-6 h-6 text-amber-400 animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-20">
          <Star className="w-5 h-5 text-yellow-400 animate-pulse delay-500" />
        </div>
        <div className="absolute top-1/3 right-1/4">
          <Crown className="w-4 h-4 text-amber-300 animate-pulse delay-300" />
        </div>
        
        {/* Luxury Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-amber-500/20"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {/* Luxury Login Box */}
            <div className="bg-black/80 backdrop-blur-lg border border-amber-500/30 rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-8 h-8 text-black" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                  الدخول الملكي
                </h2>
                <p className="text-gray-300">
                  ادخل إلى عالم الرفاهية والتميز
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    البريد الإلكتروني المميز
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 pl-12"
                      placeholder="vip@luxury-store.com"
                    />
                    <Mail className="w-5 h-5 text-amber-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    كلمة المرور السرية
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 pl-12"
                      placeholder="••••••••"
                    />
                    <Lock className="w-5 h-5 text-amber-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
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
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 bg-gray-900 rounded"
                    />
                    <span className="mr-2 text-sm text-amber-200">حفظ البيانات</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-amber-400 hover:text-yellow-400 transition-colors"
                  >
                    استرداد كلمة المرور؟
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-black py-3 px-4 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center justify-center group shadow-xl font-bold"
                >
                  <Crown className="w-5 h-5 ml-2" />
                  <span>دخول VIP</span>
                  <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* VIP Services Notice */}
                <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Diamond className="w-5 h-5 text-amber-400 ml-2" />
                    <span className="text-amber-200 font-semibold">خدمات VIP حصرية</span>
                  </div>
                  <div className="text-center space-y-1 text-xs text-gray-300">
                    <div>• توصيل مجاني فوري</div>
                    <div>• خدمة عملاء شخصية</div>
                    <div>• وصول مبكر للمجموعات</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-amber-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-amber-400 font-medium">أو</span>
                  </div>
                </div>

                {/* Premium Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-colors bg-gray-900/30"
                  >
                    <span className="text-sm text-amber-300 font-medium">Premium Account</span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-colors bg-gray-900/30"
                  >
                    <span className="text-sm text-amber-300 font-medium">VIP Access</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    ليس لديك عضوية VIP؟{' '}
                    <button
                      type="button"
                      className="text-amber-400 hover:text-yellow-400 font-medium transition-colors"
                    >
                      انضم للنخبة الآن
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Luxury Branding */}
        <div className="hidden lg:block flex-1 relative">
          <div className="h-full flex flex-col items-center justify-center p-12 relative">
            {/* Luxury Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/10 rounded-l-3xl"></div>
            
            <div className="relative z-10 max-w-md text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Crown className="w-16 h-16 text-black animate-pulse" />
                </div>
                
                {/* Floating Luxury Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4">
                  <Diamond className="w-6 h-6 text-amber-400 animate-pulse delay-500" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-6">
                مرحباً بك في عالم الترف
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                استمتع بتجربة تسوق استثنائية مع مجموعتنا الحصرية من المنتجات الفاخرة والخدمات المميزة.
              </p>
              
              {/* Luxury Features */}
              <div className="space-y-4 text-right">
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-amber-500/20">
                  <div className="flex items-center justify-end mb-2">
                    <span className="text-amber-200 font-semibold">منتجات حصرية ومحدودة</span>
                    <Diamond className="w-5 h-5 text-amber-400 mr-3" />
                  </div>
                  <p className="text-xs text-gray-400 text-right">قطع فريدة من أرقى الماركات العالمية</p>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center justify-end mb-2">
                    <span className="text-amber-200 font-semibold">خدمة شخصية متميزة</span>
                    <Crown className="w-5 h-5 text-yellow-400 mr-3" />
                  </div>
                  <p className="text-xs text-gray-400 text-right">مستشار شخصي لكل عميل VIP</p>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-amber-500/20">
                  <div className="flex items-center justify-end mb-2">
                    <span className="text-amber-200 font-semibold">ضمان الجودة المطلقة</span>
                    <Star className="w-5 h-5 text-amber-400 mr-3" />
                  </div>
                  <p className="text-xs text-gray-400 text-right">ضمان مدى الحياة على جميع المنتجات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxeLoginPage;