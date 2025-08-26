import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Clock, HelpCircle, FileText, Shield, Truck } from 'lucide-react';

interface MinimalCustomerServicePageProps {
  storeName?: string;
}

const MinimalCustomerServicePage: React.FC<MinimalCustomerServicePageProps> = ({ 
  storeName = "متجر الأناقة" 
}) => {
  const [activeTab, setActiveTab] = useState('contact');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: 'كيف يمكنني تتبع طلبي؟',
      answer: 'يمكنك تتبع طلبك من خلال الدخول إلى حسابك والنقر على "طلباتي". ستجد رقم التتبع ورابط مباشر لتتبع الشحنة.'
    },
    {
      question: 'ما هي مدة التوصيل؟',
      answer: 'نقوم بالتوصيل خلال 2-5 أيام عمل داخل المملكة. للمناطق النائية قد تستغرق 7 أيام عمل.'
    },
    {
      question: 'هل يمكنني إرجاع المنتج؟',
      answer: 'نعم، يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام بشرط أن يكون في حالته الأصلية.'
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل الدفع عند الاستلام، البطاقات الائتمانية (فيزا، ماستركارد)، مدى، وتحويل بنكي.'
    },
    {
      question: 'هل التوصيل مجاني؟',
      answer: 'التوصيل مجاني للطلبات أكثر من 200 ريال. للطلبات الأقل، رسوم التوصيل 25 ريال.'
    },
    {
      question: 'كيف يمكنني تغيير أو إلغاء طلبي؟',
      answer: 'يمكنك تغيير أو إلغاء طلبك خلال ساعة من تأكيد الطلب عبر التواصل معنا أو من خلال حسابك.'
    }
  ];

  const policies = [
    {
      title: 'سياسة الإرجاع والاستبدال',
      content: 'يحق للعميل إرجاع المنتج خلال 14 يوم من تاريخ الاستلام. يجب أن يكون المنتج في حالته الأصلية مع العبوة والملحقات.'
    },
    {
      title: 'سياسة الشحن والتوصيل',
      content: 'نقوم بالشحن خلال 24-48 ساعة من تأكيد الطلب. التوصيل مجاني للطلبات أكثر من 200 ريال.'
    },
    {
      title: 'سياسة الخصوصية',
      content: 'نحن نحترم خصوصيتك ونحمي بياناتك الشخصية. لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك.'
    },
    {
      title: 'الضمان',
      content: 'جميع منتجاتنا مضمونة ضد عيوب التصنيع. مدة الضمان تختلف حسب نوع المنتج.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const tabs = [
    { id: 'contact', label: 'تواصل معنا', icon: MessageCircle },
    { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle },
    { id: 'policies', label: 'السياسات', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">خدمة العملاء</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا في أي وقت وسنكون سعداء بخدمتك
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">اتصل بنا</h3>
            <p className="text-gray-600 mb-3">+966 11 123 4567</p>
            <p className="text-sm text-gray-500">السبت - الخميس: 9 ص - 6 م</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">راسلنا</h3>
            <p className="text-gray-600 mb-3">support@store.com</p>
            <p className="text-sm text-gray-500">نرد خلال 24 ساعة</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">الدردشة المباشرة</h3>
            <p className="text-gray-600 mb-3">متاح الآن</p>
            <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              ابدأ المحادثة
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-gray-900 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">أرسل لنا رسالة</h2>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                    <select
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="">اختر الموضوع</option>
                      <option value="order">استفسار عن طلب</option>
                      <option value="product">استفسار عن منتج</option>
                      <option value="return">إرجاع أو استبدال</option>
                      <option value="complaint">شكوى</option>
                      <option value="suggestion">اقتراح</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                    <textarea
                      required
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      إرسال الرسالة
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">الأسئلة الشائعة</h2>
                <div className="max-w-4xl mx-auto space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <details className="group">
                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                          <h3 className="font-medium text-gray-900">{faq.question}</h3>
                          <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Policies Tab */}
            {activeTab === 'policies' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">السياسات والشروط</h2>
                <div className="max-w-4xl mx-auto space-y-8">
                  {policies.map((policy, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {policy.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{policy.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">لماذا تثق بنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">أمان وحماية</h3>
              <p className="text-gray-600">معاملاتك محمية بأحدث تقنيات التشفير</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">توصيل سريع</h3>
              <p className="text-gray-600">نوصل طلبك في أسرع وقت ممكن</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">دعم 24/7</h3>
              <p className="text-gray-600">فريق الدعم متاح لمساعدتك في أي وقت</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalCustomerServicePage;
