import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Zap, Phone, Mail, MapPin, Clock, Send, MessageCircle, 
  Heart, Users, Camera, Music, Gamepad2, Star, Rocket
} from 'lucide-react';

interface VibrantContactPageProps {
  storeName?: string;
}

const VibrantContactPage: React.FC<VibrantContactPageProps> = ({ 
  storeName = "ألوان الشباب" 
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('🎉 تم إرسال رسالتك بنجاح! سنقوم بالرد عليك قريباً بكل الحب والألوان!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      interest: 'general'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8 text-white" />,
      title: "كلمنا!",
      info: "+966 11 345 6789",
      subInfo: "نحب نسمع صوتكم",
      bgColor: "from-pink-500 to-rose-500",
      hoverColor: "hover:from-pink-600 hover:to-rose-600"
    },
    {
      icon: <Mail className="w-8 h-8 text-white" />,
      title: "راسلونا",
      info: "hello@vibrant-youth.sa",
      subInfo: "رسائل ملونة ومحبة",
      bgColor: "from-purple-500 to-indigo-500",
      hoverColor: "hover:from-purple-600 hover:to-indigo-600"
    },
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "تعالوا زورونا",
      info: "حي الملز، الرياض",
      subInfo: "في قلب الحي الشبابي",
      bgColor: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "أوقات المرح",
      info: "12:00 ظ - 12:00 ص",
      subInfo: "مفتوحين لكم دائماً",
      bgColor: "from-green-500 to-emerald-500",
      hoverColor: "hover:from-green-600 hover:to-emerald-600"
    }
  ];

  const interests = [
    { value: 'general', label: '💬 دردشة عامة' },
    { value: 'fashion', label: '👕 الموضة والأزياء' },
    { value: 'tech', label: '📱 التكنولوجيا والألعاب' },
    { value: 'music', label: '🎵 الموسيقى والفنون' },
    { value: 'sports', label: '⚽ الرياضة والأنشطة' },
    { value: 'collaboration', label: '🤝 التعاون والشراكات' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-25 animate-spin"></div>
          <div className="absolute top-20 right-40 w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-20 animate-ping"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Heart className="w-20 h-20 text-pink-200" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            تواصلوا معنا!
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-pink-100">
            نحب نسمع منكم! شاركونا أفكاركم وأحلامكم الملونة 🌈
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-r ${method.bgColor} ${method.hoverColor} p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-rotate-2`}>
                  <div className="flex justify-center mb-6">
                    <div className="bg-white/20 p-3 rounded-full">
                      {method.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {method.title}
                  </h3>
                  <p className="text-lg font-semibold mb-2 text-center opacity-90">
                    {method.info}
                  </p>
                  <p className="text-sm text-center opacity-75">
                    {method.subInfo}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form and Fun Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-lg border-4 border-pink-200">
                <div className="flex items-center mb-8">
                  <MessageCircle className="w-8 h-8 text-pink-600 ml-3" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    شاركونا أفكاركم الملونة! ✨
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        اسمك الجميل 💖
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors bg-pink-50/50"
                        placeholder="أدخل اسمك هنا"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        إيميلك الملون 📧
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-purple-50/50"
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        رقم هاتفك 📱
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-blue-50/50"
                        placeholder="رقم الهاتف (اختياري)"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        اهتمامك المفضل 🌟
                      </label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors bg-green-50/50"
                      >
                        {interests.map((interest) => (
                          <option key={interest.value} value={interest.value}>
                            {interest.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      موضوع رسالتك 🎯
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-yellow-200 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors bg-yellow-50/50"
                      placeholder="عن إيش حابب تحكي؟"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      رسالتك الملونة 🌈
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors bg-pink-50/50 resize-none"
                      placeholder="اكتب لنا كل شي في بالك! نحب نقرأ رسائلكم الحلوة 💕"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 flex items-center justify-center"
                  >
                    <Send className="w-6 h-6 ml-2" />
                    🚀 أرسلوا الرسالة بكل حب!
                  </button>
                </form>
              </div>
            </div>

            {/* Fun Sidebar */}
            <div className="space-y-8">
              {/* Social Fun */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-xl text-white">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-pink-100 ml-2" />
                  <h3 className="text-xl font-bold">
                    انضموا لعائلتنا! 👨‍👩‍👧‍👦
                  </h3>
                </div>
                <p className="text-pink-100 mb-4">
                  تابعونا على السوشال ميديا وشاركونا يومياتكم الملونة!
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <button className="bg-white/20 py-2 px-3 rounded-lg hover:bg-white/30 transition-colors">
                    📷 Instagram
                  </button>
                  <button className="bg-white/20 py-2 px-3 rounded-lg hover:bg-white/30 transition-colors">
                    🎵 TikTok
                  </button>
                  <button className="bg-white/20 py-2 px-3 rounded-lg hover:bg-white/30 transition-colors">
                    💬 Twitter
                  </button>
                  <button className="bg-white/20 py-2 px-3 rounded-lg hover:bg-white/30 transition-colors">
                    📘 Facebook
                  </button>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-purple-200">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-purple-600 ml-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    حقائق ملونة! 🎨
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-pink-400 rounded-full ml-2"></div>
                    <span>نرد على الرسائل خلال 30 دقيقة!</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full ml-2"></div>
                    <span>فريقنا يحب الألوان والموسيقى</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full ml-2"></div>
                    <span>نشرب 50 كوب قهوة ملونة يومياً</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full ml-2"></div>
                    <span>مكتبنا مليان ألعاب وألوان!</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-4 text-center">
                  أفعال سريعة! ⚡
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-white/20 py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-right">
                    🎁 كيف أستخدم كوبونات الخصم؟
                  </button>
                  <button className="w-full bg-white/20 py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-right">
                    📦 متى راح يوصل طلبي؟
                  </button>
                  <button className="w-full bg-white/20 py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-right">
                    🔄 كيف أرجع أو أبدل منتج؟
                  </button>
                  <button className="w-full bg-white/20 py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-right">
                    🏆 كيف أصير عضو VIP؟
                  </button>
                </div>
              </div>

              {/* Location Fun */}
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-6 rounded-xl text-white">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-yellow-100 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">مكاننا الملون! 🏪</h3>
                  <p className="text-yellow-100 mb-2">حي الملز، الرياض</p>
                  <p className="text-sm text-yellow-200">
                    تعالوا زورونا في أحلى مكان شبابي في الرياض!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Rocket className="w-12 h-12 text-pink-600" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              أسئلة شبابية شائعة! 🤔
            </h2>
            <p className="text-xl text-gray-600">
              إجابات سريعة وملونة على أكثر الأسئلة اللي تجيكم في بالكم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "كم يستغرق التوصيل؟ 🚚",
                answer: "نوصلكم خلال 24-48 ساعة بكل الحب والألوان! داخل الرياض مجاناً 💕"
              },
              {
                question: "أقدر أرجع المنتج؟ 🔄",
                answer: "أكيد! عندكم 14 يوم تجربوا فيها المنتج، وإذا ما أعجبكم نرجعه بكل سهولة"
              },
              {
                question: "في خصومات للشباب؟ 🎁",
                answer: "دائماً! عندنا خصومات شبابية وكوبونات مفاجآت كل أسبوع"
              },
              {
                question: "كيف أصير جزء من المجتمع؟ 👥",
                answer: "سجلوا معنا وتابعونا على السوشال ميديا وشاركوا في فعالياتنا الملونة!"
              },
              {
                question: "المنتجات أصلية؟ ✅",
                answer: "طبعاً! كل منتجاتنا أصلية 100% ومضمونة من أفضل البراندات الشبابية"
              },
              {
                question: "في تطبيق للجوال؟ 📱",
                answer: "قريباً جداً! نشتغل على تطبيق ملون وسهل يخليكم تتسوقوا بكل راحة"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-4 border-pink-200 hover:shadow-xl hover:border-purple-300 transition-all transform hover:scale-105">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VibrantContactPage;