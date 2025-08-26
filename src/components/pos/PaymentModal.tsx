import React from 'react';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/currency';
import { Currency } from '../../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  currency: Currency;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total, currency, onPaymentSuccess }) => {
  const handlePayment = (method: string) => {
    // In a real app, this would trigger the respective payment flow
    toast.success(`تم الدفع بنجاح باستخدام ${method}`);
    onPaymentSuccess();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إتمام الدفع" size="sm">
      <div className="text-center">
        <p className="text-secondary-500 mb-2">المبلغ الإجمالي للدفع</p>
        <p className="text-4xl font-bold text-secondary-900 dark:text-white mb-6">
          {formatCurrency(total, currency)}
        </p>
        <div className="space-y-3">
          <Button size="lg" className="w-full" onClick={() => handlePayment('الكاش')}>
            <DollarSign className="ml-2" />
            الدفع نقدًا (كاش)
          </Button>
          <Button size="lg" variant="secondary" className="w-full" onClick={() => handlePayment('البطاقة')}>
            <CreditCard className="ml-2" />
            الدفع بالبطاقة
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
