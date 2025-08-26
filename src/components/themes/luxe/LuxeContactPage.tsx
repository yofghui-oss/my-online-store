import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Crown, Phone, Mail, MapPin, Clock, Diamond, Star, Send, MessageCircle } from 'lucide-react';

interface LuxeContactPageProps {
  storeName?: string;
}

const LuxeContactPage: React.FC<LuxeContactPageProps> = ({ 
  storeName = "فاخر للمجوهرات" 
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
    // Handle form submission
    alert('تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت ممكن.');
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

  const contactInfo = [
    {
      icon: <Phone className="w-8 h-8 text-amber-600" />,
      title: "اتصل بنا",
      info: "+966 11 123 4567",
      subInfo: "خدمة العملاء متاحة على مدار الساعة"
    },
    {
      icon: <Mail className="w-8 h-8 text-purple-600" />,
      title: "راسلنا",
      info: "info@luxe-jewelry.sa",
      subInfo: "سنرد على رسالتك خلال ساعة واحدة"
    },
    {
      icon: <MapPin className="w-8 h-8 text-emerald-600" />,
      title: "زوروا معرضنا",
      info: "شارع التحلية، الرياض",
      subInfo: "في قلب المنطقة التجارية الراقية"
    },
    {
      icon: <Clock className="w-8 h-8 text-rose-600" />,
      title: "أوقات العمل",
      info: "9:00 ص - 11:00 م",
      subInfo: "يومياً عدا الجمعة من 2:00 ظ"
    }
  ];

  const services = [
    { value: 'general', label: 'استفسار عام' },
    { value: 'custom', label: 'تصميم مخصص' },
    { value: 'repair', label: 'صيانة وإصلاح' },
    { value: 'appraisal', label: 'تقييم مجوهرات' },
    { value: 'consultation', label: 'استشارة مجوهرات' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 border border-yellow-400/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border border-amber-400/40 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 border border-yellow-300/25 rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Crown className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">
            تواصل معنا
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-amber-100">
            نحن هنا لخدمتك وتقديم أفضل تجربة تسوق للمجوهرات الفاخرة
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((contact, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-amber-200 hover:border-amber-400 text-center">
                <div className="flex justify-center mb-6">
                  {contact.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {contact.title}
                </h3>
                <p className="text-lg font-semibold text-amber-600 mb-2">
                  {contact.info}
                </p>
                <p className="text-gray-600 text-sm">
                  {contact.subInfo}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-amber-200">
              <div className="flex items-center mb-8">
                <MessageCircle className="w-8 h-8 text-amber-600 ml-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  أرسل لنا رسالة
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
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors bg-amber-50/50"
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
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors bg-amber-50/50"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors bg-amber-50/50"
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
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors bg-amber-50/50"
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
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors bg-amber-50/50"
                    placeholder="موضوع الرسالة"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الرسالة *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors bg-amber-50/50 resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-amber-700 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 ml-2" />
                  إرسال الرسالة
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 rounded-xl shadow-lg border-2 border-amber-200 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">موقعنا</h3>
                  <p className="text-gray-700">شارع التحلية، الرياض</p>
                  <p className="text-gray-600 text-sm mt-2">في قلب المنطقة التجارية الراقية</p>
                </div>
              </div>

              {/* VIP Services */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-amber-200">
                <div className="flex items-center mb-6">
                  <Diamond className="w-8 h-8 text-purple-600 ml-3" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    خدمات VIP
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-amber-500 ml-2" />
                    <span className="text-gray-700">استشارة مجوهرات مجانية</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-amber-500 ml-2" />
                    <span className="text-gray-700">تصميم مخصص حسب الطلب</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-amber-500 ml-2" />
                    <span className="text-gray-700">خدمة التوصيل الآمن</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-amber-500 ml-2" />
                    <span className="text-gray-700">تقييم وتقدير المجوهرات</span>
                  </div>
                </div>
              </div>

              {/* Luxury Guarantee */}
              <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-8 rounded-xl text-white">
                <div className="text-center">
                  <Crown className="w-12 h-12 text-yellow-200 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">ضمان الفخامة</h3>
                  <p className="text-amber-100">
                    جميع قطعنا مضمونة مدى الحياة مع شهادات الأصالة المعتمدة دولياً
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600">
              إجابات على أكثر الأسئلة تكراراً
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "هل المجوهرات مضمونة؟",
                answer: "نعم، جميع قطعنا مضمونة مدى الحياة مع شهادات الأصالة المعتمدة."
              },
              {
                question: "هل يمكنني طلب تصميم مخصص؟",
                answer: "بالطبع! نقدم خدمة التصميم المخصص مع أمهر المصممين لدينا."
              },
              {
                question: "ما هي أوقات التوصيل؟",
                answer: "نقدم خدمة التوصيل الآمن خلال 24-48 ساعة داخل الرياض."
              },
              {
                question: "هل تقدمون خدمة تقييم المجوهرات؟",
                answer: "نعم، لدينا خبراء معتمدون لتقييم وتقدير جميع أنواع المجوهرات."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-amber-200">
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

export default LuxeContactPage;