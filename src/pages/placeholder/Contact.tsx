import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HeadphonesIcon } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t('contact.form.success', 'Message sent successfully! We\'ll get back to you soon.'));
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    } catch (error) {
      toast.error(t('contact.form.error', 'Failed to send message. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.email.title', 'Email'),
      value: 'support@storebuilder.com',
      description: t('contact.info.email.desc', 'Send us an email anytime'),
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      title: t('contact.info.phone.title', 'Phone'),
      value: '+1 (555) 123-4567',
      description: t('contact.info.phone.desc', 'Mon-Fri from 8am to 5pm'),
      color: 'text-green-500'
    },
    {
      icon: MapPin,
      title: t('contact.info.address.title', 'Address'),
      value: '123 Business Ave, Suite 100',
      description: t('contact.info.address.desc', 'San Francisco, CA 94105'),
      color: 'text-purple-500'
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title', 'Business Hours'),
      value: 'Mon - Fri: 8am - 5pm PST',
      description: t('contact.info.hours.desc', 'Weekend support available'),
      color: 'text-orange-500'
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: t('contact.support.chat.title', 'Live Chat'),
      description: t('contact.support.chat.desc', 'Get instant help from our support team'),
      action: t('contact.support.chat.action', 'Start Chat'),
      color: 'text-blue-500'
    },
    {
      icon: HeadphonesIcon,
      title: t('contact.support.call.title', 'Phone Support'),
      description: t('contact.support.call.desc', 'Speak directly with our experts'),
      action: t('contact.support.call.action', 'Call Now'),
      color: 'text-green-500'
    },
    {
      icon: Mail,
      title: t('contact.support.email.title', 'Email Support'),
      description: t('contact.support.email.desc', 'Send detailed questions via email'),
      action: t('contact.support.email.action', 'Send Email'),
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-secondary-50 dark:bg-secondary-900">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              {t('contact.title', 'Get in Touch')}
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-12 max-w-3xl mx-auto">
              {t('contact.subtitle', 'Have questions about our platform? Need help getting started? Our team is here to help you succeed.')}
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  {t('contact.form.title', 'Send us a Message')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                        {t('contact.form.name', 'Full Name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
                        placeholder={t('contact.form.namePlaceholder', 'Enter your full name')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                        {t('contact.form.email', 'Email Address')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
                        placeholder={t('contact.form.emailPlaceholder', 'Enter your email')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      {t('contact.form.company', 'Company Name')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
                      placeholder={t('contact.form.companyPlaceholder', 'Enter your company name')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      {t('contact.form.subject', 'Subject')} *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-secondary-800 dark:border-secondary-600 dark:text-white"
                    >
                      <option value="">{t('contact.form.subjectPlaceholder', 'Select a subject')}</option>
                      <option value="general">{t('contact.form.subjects.general', 'General Inquiry')}</option>
                      <option value="sales">{t('contact.form.subjects.sales', 'Sales Question')}</option>
                      <option value="support">{t('contact.form.subjects.support', 'Technical Support')}</option>
                      <option value="partnership">{t('contact.form.subjects.partnership', 'Partnership')}</option>
                      <option value="billing">{t('contact.form.subjects.billing', 'Billing Question')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      {t('contact.form.message', 'Message')} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-secondary-800 dark:border-secondary-600 dark:text-white resize-none"
                      placeholder={t('contact.form.messagePlaceholder', 'Tell us how we can help you...')}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <Send className="h-5 w-5" />
                    {isSubmitting 
                      ? t('contact.form.sending', 'Sending...') 
                      : t('contact.form.send', 'Send Message')
                    }
                  </Button>
                </form>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                    {t('contact.info.title', 'Contact Information')}
                  </h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <info.icon className={`h-6 w-6 ${info.color} mt-1 flex-shrink-0`} />
                        <div>
                          <h3 className="font-semibold text-secondary-900 dark:text-white">
                            {info.title}
                          </h3>
                          <p className="text-secondary-600 dark:text-secondary-300 font-medium">
                            {info.value}
                          </p>
                          <p className="text-sm text-secondary-500 dark:text-secondary-400">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Support Options */}
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                    {t('contact.support.title', 'Need Immediate Help?')}
                  </h2>
                  <div className="space-y-4">
                    {supportOptions.map((option, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors">
                        <div className="flex items-center space-x-3">
                          <option.icon className={`h-5 w-5 ${option.color}`} />
                          <div>
                            <h3 className="font-medium text-secondary-900 dark:text-white">
                              {option.title}
                            </h3>
                            <p className="text-sm text-secondary-600 dark:text-secondary-300">
                              {option.description}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {option.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-white dark:bg-secondary-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-12">
              {t('contact.faq.title', 'Frequently Asked Questions')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {t('contact.faq.response.question', 'How quickly do you respond?')}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {t('contact.faq.response.answer', 'We typically respond to all inquiries within 24 hours during business days.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {t('contact.faq.demo.question', 'Can I schedule a demo?')}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {t('contact.faq.demo.answer', 'Yes! Contact our sales team to schedule a personalized demo of our platform.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {t('contact.faq.support.question', 'Do you offer 24/7 support?')}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {t('contact.faq.support.answer', 'Enterprise customers get 24/7 support. Other plans have business hours support.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {t('contact.faq.languages.question', 'What languages do you support?')}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {t('contact.faq.languages.answer', 'We provide support in English and Arabic, with more languages coming soon.')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
