import React, { useState } from 'react';
import { Wallet, Plus, Minus, Filter, Download, Eye, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';

interface WalletTransaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: string;
  description: string;
  category: 'payment' | 'refund' | 'bonus' | 'penalty' | 'withdrawal' | 'deposit';
  status: 'completed' | 'pending' | 'failed';
  balanceAfter: number;
  createdAt: Date;
  reference?: string;
}

interface UserWallet {
  userId: string;
  userName: string;
  userEmail: string;
  balance: number;
  currency: string;
  totalDeposits: number;
  totalWithdrawals: number;
  lastTransaction: Date;
}

const WalletManagement: React.FC = () => {
  const [wallets] = useState<UserWallet[]>([
    {
      userId: '1',
      userName: 'أحمد السالم',
      userEmail: 'ahmed@example.com',
      balance: 1250.00,
      currency: 'SAR',
      totalDeposits: 2000.00,
      totalWithdrawals: 750.00,
      lastTransaction: new Date('2024-01-15')
    },
    {
      userId: '2',
      userName: 'فاطمة المحمد',
      userEmail: 'fatima@example.com',
      balance: 890.50,
      currency: 'SAR',
      totalDeposits: 1500.00,
      totalWithdrawals: 609.50,
      lastTransaction: new Date('2024-01-20')
    }
  ]);

  const [transactions] = useState<WalletTransaction[]>([
    {
      id: '1',
      userId: '1',
      userName: 'أحمد السالم',
      userEmail: 'ahmed@example.com',
      type: 'credit',
      amount: 500.00,
      currency: 'SAR',
      description: 'إيداع رصيد',
      category: 'deposit',
      status: 'completed',
      balanceAfter: 1250.00,
      createdAt: new Date('2024-01-15'),
      reference: 'DEP-001'
    },
    {
      id: '2',
      userId: '1',
      userName: 'أحمد السالم',
      userEmail: 'ahmed@example.com',
      type: 'debit',
      amount: 99.00,
      currency: 'SAR',
      description: 'دفع اشتراك الباقة المتقدمة',
      category: 'payment',
      status: 'completed',
      balanceAfter: 1151.00,
      createdAt: new Date('2024-01-10'),
      reference: 'PAY-001'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserWallet | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionForm, setTransactionForm] = useState({
    type: 'credit',
    amount: '',
    description: '',
    category: 'deposit'
  });

  const filteredWallets = wallets.filter(wallet =>
    wallet.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTransaction = () => {
    if (!selectedUser) return;
    
    const amount = parseFloat(transactionForm.amount);
    if (!amount || amount <= 0) {
      toast.error('يرجى إدخال مبلغ صحيح');
      return;
    }

    toast.success('تم إضافة المعاملة بنجاح');
    setIsTransactionModalOpen(false);
    setTransactionForm({ type: 'credit', amount: '', description: '', category: 'deposit' });
  };

  const getTotalWalletStats = () => {
    return {
      totalUsers: wallets.length,
      totalBalance: wallets.reduce((sum, w) => sum + w.balance, 0),
      totalDeposits: wallets.reduce((sum, w) => sum + w.totalDeposits, 0),
      totalWithdrawals: wallets.reduce((sum, w) => sum + w.totalWithdrawals, 0)
    };
  };

  const stats = getTotalWalletStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة المحفظة</h1>
          <p className="text-secondary-600 dark:text-secondary-300">إدارة محافظ المستخدمين والمعاملات المالية</p>
        </div>
        <Button onClick={() => {}}>
          <Download size={16} className="ml-2" />
          تصدير التقرير
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-secondary-900 dark:text-white">{stats.totalUsers}</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي المستخدمين</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{stats.totalBalance.toLocaleString()} ريال</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي الأرصدة</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.totalDeposits.toLocaleString()} ريال</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي الإيداعات</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{stats.totalWithdrawals.toLocaleString()} ريال</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-300">إجمالي السحوبات</div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <Input
          placeholder="البحث عن مستخدم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      {/* Wallets Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                  الرصيد الحالي
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                  إجمالي الإيداعات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                  إجمالي السحوبات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                  آخر معاملة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredWallets.map((wallet) => (
                <tr key={wallet.userId} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-secondary-900 dark:text-white">{wallet.userName}</div>
                      <div className="text-sm text-secondary-500 dark:text-secondary-400">{wallet.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-green-600">{wallet.balance.toLocaleString()} {wallet.currency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <div className="flex items-center gap-1">
                      <ArrowUpRight size={14} />
                      {wallet.totalDeposits.toLocaleString()} {wallet.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    <div className="flex items-center gap-1">
                      <ArrowDownLeft size={14} />
                      {wallet.totalWithdrawals.toLocaleString()} {wallet.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                    {wallet.lastTransaction.toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(wallet);
                          setIsTransactionModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                      >
                        <Plus size={16} />
                      </button>
                      <button className="text-secondary-600 hover:text-secondary-900 dark:text-secondary-400">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        title={`إضافة معاملة - ${selectedUser?.userName}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              نوع المعاملة
            </label>
            <select
              value={transactionForm.type}
              onChange={(e) => setTransactionForm(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
            >
              <option value="credit">إضافة رصيد</option>
              <option value="debit">خصم رصيد</option>
            </select>
          </div>

          <Input
            label="المبلغ"
            type="number"
            value={transactionForm.amount}
            onChange={(e) => setTransactionForm(prev => ({ ...prev, amount: e.target.value }))}
            placeholder="أدخل المبلغ"
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الفئة
            </label>
            <select
              value={transactionForm.category}
              onChange={(e) => setTransactionForm(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
            >
              <option value="deposit">إيداع</option>
              <option value="withdrawal">سحب</option>
              <option value="bonus">مكافأة</option>
              <option value="penalty">غرامة</option>
              <option value="refund">استرداد</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              الوصف
            </label>
            <textarea
              value={transactionForm.description}
              onChange={(e) => setTransactionForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border border-secondary-300 dark:border-secondary-600 rounded-lg"
              rows={3}
              placeholder="أدخل وصف المعاملة"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsTransactionModalOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddTransaction}>
              إضافة المعاملة
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WalletManagement;