import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

interface TechContactPageProps {
  storeName?: string;
}

const TechContactPage: React.FC<TechContactPageProps> = ({ 
  storeName = "تك زون للإلكترونيات" 
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "العنوان",
      details: ["شارع التقنية، الرياض", "المملكة العربية السعودية", "الرمز البريدي: 12345"]
    },
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "الهاتف",
      details: ["+966 11 123 4567", "+966 50 123 4567", "واتساب متاح"]
    },
    {
      icon: <Mail className="w-6 h-6 text-purple-600" />,
      title: "البريد الإلكتروني",
      details: ["info@techzone.sa", "support@techzone.sa", "sales@techzone.sa"]
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "ساعات العمل",
      details: ["السبت - الخميس: 9:00 - 22:00", "الجمعة: 14:00 - 22:00", "دعم فني 24/7"]
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: "فيسبوك", url: "#" },
    { icon: <Twitter className="w-5 h-5" />, name: "تويتر", url: "#" },
    { icon: <Instagram className="w-5 h-5" />, name: "إنستجرام", url: "#" },
    { icon: <Linkedin className="w-5 h-5" />, name: "لينكد إن", url: "#" }
  ];

  const supportTopics = [
    "استفسار عام",
    "دعم فني",
    "طلب ضمان",
    "شكوى",
    "اقتراح",
    "طلب عرض سعر",
    "شراكة تجارية"
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            تواصل معنا
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            نحن هنا لمساعدتك. تواصل معنا في أي وقت وسنكون سعداء للإجابة على استفساراتك
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              معلومات التواصل
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              يمكنكم التواصل معنا من خلال أي من الطرق التالية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                أرسل لنا رسالة
              </h2>
              <p className="text-gray-600 mb-8">
                املأ النموذج التالي وسنتواصل معك في أقرب وقت ممكن
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    تم إرسال رسالتك بنجاح!
                  </h3>
                  <p className="text-green-600">
                    شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        موضوع الرسالة *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر موضوع الرسالة</option>
                        {supportTopics.map((topic, index) => (
                          <option key={index} value={topic}>{topic}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      الرسالة *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 ml-2" />
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                موقعنا
              </h2>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>خريطة الموقع</p>
                  <p className="text-sm">شارع التقنية، الرياض</p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 ml-2 text-blue-600" />
                  تواصل سريع
                </h3>
                <div className="space-y-3">
                  <a href="tel:+966111234567" className="flex items-center text-blue-600 hover:text-blue-800">
                    <Phone className="w-4 h-4 ml-2" />
                    +966 11 123 4567
                  </a>
                  <a href="mailto:info@techzone.sa" className="flex items-center text-blue-600 hover:text-blue-800">
                    <Mail className="w-4 h-4 ml-2" />
                    info@techzone.sa
                  </a>
                  <a href="https://wa.me/966501234567" className="flex items-center text-green-600 hover:text-green-800">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    واتساب: +966 50 123 4567
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  تابعنا على
                </h3>
                <div className="flex space-x-4 space-x-reverse">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-lg text-gray-600">
              إجابات على أكثر الأسئلة شيوعاً
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "ما هي مدة الضمان على المنتجات؟",
                answer: "نقدم ضمان شامل لمدة سنتين على جميع الأجهزة الإلكترونية، وسنة واحدة على الإكسسوارات."
              },
              {
                question: "هل تقدمون خدمة التوصيل؟",
                answer: "نعم، نقدم خدمة التوصيل لجميع أنحاء المملكة. التوصيل مجاني للطلبات التي تزيد عن 500 ريال."
              },
              {
                question: "هل يمكنني إرجاع أو استبدال المنتج؟",
                answer: "يمكنك إرجاع أو استبدال المنتج خلال 14 يوم من تاريخ الشراء، شرط أن يكون المنتج في حالته الأصلية."
              },
              {
                question: "كيف يمكنني الحصول على الدعم الفني؟",
                answer: "يمكنك التواصل مع فريق الدعم الفني عبر الهاتف أو البريد الإلكتروني أو الواتساب. نحن متاحون 24/7."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
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

export default TechContactPage;