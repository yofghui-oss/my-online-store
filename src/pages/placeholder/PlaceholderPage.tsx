import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HardHat } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-secondary-50 dark:bg-secondary-900 p-4">
        <Card className="text-center p-12 max-w-lg w-full">
          <HardHat className="h-16 w-16 text-primary-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
            {t('placeholder.message')}
          </p>
          <Link to="/">
            <Button size="lg">
              {t('placeholder.goHome')}
            </Button>
          </Link>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
