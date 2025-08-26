import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Code, Phone, Mail, MapPin, Clock, Send, MessageCircle, 
  Settings, Shield, Headphones, Zap
} from 'lucide-react';

interface SoftwareContactPageProps {
  storeName?: string;
}

const SoftwareContactPage: React.FC<SoftwareContactPageProps> = ({ 
  storeName = "حلول البرمجيات" 
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    serviceType: 'consultation'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('تم إرسال طلبكم بنجاح! سيتواصل معكم أحد المختصين التقنيين خلال 24 ساعة.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      serviceType: 'consultation'
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
      title: "الدعم التقني",
      info: "+966 11 678 9012",
      subInfo: "متاح 24/7 للعملاء",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Mail className="w-8 h-8 text-indigo-600" />,
      title: "البريد الإلكتروني",
      info: "info@software-solutions.sa",
      subInfo: "رد خلال ساعة واحدة",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      icon: <MapPin className="w-8 h-8 text-slate-600" />,
      title: "مقر الشركة",
      info: "مركز الملك عبدالله المالي",
      subInfo: "الرياض، المملكة العربية السعودية",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200"
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "ساعات العمل",
      info: "8:00 ص - 6:00 م",
      subInfo: "الأحد - الخميس",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  const services = [
    { value: 'consultation', label: '💡 استشارة تقنية' },
    { value: 'development', label: '💻 تطوير برمجيات' },
    { value: 'support', label: '🛠️ دعم تقني' },
    { value: 'maintenance', label: '⚙️ صيانة أنظمة' },
    { value: 'integration', label: '🔗 تكامل أنظمة' },
    { value: 'training', label: '📚 تدريب تقني' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 border-2 border-blue-400 opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-20 h-20 border-2 border-indigo-400 opacity-40 animate-pulse delay-300"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Headphones className="w-16 h-16 text-blue-300 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
            تواصل معنا
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-blue-100">
            فريق الخبراء التقنيين في خدمتكم لتقديم أفضل الحلول البرمجية
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
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

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-200">
                <div className="flex items-center mb-8">
                  <MessageCircle className="w-8 h-8 text-blue-600 ml-3" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    تواصل مع خبرائنا التقنيين
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
                        className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors bg-indigo-50/30"
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
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 transition-colors bg-slate-50/30"
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        اسم الشركة
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors bg-green-50/30"
                        placeholder="اسم الشركة (اختياري)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      نوع الخدمة
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-purple-50/30"
                    >
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
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
                      className="w-full px-4 py-3 border-2 border-yellow-200 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors bg-yellow-50/30"
                      placeholder="موضوع الطلب أو المشروع"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      تفاصيل المشروع *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-blue-50/30 resize-none"
                      placeholder="اكتب تفاصيل مشروعك أو احتياجاتك التقنية..."
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

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* Technical Support */}
              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600 ml-2" />
                  <h3 className="text-xl font-bold text-blue-900">
                    الدعم التقني المتقدم
                  </h3>
                </div>
                <p className="text-blue-700 mb-4 text-sm">
                  فريق متخصص متاح 24/7 لحل جميع المشاكل التقنية
                </p>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  تواصل مع الدعم
                </button>
              </div>

              {/* Services */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-indigo-200">
                <div className="flex items-center mb-4">
                  <Settings className="w-6 h-6 text-indigo-600 ml-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    خدماتنا التقنية
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center">
                    <Code className="w-4 h-4 text-blue-500 ml-2" />
                    <span>تطوير تطبيقات مخصصة</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-yellow-500 ml-2" />
                    <span>تحسين الأداء والسرعة</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 ml-2" />
                    <span>حلول الأمان المتقدمة</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 text-indigo-500 ml-2" />
                    <span>إدارة الخوادم والبنية التحتية</span>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-slate-100 p-6 rounded-xl border-2 border-slate-200 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">مقر الشركة</h3>
                  <p className="text-slate-700 text-sm">مركز الملك عبدالله المالي</p>
                  <p className="text-slate-600 text-xs mt-2">مكاتب حديثة مجهزة بأحدث التقنيات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareContactPage;