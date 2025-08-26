import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Crown, Diamond, Star, Award } from 'lucide-react';

const LuxeSignupPage: React.FC = () => {
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
    vipNewsletter: false,
    membershipType: 'gold'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('👑 كلمات المرور غير متطابقة');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('⚠️ يرجى الموافقة على شروط العضوية المميزة');
      return;
    }

    console.log('Luxe Signup submitted:', formData);
    alert('👑✨ مرحباً بك في النخبة! تم إنشاء عضويتك VIP بنجاح - استمتع بالامتيازات الحصرية 💎');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const membershipTypes = [
    { value: 'gold', label: '🥇 عضوية ذهبية - Gold', benefits: 'خصم 15% + توصيل مجاني' },
    { value: 'platinum', label: '🥈 عضوية بلاتينية - Platinum', benefits: 'خصم 25% + خدمات حصرية' },
    { value: 'diamond', label: '💎 عضوية ماسية - Diamond', benefits: 'خصم 35% + مستشار شخصي' },
    { value: 'royal', label: '👑 عضوية ملكية - Royal', benefits: 'خصم 50% + جميع الامتيازات' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900 relative overflow-hidden" dir="rtl">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-amber-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-yellow-500/30 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-amber-400/25 rounded-full animate-pulse delay-700"></div>
        
        {/* Luxury Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-16 grid-rows-16 h-full w-full">
            {Array.from({ length: 256 }).map((_, i) => (
              <div key={i} className="border border-amber-500/10"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md w-full">
            {/* Luxury Signup Box */}
            <div className="bg-black/80 backdrop-blur-lg border border-amber-500/30 rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <Diamond className="w-8 h-8 text-black" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                  انضم للنخبة المميزة
                </h2>
                <p className="text-gray-300">
                  اختر عضويتك واستمتع بالامتيازات الحصرية
                </p>
              </div>

              {/* Signup Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Membership Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    نوع العضوية المميزة
                  </label>
                  <select
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white"
                  >
                    {membershipTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-amber-300 mt-1">
                    {membershipTypes.find(t => t.value === formData.membershipType)?.benefits}
                  </p>
                </div>

                {/* Name Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400"
                      placeholder="أحمد"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-2">
                      اسم العائلة
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400"
                      placeholder="الملكي"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    البريد الإلكتروني الخاص
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 pl-12"
                      placeholder="vip@example.com"
                    />
                    <Mail className="w-5 h-5 text-amber-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    رقم الهاتف المباشر
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 pl-12"
                      placeholder="+966 50 123 4567"
                    />
                    <Phone className="w-5 h-5 text-amber-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Inputs */}
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
                      placeholder="كلمة مرور قوية ومعقدة"
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

                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 pl-12"
                      placeholder="أعد كتابة كلمة المرور"
                    />
                    <Lock className="w-5 h-5 text-amber-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Premium Benefits Display */}
                <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-3">
                    <Crown className="w-5 h-5 text-amber-400 ml-2" />
                    <span className="text-amber-200 font-semibold">امتيازات العضوية المختارة</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                    <div className="flex items-center">
                      <Diamond className="w-3 h-3 text-amber-400 ml-1" />
                      <span>خصومات حصرية</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 ml-1" />
                      <span>وصول مبكر للمنتجات</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-3 h-3 text-amber-400 ml-1" />
                      <span>خدمة عملاء مخصصة</span>
                    </div>
                    <div className="flex items-center">
                      <Crown className="w-3 h-3 text-yellow-400 ml-1" />
                      <span>فعاليات VIP حصرية</span>
                    </div>
                  </div>
                </div>

                {/* Premium Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 bg-gray-900 rounded mt-1"
                    />
                    <span className="mr-3 text-sm text-amber-200 leading-relaxed">
                      أوافق على{' '}
                      <button type="button" className="text-amber-400 hover:text-yellow-400">
                        شروط العضوية المميزة
                      </button>
                      {' '}و{' '}
                      <button type="button" className="text-amber-400 hover:text-yellow-400">
                        سياسة الخصوصية الفاخرة
                      </button>
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="vipNewsletter"
                      checked={formData.vipNewsletter}
                      onChange={handleChange}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 bg-gray-900 rounded"
                    />
                    <span className="mr-3 text-sm text-amber-200">
                      أرغب في تلقي النشرة الحصرية والعروض المميزة لأعضاء VIP
                    </span>
                  </label>
                </div>

                {/* Premium Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-black py-3 px-4 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center justify-center group shadow-xl font-bold"
                >
                  <Crown className="w-5 h-5 ml-2" />
                  <span>إنشاء عضوية VIP</span>
                  <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Exclusive Notice */}
                <div className="text-center">
                  <p className="text-xs text-gray-400 bg-gray-900/50 p-2 rounded-lg border border-amber-500/20">
                    ⚡ العضويات محدودة - انضم الآن للحصول على امتيازات حصرية
                  </p>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    لديك عضوية بالفعل؟{' '}
                    <button
                      type="button"
                      className="text-amber-400 hover:text-yellow-400 font-medium transition-colors"
                    >
                      الدخول المميز
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Premium Benefits */}
        <div className="hidden lg:block flex-1 relative">
          <div className="h-full flex flex-col items-center justify-center p-12 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/10 rounded-l-3xl"></div>
            
            <div className="relative z-10 max-w-md text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Diamond className="w-16 h-16 text-black animate-pulse" />
                </div>
                
                <div className="absolute -top-4 -right-4">
                  <Crown className="w-8 h-8 text-amber-400 animate-bounce" />
                </div>
                <div className="absolute -bottom-4 -left-4">
                  <Star className="w-6 h-6 text-yellow-400 animate-pulse delay-500" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-6">
                مرحباً بك في عالم النخبة
              </h3>
              
              <div className="space-y-4">
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-amber-500/30">
                  <Crown className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <h4 className="font-bold text-amber-200 mb-1">خدمة ملكية</h4>
                  <p className="text-xs text-gray-400">مستشار شخصي لكل عميل مميز</p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-yellow-500/30">
                  <Diamond className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <h4 className="font-bold text-amber-200 mb-1">منتجات حصرية</h4>
                  <p className="text-xs text-gray-400">مجموعات محدودة ونادرة</p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-amber-500/30">
                  <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <h4 className="font-bold text-amber-200 mb-1">ضمان مدى الحياة</h4>
                  <p className="text-xs text-gray-400">حماية كاملة لجميع مشترياتك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxeSignupPage;