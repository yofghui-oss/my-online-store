import { Currency } from '../types';

const currencySymbols: Record<Currency, string> = {
  SAR: 'ر.س',
  USD: '$',
  EUR: '€',
};

export const formatCurrency = (amount: number, currency: Currency = 'SAR'): string => {
  const symbol = currencySymbols[currency] || currency;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // For RTL languages, it's common to have the symbol after the number
  return `${formattedAmount} ${symbol}`;
};
