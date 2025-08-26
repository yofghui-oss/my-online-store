import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Gift, Zap, Target, Crown, Award,
  Medal, Gem, Coins, ShoppingBag, Users, Heart,
  Calendar, CheckCircle, Lock, Unlock, Sparkles,
  TrendingUp, Flame, Timer, Share2, Camera
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: {
    type: 'points' | 'badge' | 'discount' | 'item';
    value: number | string;
    description: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  image: string;
  deadline: Date;
  participants: number;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'daily' | 'weekly' | 'special';
  requirements: string[];
  progress: number;
  maxProgress: number;
  active: boolean;
}

interface UserLevel {
  level: number;
  title: string;
  currentXP: number;
  requiredXP: number;
  benefits: string[];
  nextLevelTitle: string;
}

const VibrantGameHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats, setUserStats] = useState({
    totalPoints: 12450,
    level: 15,
    completedChallenges: 28,
    badges: 15,
    streak: 7
  });

  const userLevel: UserLevel = {
    level: 15,
    title: 'ملكة الألوان',
    currentXP: 2450,
    requiredXP: 3000,
    benefits: ['خصم 15%', 'شحن مجاني', 'إشعارات مبكرة'],
    nextLevelTitle: 'إمبراطورة الموضة'
  };

  const achievements: Achievement[] = [
    {
      id: 'first-purchase',
      title: 'أول مشترية',
      description: 'اكملي أول عملية شراء لك',
      icon: ShoppingBag,
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: {
        type: 'points',
        value: 100,
        description: '100 نقطة'
      },
      rarity: 'common',
      category: 'shopping'
    },
    {
      id: 'social-butterfly',
      title: 'فراشة اجتماعية',
      description: 'احصلي على 1000 إعجاب على منشوراتك',
      icon: Heart,
      progress: 847,
      maxProgress: 1000,
      completed: false,
      reward: {
        type: 'badge',
        value: 'Social Queen',
        description: 'شارة الملكة الاجتماعية'
      },
      rarity: 'rare',
      category: 'social'
    },
    {
      id: 'trendsetter',
      title: 'رائدة الموضة',
      description: 'كوني أول من يشتري 5 منتجات جديدة',
      icon: TrendingUp,
      progress: 3,
      maxProgress: 5,
      completed: false,
      reward: {
        type: 'discount',
        value: 25,
        description: 'خصم 25% على المجموعة القادمة'
      },
      rarity: 'epic',
      category: 'shopping'
    },
    {
      id: 'legendary-spender',
      title: 'الأسطورة الذهبية',
      description: 'اشتري بقيمة 10,000 ر.س',
      icon: Crown,
      progress: 7850,
      maxProgress: 10000,
      completed: false,
      reward: {
        type: 'item',
        value: 'Exclusive VIP Card',
        description: 'بطاقة VIP حصرية'
      },
      rarity: 'legendary',
      category: 'shopping'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 'daily-outfit',
      title: 'إطلالة يومية',
      description: 'شاركي إطلالتك اليومية واحصلي على إعجابات',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      deadline: new Date('2024-01-21T23:59:59'),
      participants: 156,
      reward: '200 نقطة + شارة يومية',
      difficulty: 'easy',
      type: 'daily',
      requirements: ['التقط صورة لإطلالتك', 'أضف 3 هاشتاقات', 'احصل على 10 إعجابات'],
      progress: 2,
      maxProgress: 3,
      active: true
    },
    {
      id: 'color-challenge',
      title: 'تحدي الألوان الجريئة',
      description: 'اختاري 3 ألوان جريئة في إطلالة واحدة',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      deadline: new Date('2024-01-28T23:59:59'),
      participants: 89,
      reward: '500 نقطة + خصم 20%',
      difficulty: 'medium',
      type: 'weekly',
      requirements: ['استخدم 3 ألوان مختلفة', 'شارك في قسم التحديات', 'احصل على 50 إعجاب'],
      progress: 1,
      maxProgress: 3,
      active: true
    },
    {
      id: 'fashion-week',
      title: 'أسبوع الموضة',
      description: 'شاركي في فعالية أسبوع الموضة الخاص',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      deadline: new Date('2024-02-15T23:59:59'),
      participants: 234,
      reward: '1000 نقطة + هدية مفاجئة',
      difficulty: 'hard',
      type: 'special',
      requirements: ['شارك 7 إطلالات مختلفة', 'احصل على 200 إعجاب', 'كن من أفضل 10 مشاركين'],
      progress: 0,
      maxProgress: 3,
      active: false
    }
  ];

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Trophy },
    { id: 'achievements', name: 'الإنجازات', icon: Award },
    { id: 'challenges', name: 'التحديات', icon: Target },
    { id: 'rewards', name: 'المكافآت', icon: Gift },
    { id: 'leaderboard', name: 'المتصدرين', icon: Crown }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return Calendar;
      case 'weekly': return Timer;
      case 'special': return Sparkles;
      default: return Target;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="text-yellow-400 w-16 h-16" />
            </motion.div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            مركز المكافآت والتحديات
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            اربحي النقاط، اكملي التحديات، واحصلي على مكافآت حصرية من خلال رحلتك في عالم الموضة
          </p>
        </motion.div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          {[
            { label: 'النقاط', value: userStats.totalPoints.toLocaleString(), icon: Coins, color: 'from-yellow-500 to-orange-500' },
            { label: 'المستوى', value: userStats.level, icon: Star, color: 'from-blue-500 to-purple-500' },
            { label: 'التحديات', value: userStats.completedChallenges, icon: Target, color: 'from-green-500 to-teal-500' },
            { label: 'الشارات', value: userStats.badges, icon: Medal, color: 'from-purple-500 to-pink-500' },
            { label: 'المتتالية', value: `${userStats.streak} أيام`, icon: Flame, color: 'from-red-500 to-orange-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className={`bg-gradient-to-br ${stat.color} p-4 rounded-2xl text-white text-center shadow-lg`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-xl font-bold">{userLevel.title}</h3>
              <p className="text-white/70">المستوى {userLevel.level}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">المستوى التالي</p>
              <p className="text-yellow-400 font-bold">{userLevel.nextLevelTitle}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-white/70 text-sm mb-2">
              <span>{userLevel.currentXP} نقطة</span>
              <span>{userLevel.requiredXP} نقطة</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(userLevel.currentXP / userLevel.requiredXP) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {userLevel.benefits.map((benefit, index) => (
              <span key={index} className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">
                {benefit}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              
              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Award className="text-yellow-400 mr-3" />
                    إنجازاتي
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                            achievement.completed
                              ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} border-white/30`
                              : 'bg-white/5 border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full ${
                              achievement.completed ? 'bg-white/20' : 'bg-gray-600/20'
                            }`}>
                              <Icon size={24} className={achievement.completed ? 'text-white' : 'text-gray-400'} />
                            </div>
                            <div className="flex-1">
                              <h3 className={`font-bold mb-2 ${achievement.completed ? 'text-white' : 'text-gray-300'}`}>
                                {achievement.title}
                              </h3>
                              <p className={`text-sm mb-3 ${achievement.completed ? 'text-white/80' : 'text-gray-400'}`}>
                                {achievement.description}
                              </p>
                              
                              {/* Progress Bar */}
                              <div className="mb-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span className={achievement.completed ? 'text-white/70' : 'text-gray-500'}>
                                    {achievement.progress}/{achievement.maxProgress}
                                  </span>
                                  <span className={achievement.completed ? 'text-white/70' : 'text-gray-500'}>
                                    {Math.round((achievement.progress / achievement.maxProgress) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                      achievement.completed
                                        ? 'bg-gradient-to-r from-green-400 to-green-500'
                                        : 'bg-gradient-to-r from-blue-400 to-blue-500'
                                    }`}
                                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                  />
                                </div>
                              </div>

                              {/* Reward */}
                              <div className={`text-sm ${achievement.completed ? 'text-yellow-300' : 'text-gray-400'}`}>
                                <Gift size={14} className="inline mr-1" />
                                {achievement.reward.description}
                              </div>
                            </div>
                          </div>

                          {/* Completed Badge */}
                          {achievement.completed && (
                            <div className="absolute top-4 right-4">
                              <CheckCircle className="text-green-400 w-6 h-6" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Challenges Tab */}
              {activeTab === 'challenges' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Target className="text-purple-400 mr-3" />
                    التحديات النشطة
                  </h2>

                  <div className="space-y-6">
                    {challenges.map((challenge, index) => {
                      const TypeIcon = getTypeIcon(challenge.type);
                      return (
                        <motion.div
                          key={challenge.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative p-6 rounded-xl border transition-all duration-300 ${
                            challenge.active
                              ? 'bg-white/10 border-purple-500/50 hover:border-purple-400/70'
                              : 'bg-white/5 border-white/20 opacity-60'
                          }`}
                        >
                          <div className="flex gap-6">
                            <img
                              src={challenge.image}
                              alt={challenge.title}
                              className="w-24 h-24 rounded-xl object-cover"
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-white font-bold text-lg mb-1">{challenge.title}</h3>
                                  <p className="text-white/70 text-sm">{challenge.description}</p>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                    {challenge.difficulty}
                                  </span>
                                  <TypeIcon className="text-purple-400 w-5 h-5" />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="text-center">
                                  <div className="text-white/60 text-xs">المهلة النهائية</div>
                                  <div className="text-white font-bold">
                                    {challenge.deadline.toLocaleDateString('ar-SA')}
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-white/60 text-xs">المشاركين</div>
                                  <div className="text-purple-400 font-bold">{challenge.participants}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-white/60 text-xs">المكافأة</div>
                                  <div className="text-yellow-400 font-bold text-sm">{challenge.reward}</div>
                                </div>
                              </div>

                              {/* Requirements */}
                              <div className="mb-4">
                                <h4 className="text-white font-medium text-sm mb-2">المتطلبات:</h4>
                                <div className="space-y-1">
                                  {challenge.requirements.map((req, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm">
                                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                        i < challenge.progress ? 'bg-green-500' : 'bg-white/20'
                                      }`}>
                                        {i < challenge.progress ? (
                                          <CheckCircle size={12} className="text-white" />
                                        ) : (
                                          <div className="w-2 h-2 bg-white/60 rounded-full" />
                                        )}
                                      </div>
                                      <span className={i < challenge.progress ? 'text-green-400' : 'text-white/70'}>
                                        {req}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Progress */}
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="text-white/70">التقدم</span>
                                  <span className="text-white">{challenge.progress}/{challenge.maxProgress}</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                                  />
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <button
                                  disabled={!challenge.active}
                                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    challenge.active
                                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  {challenge.active ? 'شارك الآن' : 'غير متاح'}
                                </button>
                                
                                <button className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-300">
                                  <Share2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Other tabs content can be added here */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">نظرة عامة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center">
                        <Target className="mr-2" />
                        التحديات النشطة
                      </h3>
                      <p className="text-white/70 mb-4">لديك {challenges.filter(c => c.active).length} تحديات نشطة</p>
                      <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                        عرض الكل
                      </button>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center">
                        <Award className="mr-2" />
                        الإنجازات الأخيرة
                      </h3>
                      <p className="text-white/70 mb-4">أكملت {achievements.filter(a => a.completed).length} إنجازات</p>
                      <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                        عرض الإنجازات
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rewards' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Gift className="text-green-400 mr-3" />
                    متجر المكافآت
                  </h2>
                  <p className="text-white/70 text-center py-8">قريباً... متجر المكافآت الحصرية</p>
                </div>
              )}

              {activeTab === 'leaderboard' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Crown className="text-yellow-400 mr-3" />
                    المتصدرين
                  </h2>
                  <p className="text-white/70 text-center py-8">قريباً... لوحة المتصدرين</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VibrantGameHub;