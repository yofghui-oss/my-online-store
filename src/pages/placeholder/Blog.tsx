import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Blog: React.FC = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      title: 'How to Build Your First Online Store in 10 Minutes',
      excerpt: 'Learn the essential steps to create a professional online store quickly and efficiently.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Getting Started',
      readTime: '5 min read'
    },
    {
      title: 'E-commerce Trends to Watch in 2024',
      excerpt: 'Discover the latest trends shaping the future of online retail and how to leverage them.',
      author: 'Mike Chen',
      date: '2024-01-10',
      category: 'Trends',
      readTime: '8 min read'
    },
    {
      title: 'Optimizing Your Store for Mobile Commerce',
      excerpt: 'Essential tips for creating a mobile-first shopping experience that converts.',
      author: 'Emma Davis',
      date: '2024-01-05',
      category: 'Optimization',
      readTime: '6 min read'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-secondary-50 dark:bg-secondary-900">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-secondary-900 dark:text-white mb-6">
                {t('blog.title', 'Blog & Resources')}
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
                {t('blog.subtitle', 'Stay updated with the latest e-commerce insights, tips, and best practices.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-secondary-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-secondary-500">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
                        {t('blog.readMore', 'Read More')}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
