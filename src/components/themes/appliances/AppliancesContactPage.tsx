import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, Phone, Mail, MapPin, Clock, Send, MessageCircle, 
  Wrench, Shield, Zap, Settings, Headphones
} from 'lucide-react';

interface AppliancesContactPageProps {
  storeName?: string;
}

const AppliancesContactPage: React.FC<AppliancesContactPageProps> = ({ 
  storeName = "الأجهزة المنزلية الذكية" 
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('تم إرسال طلبكم بنجاح! سيتواصل معكم أحد المختصين خلال ساعتين.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      serviceType: 'general'
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
      icon: <Phone className="w-8 h-8 text-blue-600" />,
      title: "خط الدعم الفني",
      info: "+966 11 456 7890",
      subInfo: "متاح 24/7 للطوارئ",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Mail className="w-8 h-8 text-green-600" />,
      title: "البريد الإلكتروني",
      info: "support@smart-home.sa",
      subInfo: "رد خلال ساعتين",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <MapPin className="w-8 h-8 text-indigo-600" />,
      title: "مركز الخدمة",
      info: "طريق العليا، الرياض",
      subInfo: "مركز صيانة متكامل",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "ساعات العمل",
      info: "8:00 ص - 8:00 م",
      subInfo: "الأحد - الخميس",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  const services = [
    { value: 'general', label: '💬 استفسار عام' },
    { value: 'technical', label: '🔧 دعم فني' },
    { value: 'installation', label: '⚙️ طلب تركيب' },
    { value: 'maintenance', label: '🛠️ طلب صيانة' },
    { value: 'warranty', label: '🛡️ خدمات الضمان' },
    { value: 'consultation', label: '💡 استشارة تقنية' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 border-2 border-blue-300 rounded-lg opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-20 h-20 border-2 border-indigo-300 rounded-lg opacity-40 animate-pulse delay-300"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Headphones className="w-16 h-16 text-blue-200" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-gray-200 bg-clip-text text-transparent">
            تواصل معنا
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-blue-100">
            فريق المختصين في خدمتكم لضمان أفضل تجربة مع أجهزتكم المنزلية الذكية
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className={`${method.bgColor} ${method.borderColor} border-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="flex justify-center mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {method.title}
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  {method.info}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  {method.subInfo}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form and Services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-200">
                <div className="flex items-center mb-8">
                  <MessageCircle className="w-8 h-8 text-blue-600 ml-3" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    تواصل مع فريق الخبراء
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-blue-50/30"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-blue-50/30"
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors bg-green-50/30"
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        نوع الخدمة
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors bg-indigo-50/30"
                      >
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      الموضوع *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors bg-orange-50/30"
                      placeholder="موضوع الطلب أو الاستفسار"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      تفاصيل الطلب *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-blue-50/30 resize-none"
                      placeholder="اكتب تفاصيل طلبك أو استفسارك هنا..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 ml-2" />
                    إرسال الطلب
                  </button>
                </form>
              </div>
            </div>

            {/* Services Sidebar */}
            <div className="space-y-8">
              {/* Emergency Support */}
              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-red-600 ml-2" />
                  <h3 className="text-xl font-bold text-red-900">
                    دعم الطوارئ
                  </h3>
                </div>
                <p className="text-red-700 mb-4 text-sm">
                  للأعطال الطارئة التي تحتاج تدخل فوري
                </p>
                <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  اتصال طوارئ
                </button>
              </div>

              {/* Technical Services */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
                <div className="flex items-center mb-4">
                  <Wrench className="w-6 h-6 text-blue-600 ml-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    خدماتنا التقنية
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 text-blue-500 ml-2" />
                    <span>تركيب الأجهزة الذكية</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-green-500 ml-2" />
                    <span>صيانة دورية ووقائية</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-indigo-500 ml-2" />
                    <span>خدمات الضمان الشامل</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="w-4 h-4 text-orange-500 ml-2" />
                    <span>استشارات المنزل الذكي</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-4 text-center">
                  روابط سريعة
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-white/20 py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-right">
                    📖 دليل المستخدم
                  </button>
                  <button className="w-full bg-white/20 py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-right">
                    🔧 طلب قطع غيار
                  </button>
                  <button className="w-full bg-white/20 py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-right">
                    📋 حالة الطلب
                  </button>
                  <button className="w-full bg-white/20 py-3 px-4 rounded-lg hover:bg-white/30 transition-colors text-right">
                    💡 نصائح الصيانة
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-200 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-gray-900 mb-1">مركز الخدمة</h3>
                  <p className="text-gray-700 text-sm">طريق العليا، الرياض</p>
                  <p className="text-gray-600 text-xs mt-2">مركز صيانة متكامل مع أحدث المعدات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600">
              إجابات على أكثر الأسئلة التقنية تكراراً
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "ما هي مدة الضمان على الأجهزة؟",
                answer: "نقدم ضمان شامل لمدة سنتين على جميع الأجهزة مع خدمة صيانة مجانية."
              },
              {
                question: "هل تقدمون خدمة التركيب؟",
                answer: "نعم، لدينا فريق فنيين متخصصين لتركيب وتشغيل جميع الأجهزة مجاناً."
              },
              {
                question: "كم يستغرق إصلاح العطل؟",
                answer: "معظم الأعطال نصلحها في نفس اليوم، والأعطال المعقدة خلال 48 ساعة."
              },
              {
                question: "هل تتوفر قطع الغيار الأصلية؟",
                answer: "نعم، لدينا مخزون كامل من قطع الغيار الأصلية لجميع الماركات التي نبيعها."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
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

export default AppliancesContactPage;