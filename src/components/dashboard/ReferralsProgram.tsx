import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Users, Gift, DollarSign, TrendingUp, Copy, Eye, CheckCircle } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface Referral {
  id: string;
  referrerName: string;
  referrerEmail: string;
  referralCode: string;
  totalReferrals: number;
  successfulReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActivity: string;
  conversions: {
    clicks: number;
    signups: number;
    sales: number;
  };
}

interface ReferralProgram {
  id: string;
  name: string;
  description: string;
  commissionType: 'percentage' | 'fixed';
  commissionValue: number;
  cookieDuration: number; // days
  minimumPayout: number;
  isActive: boolean;
  terms: string;
  createdAt: string;
  updatedAt: string;
}

const ReferralsProgram: React.FC = () => {
  const { currentStore } = useStore();

  const [program] = useState<ReferralProgram>({
    id: '1',
    name: 'برنامج الإحالة المميز',
    description: 'اربح عمولة مقابل كل عميل تحضره للمتجر',
    commissionType: 'percentage',
    commissionValue: 10,
    cookieDuration: 30,
    minimumPayout: 100,
    isActive: true,
    terms: 'شروط وأحكام برنامج الإحالة...',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  });

  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: '1',
      referrerName: 'أحمد محمد',
      referrerEmail: 'ahmed@example.com',
      referralCode: 'AHMED2024',
      totalReferrals: 45,
      successfulReferrals: 32,
      totalEarnings: 1250,
      pendingEarnings: 320,
      status: 'active',
      joinDate: '2024-01-10',
      lastActivity: '2024-01-20T14:30:00Z',
      conversions: {
        clicks: 156,
        signups: 45,
        sales: 32
      }
    },
    {
      id: '2',
      referrerName: 'سارة أحمد',
      referrerEmail: 'sara@example.com',
      referralCode: 'SARA2024',
      totalReferrals: 28,
      successfulReferrals: 19,
      totalEarnings: 890,
      pendingEarnings: 150,
      status: 'active',
      joinDate: '2024-01-12',
      lastActivity: '2024-01-19T09:15:00Z',
      conversions: {
        clicks: 98,
        signups: 28,
        sales: 19
      }
    },
    {
      id: '3',
      referrerName: 'خالد سعد',
      referrerEmail: 'khaled@example.com',
      referralCode: 'KHALED2024',
      totalReferrals: 15,
      successfulReferrals: 8,
      totalEarnings: 340,
      pendingEarnings: 80,
      status: 'inactive',
      joinDate: '2024-01-08',
      lastActivity: '2024-01-15T16:45:00Z',
      conversions: {
        clicks: 67,
        signups: 15,
        sales: 8
      }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    referralCode: '',
    status: 'active' as const
  });

  const generateReferralCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData({ ...formData, referralCode: code });
  };

  const handleCreateReferral = () => {
    if (!formData.referrerName || !formData.referrerEmail || !formData.referralCode) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (referrals.some(ref => ref.referralCode === formData.referralCode)) {
      toast.error('رمز الإحالة موجود بالفعل');
      return;
    }

    if (referrals.some(ref => ref.referrerEmail === formData.referrerEmail)) {
      toast.error('البريد الإلكتروني موجود بالفعل');
      return;
    }

    const newReferral: Referral = {
      id: Date.now().toString(),
      referrerName: formData.referrerName,
      referrerEmail: formData.referrerEmail,
      referralCode: formData.referralCode,
      totalReferrals: 0,
      successfulReferrals: 0,
      totalEarnings: 0,
      pendingEarnings: 0,
      status: formData.status,
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString(),
      conversions: {
        clicks: 0,
        signups: 0,
        sales: 0
      }
    };

    setReferrals([...referrals, newReferral]);
    toast.success('تم إضافة المحيل بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateReferral = () => {
    if (!selectedReferral) return;

    const updatedReferrals = referrals.map(ref =>
      ref.id === selectedReferral.id
        ? {
            ...ref,
            referrerName: formData.referrerName,
            referrerEmail: formData.referrerEmail,
            referralCode: formData.referralCode,
            status: formData.status
          }
        : ref
    );

    setReferrals(updatedReferrals);
    toast.success('تم تحديث بيانات المحيل بنجاح');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteReferral = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المحيل؟')) {
      setReferrals(referrals.filter(ref => ref.id !== id));
      toast.success('تم حذف المحيل بنجاح');
    }
  };

  const handleToggleStatus = (id: string) => {
    const updatedReferrals = referrals.map(ref =>
      ref.id === id
        ? {
            ...ref,
            status: ref.status === 'active' ? 'inactive' as const : 'active' as const
          }
        : ref
    );
    setReferrals(updatedReferrals);
    toast.success('تم تحديث حالة المحيل');
  };

  const copyReferralLink = (code: string) => {
    const link = `${window.location.origin}?ref=${code}`;
    navigator.clipboard.writeText(link);
    toast.success('تم نسخ رابط الإحالة');
  };

  const resetForm = () => {
    setFormData({
      referrerName: '',
      referrerEmail: '',
      referralCode: '',
      status: 'active'
    });
    setSelectedReferral(null);
  };

  const openEditModal = (referral: Referral) => {
    setSelectedReferral(referral);
    setFormData({
      referrerName: referral.referrerName,
      referrerEmail: referral.referrerEmail,
      referralCode: referral.referralCode,
      status: referral.status
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'suspended': return 'موقوف';
      default: return 'غير محدد';
    }
  };

  const getConversionRate = (referral: Referral) => {
    if (referral.conversions.clicks === 0) return 0;
    return ((referral.conversions.sales / referral.conversions.clicks) * 100).toFixed(1);
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.referrerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.referralCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || referral.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalReferrals = referrals.reduce((sum, ref) => sum + ref.totalReferrals, 0);
  const totalEarnings = referrals.reduce((sum, ref) => sum + ref.totalEarnings, 0);
  const activeReferrers = referrals.filter(ref => ref.status === 'active').length;
  const pendingPayouts = referrals.reduce((sum, ref) => sum + ref.pendingEarnings, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">برنامج الإحالة والتسويق بالعمولة</h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            إدارة المحيلين والمسوقين بالعمولة وتتبع الأرباح
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة محيل
        </Button>
      </div>

      {/* Program Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            {program.name}
          </h2>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600 dark:text-green-400">برنامج نشط</span>
          </div>
        </div>
        <p className="text-secondary-600 dark:text-secondary-300 mb-4">
          {program.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-secondary-500 dark:text-secondary-400">نوع العمولة:</span>
            <span className="block font-medium text-secondary-900 dark:text-white">
              {program.commissionType === 'percentage' ? `${program.commissionValue}%` : `${program.commissionValue} ر.س`}
            </span>
          </div>
          <div>
            <span className="text-secondary-500 dark:text-secondary-400">مدة الكوكيز:</span>
            <span className="block font-medium text-secondary-900 dark:text-white">
              {program.cookieDuration} يوم
            </span>
          </div>
          <div>
            <span className="text-secondary-500 dark:text-secondary-400">الحد الأدنى للسحب:</span>
            <span className="block font-medium text-secondary-900 dark:text-white">
              {program.minimumPayout} ر.س
            </span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">المحيلون النشطون</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{activeReferrers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Gift className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي الإحالات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">{totalReferrals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">إجمالي العمولات</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {totalEarnings.toLocaleString()} ر.س
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">المبالغ المعلقة</p>
              <p className="text-xl font-bold text-secondary-900 dark:text-white">
                {pendingPayouts.toLocaleString()} ر.س
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-secondary-400" />
            <Input
              placeholder="البحث في المحيلين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="suspended">موقوف</option>
          </select>
        </div>
      </Card>

      {/* Referrals Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  المحيل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الإحصائيات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  العمولات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-secondary-900 dark:text-white">
                        {referral.referrerName}
                      </div>
                      <div className="text-sm text-secondary-500 dark:text-secondary-400">
                        {referral.referrerEmail}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded font-mono">
                          {referral.referralCode}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto"
                          onClick={() => copyReferralLink(referral.referralCode)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-500 dark:text-secondary-400">النقرات:</span>
                        <span className="text-secondary-900 dark:text-white">{referral.conversions.clicks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-500 dark:text-secondary-400">التسجيلات:</span>
                        <span className="text-secondary-900 dark:text-white">{referral.conversions.signups}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-500 dark:text-secondary-400">المبيعات:</span>
                        <span className="text-secondary-900 dark:text-white">{referral.conversions.sales}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-secondary-500 dark:text-secondary-400">معدل التحويل:</span>
                        <span className="text-green-600 dark:text-green-400">{getConversionRate(referral)}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-secondary-900 dark:text-white font-medium">
                        {referral.totalEarnings.toLocaleString()} ر.س
                      </div>
                      <div className="text-xs text-secondary-500 dark:text-secondary-400">
                        معلق: {referral.pendingEarnings.toLocaleString()} ر.س
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(referral.status)}`}>
                      {getStatusLabel(referral.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(referral)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(referral.id)}
                      >
                        {referral.status === 'active' ? 'إيقاف' : 'تفعيل'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteReferral(referral.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={selectedReferral ? 'تعديل المحيل' : 'إضافة محيل جديد'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="اسم المحيل"
              value={formData.referrerName}
              onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
              placeholder="أحمد محمد"
              required
            />
            <Input
              label="البريد الإلكتروني"
              type="email"
              value={formData.referrerEmail}
              onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
              placeholder="ahmed@example.com"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Input
                label="رمز الإحالة"
                value={formData.referralCode}
                onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                placeholder="AHMED2024"
                required
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={generateReferralCode} className="w-full">
                توليد رمز
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الحالة
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:text-white"
            >
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="suspended">موقوف</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={selectedReferral ? handleUpdateReferral : handleCreateReferral}
              className="flex-1"
            >
              {selectedReferral ? 'تحديث' : 'إضافة'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="flex-1"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReferralsProgram;