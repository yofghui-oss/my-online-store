import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Phone, Mail, MapPin, Clock, Send, MessageCircle, Zap, Users, HelpCircle } from 'lucide-react';

interface ModernContactPageProps {
  storeName?: string;
}

const ModernContactPage: React.FC<ModernContactPageProps> = ({ 
  storeName = "متجر عصري" 
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'support'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('تم إرسال رسالتك بنجاح! سنقوم بالرد عليك خلال 24 ساعة.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      department: 'support'
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
      icon: <Phone className="w-8 h-8 text-purple-600" />,
      title: "اتصل بنا",
      info: "+966 11 234 5678",
      subInfo: "متاح من الأحد إلى الخميس",
      bgColor: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Mail className="w-8 h-8 text-indigo-600" />,
      title: "راسلنا",
      info: "support@modern-store.sa",
      subInfo: "نرد خلال 2-4 ساعات",
      bgColor: "from-indigo-500 to-blue-500"
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "زوروا متجرنا",
      info: "طريق الملك فهد، الرياض",
      subInfo: "في مجمع العليا التجاري",
      bgColor: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: "ساعات العمل",
      info: "10:00 ص - 10:00 م",
      subInfo: "يومياً عدا الجمعة",
      bgColor: "from-emerald-500 to-teal-500"
    }
  ];

  const departments = [
    { value: 'support', label: 'خدمة العملاء' },
    { value: 'sales', label: 'المبيعات' },
    { value: 'returns', label: 'المرتجعات والاستبدال' },
    { value: 'partnerships', label: 'الشراكات التجارية' },
    { value: 'technical', label: 'الدعم التقني' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 border border-white/30 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/25 rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-purple-200" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            تواصل معنا
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-purple-100">
            نحن هنا لمساعدتك! تواصل معنا للحصول على أفضل تجربة تسوق عصرية
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className="relative group">
                <div className={`bg-gradient-to-r ${method.bgColor} p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}>
                  <div className="flex justify-center mb-6">
                    {method.icon}
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

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-200">
                <div className="flex items-center mb-8">
                  <MessageCircle className="w-8 h-8 text-purple-600 ml-3" />
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
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-purple-50/30"
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
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-purple-50/30"
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
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-purple-50/30"
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        القسم المختص
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-purple-50/30"
                      >
                        {departments.map((dept) => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
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
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-purple-50/30"
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
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-purple-50/30 resize-none"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 ml-2" />
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* Quick Help */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-indigo-600 ml-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    مساعدة سريعة
                  </h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full text-right p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                    كيفية تتبع الطلب؟
                  </button>
                  <button className="w-full text-right p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                    سياسة الاستبدال والإرجاع
                  </button>
                  <button className="w-full text-right p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                    طرق الدفع المتاحة
                  </button>
                  <button className="w-full text-right p-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                    أسعار الشحن
                  </button>
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl text-white">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-purple-200 ml-2" />
                  <h3 className="text-xl font-bold">
                    المحادثة المباشرة
                  </h3>
                </div>
                <p className="text-purple-100 mb-4">
                  تحدث مع فريق خدمة العملاء مباشرة للحصول على مساعدة فورية
                </p>
                <button className="w-full bg-white text-purple-600 py-3 px-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  بدء المحادثة
                </button>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-xl border border-purple-200 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-gray-900 mb-1">موقعنا</h3>
                  <p className="text-gray-700 text-sm">طريق الملك فهد، الرياض</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <HelpCircle className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600">
              إجابات سريعة على أكثر الأسئلة تكراراً
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "ما هي مدة التوصيل؟",
                answer: "نقدم التوصيل خلال 24-48 ساعة داخل الرياض، و3-5 أيام للمناطق الأخرى."
              },
              {
                question: "هل يمكنني استبدال المنتج؟",
                answer: "نعم، يمكن استبدال أو إرجاع المنتج خلال 14 يوم من تاريخ الاستلام."
              },
              {
                question: "ما هي طرق الدفع المتاحة؟",
                answer: "نقبل الدفع نقداً عند الاستلام، البطاقات الائتمانية، والمحافظ الرقمية."
              },
              {
                question: "هل التوصيل مجاني؟",
                answer: "نعم، التوصيل مجاني للطلبات التي تزيد عن 200 ريال داخل الرياض."
              },
              {
                question: "كيف يمكنني تتبع طلبي؟",
                answer: "ستحصل على رقم تتبع عبر الرسائل النصية والبريد الإلكتروني فور شحن الطلب."
              },
              {
                question: "هل يمكن تغيير الطلب بعد التأكيد؟",
                answer: "يمكن تعديل الطلب خلال ساعة واحدة من التأكيد، وذلك قبل البدء في التحضير."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-purple-200 hover:shadow-xl transition-shadow">
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

export default ModernContactPage;