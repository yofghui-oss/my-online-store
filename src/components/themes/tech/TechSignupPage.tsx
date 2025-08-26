import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Zap, Shield, Cpu } from 'lucide-react';

const TechSignupPage: React.FC = () => {
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
    userType: 'individual'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('🔒 كلمات المرور غير متطابقة');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('⚠️ يرجى الموافقة على شروط الاستخدام التقنية');
      return;
    }

    console.log('Tech Signup submitted:', formData);
    alert('🚀 مرحباً بك في عالم التكنولوجيا! تم إنشاء حسابك التقني بنجاح');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden" dir="rtl">
      {/* Tech Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-blue-500/20 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-cyan-500/30 rounded-lg rotate-12 animate-spin slow-spin"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-blue-400/25 rounded-lg -rotate-12 animate-pulse delay-300"></div>
        
        {/* Circuit Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-blue-500/20"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md w-full">
            {/* Tech Signup Box */}
            <div className="bg-gray-800/90 backdrop-blur-lg border border-blue-500/30 rounded-xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  انضم للمجتمع التقني
                </h2>
                <p className="text-gray-300">
                  أنشئ حسابك وادخل عالم التكنولوجيا المتقدم
                </p>
              </div>

              {/* Signup Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    نوع الحساب
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                  >
                    <option value="individual">فردي - مستهلك عادي</option>
                    <option value="developer">مطور - مطور برمجيات</option>
                    <option value="business">تجاري - شركة أو مؤسسة</option>
                    <option value="student">طالب - طالب تقنية</option>
                  </select>
                </div>

                {/* Name Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                      placeholder="أحمد"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      اسم العائلة
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                      placeholder="السالم"
                    />
                  </div>
                </div>

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
                      placeholder="ahmed@example.com"
                    />
                    <Mail className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 pl-12"
                      placeholder="+966 50 123 4567"
                    />
                    <Phone className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Inputs */}
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
                      placeholder="كلمة مرور قوية"
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

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 pl-12"
                      placeholder="أعد كتابة كلمة المرور"
                    />
                    <Lock className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded mt-1"
                    />
                    <span className="mr-3 text-sm text-gray-300 leading-relaxed">
                      أوافق على{' '}
                      <button type="button" className="text-blue-400 hover:text-cyan-400">
                        شروط الاستخدام التقني
                      </button>
                      {' '}و{' '}
                      <button type="button" className="text-blue-400 hover:text-cyan-400">
                        سياسة حماية البيانات
                      </button>
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                    />
                    <span className="mr-3 text-sm text-gray-300">
                      أرغب في تلقي أحدث الأخبار التقنية والعروض الحصرية
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center justify-center group shadow-lg"
                >
                  <span className="ml-2">إنشاء حساب تقني</span>
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

                {/* Tech Social Signup */}
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

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    لديك حساب بالفعل؟{' '}
                    <button
                      type="button"
                      className="text-blue-400 hover:text-cyan-400 font-medium transition-colors"
                    >
                      تسجيل الدخول
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Tech Benefits */}
        <div className="hidden lg:block flex-1 relative">
          <div className="h-full flex flex-col items-center justify-center p-12 relative">
            {/* Tech Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-l-3xl"></div>
            
            <div className="relative z-10 max-w-md text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Cpu className="w-16 h-16 text-white animate-pulse" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                مستقبل التكنولوجيا ينتظرك
              </h3>
              
              {/* Benefits List */}
              <div className="space-y-4 text-right">
                <div className="flex items-center bg-gray-800/50 p-3 rounded-lg border border-blue-500/20">
                  <Zap className="w-5 h-5 text-blue-400 ml-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">أحدث التقنيات</div>
                    <div className="text-xs text-gray-400">أجهزة ذكية ومتطورة</div>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-800/50 p-3 rounded-lg border border-cyan-500/20">
                  <Shield className="w-5 h-5 text-cyan-400 ml-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">حماية متقدمة</div>
                    <div className="text-xs text-gray-400">أمان وخصوصية عالية</div>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-800/50 p-3 rounded-lg border border-blue-500/20">
                  <User className="w-5 h-5 text-blue-400 ml-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">دعم متخصص</div>
                    <div className="text-xs text-gray-400">فريق تقني محترف</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSignupPage;