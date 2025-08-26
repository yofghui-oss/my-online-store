import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Sparkles, Star, Heart } from 'lucide-react';

const ModernSignupPage: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: false,
    interests: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('🔒 كلمات المرور غير متطابقة');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('⚠️ يرجى الموافقة على الشروط والأحكام');
      return;
    }

    console.log('Modern Signup submitted:', formData);
    alert('✨ أهلاً وسهلاً! تم إنشاء حسابك بنجاح - مرحباً بك في عالم الأناقة العصرية');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const interests = [
    { value: 'fashion', label: '👗 الموضة والأزياء' },
    { value: 'tech', label: '📱 التكنولوجيا' },
    { value: 'beauty', label: '💄 الجمال والعناية' },
    { value: 'lifestyle', label: '🏠 نمط الحياة' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden" dir="rtl">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* Floating Sparkles */}
        <div className="absolute top-10 right-10">
          <Sparkles className="w-6 h-6 text-purple-400 animate-spin slow-spin" />
        </div>
        <div className="absolute bottom-20 left-20">
          <Star className="w-5 h-5 text-pink-400 animate-pulse" />
        </div>
        <div className="absolute top-1/3 right-1/4">
          <Heart className="w-4 h-4 text-indigo-400 animate-pulse delay-300" />
        </div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md w-full">
            {/* Modern Signup Box */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  انضم إلينا
                </h2>
                <p className="text-white/70">
                  ابدأ رحلتك في عالم الأناقة العصرية
                </p>
              </div>

              {/* Signup Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 backdrop-blur-sm"
                      placeholder="أحمد"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      اسم العائلة
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 backdrop-blur-sm"
                      placeholder="السالم"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 pl-12 backdrop-blur-sm"
                      placeholder="ahmed@example.com"
                    />
                    <Mail className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 pl-12 backdrop-blur-sm"
                      placeholder="+966 50 123 4567"
                    />
                    <Phone className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Inputs */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 pl-12 backdrop-blur-sm"
                      placeholder="اختر كلمة مرور قوية"
                    />
                    <Lock className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 pl-12 backdrop-blur-sm"
                      placeholder="أعد كتابة كلمة المرور"
                    />
                    <Lock className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-purple-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    اهتماماتك المفضلة
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map((interest) => (
                      <label key={interest.value} className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-white/30 bg-white/10 rounded"
                        />
                        <span className="mr-2 text-xs text-white/80">{interest.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Terms & Newsletter */}
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-white/30 bg-white/10 rounded mt-1"
                    />
                    <span className="mr-3 text-sm text-white/80 leading-relaxed">
                      أوافق على{' '}
                      <button type="button" className="text-purple-400 hover:text-pink-400">
                        الشروط والأحكام
                      </button>
                      {' '}و{' '}
                      <button type="button" className="text-purple-400 hover:text-pink-400">
                        سياسة الخصوصية
                      </button>
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-white/30 bg-white/10 rounded"
                    />
                    <span className="mr-3 text-sm text-white/80">
                      أرغب في تلقي النشرة الإخبارية والعروض الحصرية
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center group shadow-xl"
                >
                  <span className="ml-2">إنشاء الحساب</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/10 text-white/70 rounded-lg backdrop-blur-sm">أو</span>
                  </div>
                </div>

                {/* Social Signup */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    <span className="text-sm text-white/80">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    <span className="text-sm text-white/80">Facebook</span>
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-white/70">
                    لديك حساب بالفعل؟{' '}
                    <button
                      type="button"
                      className="text-purple-400 hover:text-pink-400 font-medium transition-colors"
                    >
                      تسجيل الدخول
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Modern Benefits */}
        <div className="hidden lg:block flex-1 relative">
          <div className="h-full flex flex-col items-center justify-center p-12 relative">
            {/* Modern Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-l-3xl backdrop-blur-sm"></div>
            
            <div className="relative z-10 max-w-md text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                  <Heart className="w-16 h-16 text-white animate-pulse" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4">
                  <Sparkles className="w-8 h-8 text-pink-400 animate-bounce" />
                </div>
                <div className="absolute -bottom-4 -left-4">
                  <Star className="w-6 h-6 text-indigo-400 animate-pulse delay-500" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                عالم من الأناقة ينتظرك
              </h3>
              
              {/* Benefits Grid */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-right">
                  <div className="flex items-center justify-between mb-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h4 className="font-semibold text-white">أحدث الصيحات</h4>
                  </div>
                  <p className="text-sm text-white/70">اكتشف أحدث صيحات الموضة والأناقة</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-right">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-5 h-5 text-pink-400" />
                    <h4 className="font-semibold text-white">جودة مميزة</h4>
                  </div>
                  <p className="text-sm text-white/70">منتجات عالية الجودة بأفضل الأسعار</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-right">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-5 h-5 text-indigo-400" />
                    <h4 className="font-semibold text-white">تجربة شخصية</h4>
                  </div>
                  <p className="text-sm text-white/70">توصيات شخصية تناسب ذوقك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSignupPage;