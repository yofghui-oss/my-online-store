import React, { useState } from 'react';
import { Heart, Phone, Mail, MapPin, Send, MessageCircle, Gift } from 'lucide-react';

interface ToysContactPageProps {
  storeName?: string;
}

const ToysContactPage: React.FC<ToysContactPageProps> = ({ 
  storeName = "عالم الألعاب المرح" 
}) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '', ageGroup: 'all'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('🎉 شكراً لكم! سنتواصل معكم قريباً لنساعدكم في اختيار أفضل الألعاب! 🎈');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', ageGroup: 'all' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ageGroups = [
    { value: 'all', label: '🎈 جميع الأعمار' },
    { value: '0-2', label: '👶 0-2 سنة' },
    { value: '3-5', label: '🧒 3-5 سنوات' },
    { value: '6-8', label: '👦 6-8 سنوات' },
    { value: '9-12', label: '🧑 9-12 سنة' },
    { value: '13+', label: '👨 13+ سنة' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 text-white">
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Heart className="w-16 h-16 text-pink-200 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">تواصلوا معنا! 🎈</h1>
          <p className="text-xl max-w-4xl mx-auto">نحب نسمع منكم ونساعدكم في اختيار أفضل الألعاب لأطفالكم الأحباء</p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-pink-100 border-4 border-pink-300 p-8 rounded-xl text-center">
              <Phone className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">📞 كلمونا</h3>
              <p className="font-semibold">+966 11 567 8901</p>
              <p className="text-sm text-gray-600">نحب نسمع صوتكم</p>
            </div>
            <div className="bg-yellow-100 border-4 border-yellow-300 p-8 rounded-xl text-center">
              <Mail className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">💌 راسلونا</h3>
              <p className="font-semibold">hello@toys-world.sa</p>
              <p className="text-sm text-gray-600">رسائل مليانة حب</p>
            </div>
            <div className="bg-purple-100 border-4 border-purple-300 p-8 rounded-xl text-center">
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">🏪 زورونا</h3>
              <p className="font-semibold">حي النخيل، الرياض</p>
              <p className="text-sm text-gray-600">متجر مليان ألعاب</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border-4 border-pink-200">
            <div className="flex items-center mb-8">
              <MessageCircle className="w-8 h-8 text-pink-600 ml-3" />
              <h2 className="text-3xl font-bold">شاركونا أحلام أطفالكم! 🌈</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">👤 اسم ولي الأمر</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 bg-pink-50/30" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">📧 البريد الإلكتروني</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 bg-yellow-50/30" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">📱 رقم الهاتف</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 bg-purple-50/30" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">🎂 عمر الطفل</label>
                  <select name="ageGroup" value={formData.ageGroup} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 bg-green-50/30">
                    {ageGroups.map((group) => (
                      <option key={group.value} value={group.value}>{group.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">🎯 الموضوع</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 bg-blue-50/30" />
              </div>

              <div>
                <label className="block font-semibold mb-2">💭 رسالتكم الحلوة</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={6}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 bg-pink-50/30 resize-none" />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center">
                <Send className="w-6 h-6 ml-2" />
                🚀 أرسلوا الرسالة بحب!
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToysContactPage;