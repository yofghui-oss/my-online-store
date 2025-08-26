import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Zap } from 'lucide-react';

interface TechFooterProps {
  storeName?: string;
}

const TechFooter: React.FC<TechFooterProps> = ({ 
  storeName = "تك ستور" 
}) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {storeName}
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              متجرك الموثوق للتقنية والإلكترونيات. نقدم أحدث المنتجات التقنية بأفضل الأسعار وخدمة عملاء متميزة.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                  الضمان والإرجاع
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                  الدعم التقني
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-slate-300">
                <Phone className="h-4 w-4 ml-2 flex-shrink-0 text-blue-400" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center text-sm text-slate-300">
                <Mail className="h-4 w-4 ml-2 flex-shrink-0 text-blue-400" />
                <span>support@techstore.com</span>
              </div>
              <div className="flex items-center text-sm text-slate-300">
                <MapPin className="h-4 w-4 ml-2 flex-shrink-0 text-blue-400" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-center text-sm text-slate-400">
            © 2024 {storeName}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TechFooter;
