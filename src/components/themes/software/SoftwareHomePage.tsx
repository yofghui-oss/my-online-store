import React from 'react';
import { ArrowRight, Download, Code, Users, Star, Zap } from 'lucide-react';
import { Product } from '../../../types';
import SoftwareProductCard from './SoftwareProductCard';

interface SoftwareHomePageProps {
  products: Product[];
  storeId: string;
  storeName?: string;
}

const SoftwareHomePage: React.FC<SoftwareHomePageProps> = ({
  products,
  storeId,
  storeName = "متجر البرمجيات"
}) => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const popularProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Tech Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Code className="w-12 h-12 text-blue-400 ml-4" />
              <h1 className="text-4xl lg:text-6xl font-bold">
                {storeName}
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 text-gray-300">
              حلول برمجية متقدمة وأدوات تطوير احترافية لتحقيق أهدافك التقنية
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
              استكشف البرمجيات
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Tech Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">تحميل فوري</h3>
              <p className="text-slate-700 leading-relaxed">احصل على برامجك فوراً بعد الشراء مع روابط تحميل آمنة</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">دعم تقني</h3>
              <p className="text-slate-700 leading-relaxed">فريق دعم متخصص لمساعدتك في جميع استفساراتك التقنية</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border border-green-200">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">تحديثات مجانية</h3>
              <p className="text-slate-700 leading-relaxed">احصل على آخر التحديثات والميزات الجديدة مجاناً</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Software */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-500 ml-2" />
              <h2 className="text-4xl font-bold text-slate-900">البرمجيات المميزة</h2>
            </div>
            <p className="text-xl text-slate-700">أفضل البرامج والأدوات المختارة بعناية للمطورين والمحترفين</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <SoftwareProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Downloads */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">الأكثر تحميلاً</h2>
            <p className="text-xl text-slate-700">البرامج الأكثر شعبية واستخداماً من قبل المطورين</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <SoftwareProductCard
                key={product.id}
                product={product}
                storeId={storeId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Developer Newsletter */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Code className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">انضم لمجتمع المطورين</h2>
          <p className="text-xl mb-8 text-gray-300">
            احصل على آخر أخبار البرمجة، أدوات جديدة، ونصائح تطوير حصرية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 border-2 border-blue-400"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
              اشترك الآن
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareHomePage;
