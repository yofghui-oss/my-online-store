import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Clock, HelpCircle, FileText, Shield, Truck, Zap, Cpu, Monitor } from 'lucide-react';

interface TechCustomerServicePageProps {
  storeName?: string;
}

const TechCustomerServicePage: React.FC<TechCustomerServicePageProps> = ({ 
  storeName = "TechStore" 
}) => {
  const [activeTab, setActiveTab] = useState('contact');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    deviceType: '',
    serialNumber: ''
  });

  const techFaqs = [
    {
      question: 'كيف يمكنني تتبع طلبي التقني؟',
      answer: 'يمكنك تتبع طلبك من خلال الدخول إلى حسابك والنقر على "طلباتي التقنية". ستجد رقم التتبع ورابط مباشر لتتبع الشحنة مع تفاصيل التركيب.'
    },
    {
      question: 'ما هي مدة التوصيل والتركيب؟',
      answer: 'نقوم بالتوصيل خلال 2-3 أيام عمل داخل المملكة. التركيب يتم في نفس يوم التوصيل أو في موعد يناسبك خلال 24 ساعة.'
    },
    {
      question: 'هل يمكنني إرجاع الجهاز التقني؟',
      answer: 'نعم، يمكنك إرجاع الجهاز خلال 14 يوم من تاريخ الاستلام بشرط أن يكون في حالته الأصلية مع جميع الملحقات والضمان.'
    },
    {
      question: 'ما هي خدمات الدعم الفني المتاحة؟',
      answer: 'نوفر دعم فني مجاني مدى الحياة، تحديثات البرامج، صيانة دورية، واستشارات تقنية عبر الهاتف أو الزيارة المنزلية.'
    },
    {
      question: 'كيف أحصل على الضمان؟',
      answer: 'جميع منتجاتنا تأتي مع ضمان شامل (1-3 سنوات حسب المنتج). يشمل الضمان قطع الغيار، العمالة، والدعم الفني المجاني.'
    },
    {
      question: 'هل تقدمون خدمة التركيب والإعداد؟',
      answer: 'نعم، نقدم خدمة التركيب والإعداد المجانية لجميع الأجهزة. يشمل ذلك تركيب البرامج، نقل البيانات، والتدريب على الاستخدام.'
    }
  ];

  const techPolicies = [
    {
      title: 'سياسة الضمان التقني',
      content: 'نوفر ضمان شامل على جميع المنتجات التقنية يشمل قطع الغيار والعمالة والدعم الفني. مدة الضمان تتراوح من سنة إلى 3 سنوات حسب نوع المنتج.'
    },
    {
      title: 'سياسة التركيب والصيانة',
      content: 'نقدم خدمة التركيب المجانية لجميع الأجهزة مع ضمان التركيب لمدة 6 أشهر. كما نوفر صيانة دورية وخدمات الدعم الفني المجانية.'
    },
    {
      title: 'سياسة الإرجاع للمنتجات التقنية',
      content: 'يمكن إرجاع المنتجات التقنية خلال 14 يوم مع استرداد كامل للمبلغ. يجب أن تكون الأجهزة في حالتها الأصلية مع جميع الملحقات.'
    },
    {
      title: 'سياسة الدعم الفني',
      content: 'نوفر دعم فني مجاني مدى الحياة عبر الهاتف، البريد الإلكتروني، والزيارات المنزلية. يشمل ذلك حل المشاكل التقنية وتحديث البرامج.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tech support form submitted:', contactForm);
    alert('تم إرسال طلب الدعم الفني بنجاح! سيتواصل معك فريق الدعم خلال ساعة.');
    setContactForm({ name: '', email: '', subject: '', message: '', deviceType: '', serialNumber: '' });
  };

  const tabs = [
    { id: 'contact', label: 'الدعم الفني', icon: MessageCircle },
    { id: 'faq', label: 'الأسئلة التقنية', icon: HelpCircle },
    { id: 'policies', label: 'السياسات', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Zap className="h-10 w-10 text-blue-400" />
            الدعم الفني المتخصص
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            فريق الدعم الفني متاح 24/7 لمساعدتك في جميع احتياجاتك التقنية
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">الدعم الفوري</h3>
            <p className="text-blue-400 mb-3">+966 11 TECH (8324)</p>
            <p className="text-sm text-gray-400">متاح 24/7 للطوارئ التقنية</p>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">الدعم التقني</h3>
            <p className="text-blue-400 mb-3">tech@support.com</p>
            <p className="text-sm text-gray-400">رد خلال 30 دقيقة</p>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">الدردشة المباشرة</h3>
            <p className="text-blue-400 mb-3">متاح الآن</p>
            <button className="text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
              ابدأ المحادثة
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="border-b border-gray-700">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-400'
                        : 'text-gray-400 hover:text-white'
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
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">طلب دعم فني</h2>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">الاسم</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">نوع الجهاز</label>
                      <select
                        required
                        value={contactForm.deviceType}
                        onChange={(e) => setContactForm(prev => ({ ...prev, deviceType: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">اختر نوع الجهاز</option>
                        <option value="laptop">لابتوب</option>
                        <option value="desktop">كمبيوتر مكتبي</option>
                        <option value="phone">هاتف ذكي</option>
                        <option value="tablet">تابلت</option>
                        <option value="accessories">إكسسوارات</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">الرقم التسلسلي (اختياري)</label>
                      <input
                        type="text"
                        value={contactForm.serialNumber}
                        onChange={(e) => setContactForm(prev => ({ ...prev, serialNumber: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="SN123456789"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">نوع المشكلة</label>
                    <select
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">اختر نوع المشكلة</option>
                      <option value="hardware">مشكلة في الهاردوير</option>
                      <option value="software">مشكلة في البرامج</option>
                      <option value="installation">مساعدة في التركيب</option>
                      <option value="warranty">استفسار عن الضمان</option>
                      <option value="maintenance">طلب صيانة</option>
                      <option value="consultation">استشارة تقنية</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">وصف المشكلة</label>
                    <textarea
                      required
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="اشرح المشكلة بالتفصيل مع ذكر رسائل الخطأ إن وجدت..."
                    />
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                    >
                      إرسال طلب الدعم
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div>
                <h2 className="text-2xl font-semibold text-white mb-8 text-center">الأسئلة التقنية الشائعة</h2>
                <div className="max-w-4xl mx-auto space-y-4">
                  {techFaqs.map((faq, index) => (
                    <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg">
                      <details className="group">
                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-600 transition-colors">
                          <h3 className="font-medium text-white">{faq.question}</h3>
                          <HelpCircle className="h-5 w-5 text-blue-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
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
                <h2 className="text-2xl font-semibold text-white mb-8 text-center">السياسات التقنية</h2>
                <div className="max-w-4xl mx-auto space-y-8">
                  {techPolicies.map((policy, index) => (
                    <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-400" />
                        {policy.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">{policy.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tech Services */}
        <div className="mt-12 bg-gray-800 rounded-lg border border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">خدماتنا التقنية المتخصصة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">تركيب وإعداد</h3>
              <p className="text-gray-400">تركيب مجاني لجميع الأجهزة مع إعداد البرامج والتدريب</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">صيانة متقدمة</h3>
              <p className="text-gray-400">صيانة دورية وإصلاح متخصص لجميع أنواع الأجهزة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">ضمان شامل</h3>
              <p className="text-gray-400">ضمان يصل إلى 3 سنوات مع دعم فني مجاني مدى الحياة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCustomerServicePage;
