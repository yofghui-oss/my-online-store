import React from 'react';
import { Zap, Shield, Truck, Star, ArrowRight, Cpu, Smartphone, Headphones, Monitor } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';

interface TechHomePageProps {
  storeName?: string;
}

const TechHomePage: React.FC<TechHomePageProps> = ({ 
  storeName = "TechStore" 
}) => {
  const { products } = useStore();

  // Featured tech products
  const featuredProducts = products.slice(0, 8).map(product => ({
    ...product,
    image: product.image || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  }));

  const categories = [
    {
      name: 'أجهزة الكمبيوتر',
      icon: Monitor,
      image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      count: '120+ منتج'
    },
    {
      name: 'الهواتف الذكية',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      count: '85+ منتج'
    },
    {
      name: 'سماعات الرأس',
      icon: Headphones,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      count: '45+ منتج'
    },
    {
      name: 'معالجات',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      count: '30+ منتج'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'أداء فائق',
      description: 'أحدث التقنيات لأفضل أداء'
    },
    {
      icon: Shield,
      title: 'ضمان شامل',
      description: 'ضمان لمدة عامين على جميع المنتجات'
    },
    {
      icon: Truck,
      title: 'توصيل سريع',
      description: 'توصيل مجاني خلال 24 ساعة'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                مستقبل التكنولوجيا
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                اكتشف أحدث الأجهزة التقنية والإلكترونيات المتطورة بأفضل الأسعار
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2">
                  تسوق الآن
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border border-blue-500 text-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
                  استكشف المنتجات
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-blue-500/30">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Tech Products"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-4 shadow-2xl">
                <div className="text-sm text-blue-100">خصم حتى</div>
                <div className="text-2xl font-bold text-white">40%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">تصفح حسب الفئة</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              اختر من مجموعة واسعة من المنتجات التقنية المتطورة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-gray-700 rounded-xl p-6 hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-cyan-600/20 transition-all duration-300 border border-gray-600 hover:border-blue-500/50">
                    <div className="aspect-square bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg overflow-hidden mb-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-6 w-6 text-blue-400" />
                      <h3 className="font-semibold text-white">{category.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{category.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">المنتجات المميزة</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              أحدث وأفضل المنتجات التقنية المختارة خصيصاً لك
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-400">{product.price} ر.س</span>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
                      أضف للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">لماذا نحن الأفضل؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-cyan-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">ابق على اطلاع</h2>
          <p className="text-blue-100 mb-8">
            احصل على آخر الأخبار التقنية والعروض الحصرية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
            />
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              اشتراك
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechHomePage;
