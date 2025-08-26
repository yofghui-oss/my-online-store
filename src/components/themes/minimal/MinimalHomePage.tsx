import React from 'react';
import { ArrowLeft, Star, Shield, Truck, RefreshCw, CreditCard } from 'lucide-react';
import { useStore } from '../../../contexts/StoreContext';
import MinimalProductCard from './MinimalProductCard';

interface MinimalHomePageProps {
  storeName?: string;
}

const MinimalHomePage: React.FC<MinimalHomePageProps> = ({ 
  storeName = "متجر الأناقة" 
}) => {
  const { products, categories } = useStore();
  
  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8).map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.price * 1.2,
    image: product.images[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviews: Math.floor(Math.random() * 100) + 10,
    isNew: Math.random() > 0.7,
    isSale: Math.random() > 0.6
  }));

  const bestSellers = featuredProducts.slice(0, 4);
  const newArrivals = featuredProducts.slice(4, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                أزياء عصرية وأنيقة
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                اكتشف مجموعتنا الجديدة من الأزياء العصرية والمريحة بأفضل الأسعار
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="inline-flex items-center bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 gap-2">
                  تسوق الآن
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  تصفح المجموعات
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Fashion Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-sm p-4 hidden lg:block">
                <div className="text-sm text-gray-600">تخفيضات تصل إلى</div>
                <div className="text-2xl font-bold text-gray-900">50%</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-sm p-4 hidden lg:block">
                <div className="text-sm text-gray-600">شحن مجاني</div>
                <div className="text-lg font-semibold text-gray-900">للطلبات +200 ر.س</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">تسوق حسب الفئة</h2>
            <p className="text-gray-600">اكتشف مجموعة واسعة من المنتجات</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category) => (
              <div key={category.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 group-hover:shadow-md transition-shadow">
                  <img
                    src={category.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">الأكثر مبيعاً</h2>
            <p className="text-gray-600">المنتجات المفضلة لدى عملائنا</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <MinimalProductCard
                key={product.id}
                product={product}
                onAddToCart={(id) => console.log('Add to cart:', id)}
                onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">وصل حديثاً</h2>
            <p className="text-gray-600">آخر إضافاتنا من المنتجات العصرية</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <MinimalProductCard
                key={product.id}
                product={product}
                onAddToCart={(id) => console.log('Add to cart:', id)}
                onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">شحن سريع</h3>
              <p className="text-gray-600 text-sm">توصيل مجاني للطلبات أكثر من 200 ر.س</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">إرجاع مجاني</h3>
              <p className="text-gray-600 text-sm">إمكانية الإرجاع خلال 30 يوم</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">دفع آمن</h3>
              <p className="text-gray-600 text-sm">حماية كاملة لبياناتك المالية</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">جودة مضمونة</h3>
              <p className="text-gray-600 text-sm">منتجات عالية الجودة ومضمونة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">وسائل الدفع المقبولة</h3>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
                <CreditCard className="h-6 w-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Visa</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
                <CreditCard className="h-6 w-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">MasterCard</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
                <CreditCard className="h-6 w-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">مدى</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-gray-700">الدفع عند الاستلام</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            اشترك في النشرة الإخبارية
          </h2>
          <p className="text-gray-300 mb-8">
            احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
            />
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              اشتراك
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalHomePage;
