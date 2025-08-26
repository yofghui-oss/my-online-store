import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle
} from 'lucide-react';

interface MinimalContactPageProps {
  storeName?: string;
}

const MinimalContactPage: React.FC<MinimalContactPageProps> = ({ 
  storeName = "بساطة للملابس" 
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            نحب أن نسمع منك. أرسل لنا رسالة وسنتواصل معك قريباً
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                أرسل لنا رسالة
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    شكراً لك!
                  </h3>
                  <p className="text-gray-600">
                    تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-0 bg-transparent"
                      placeholder="اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-0 bg-transparent"
                      placeholder="بريدك الإلكتروني"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      الرسالة
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-0 bg-transparent resize-none"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-gray-900 text-white px-8 py-3 rounded font-medium hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4 ml-2" />
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                معلومات التواصل
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-gray-600 mt-1 ml-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">العنوان</h3>
                    <p className="text-gray-600">شارع الموضة، الرياض</p>
                    <p className="text-gray-600">المملكة العربية السعودية</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-gray-600 mt-1 ml-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">الهاتف</h3>
                    <p className="text-gray-600">+966 11 123 4567</p>
                    <p className="text-gray-600">+966 50 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-gray-600 mt-1 ml-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@minimal-style.sa</p>
                    <p className="text-gray-600">support@minimal-style.sa</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-gray-600 mt-1 ml-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">ساعات العمل</h3>
                    <p className="text-gray-600">السبت - الخميس: 10:00 - 22:00</p>
                    <p className="text-gray-600">الجمعة: 15:00 - 22:00</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12">
                <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>الموقع على الخريطة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              نحن هنا لمساعدتك
            </h2>
            <p className="text-gray-600 leading-relaxed">
              لديك سؤال حول منتجاتنا أو خدماتنا؟ أو تحتاج مساعدة في اختيار القطعة المناسبة؟ 
              فريقنا جاهز لمساعدتك في العثور على ما تبحث عنه.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">استشارة الأزياء</h3>
              <p className="text-sm text-gray-600">
                نقدم استشارات مجانية لمساعدتك في اختيار القطع المناسبة لأسلوبك
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">دليل المقاسات</h3>
              <p className="text-sm text-gray-600">
                تواصل معنا للحصول على مساعدة في اختيار المقاس المناسب
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">خدمة العملاء</h3>
              <p className="text-sm text-gray-600">
                فريق خدمة العملاء متاح للإجابة على جميع استفساراتك
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalContactPage;