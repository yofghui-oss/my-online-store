import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, MessageCircle, Heart, Award } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Community: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-secondary-50 dark:bg-secondary-900">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              {t('community.title', 'Join Our Community')}
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-12 max-w-3xl mx-auto">
              {t('community.subtitle', 'Connect with fellow entrepreneurs, share experiences, and grow together.')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">10,000+</h3>
                <p className="text-secondary-600 dark:text-secondary-300">Active Members</p>
              </Card>
              
              <Card className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">50,000+</h3>
                <p className="text-secondary-600 dark:text-secondary-300">Discussions</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">95%</h3>
                <p className="text-secondary-600 dark:text-secondary-300">Satisfaction Rate</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">24/7</h3>
                <p className="text-secondary-600 dark:text-secondary-300">Community Support</p>
              </Card>
            </div>
            
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
              {t('community.join', 'Join Community')}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
